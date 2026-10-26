import type { HomeAssistant } from 'custom-card-helpers';
import type { HassEntity } from 'home-assistant-js-websocket';

export const GROHE_PLATFORM = 'grohe_smarthome';

export const LEVEL_KINDS = ['co2', 'filter'] as const;
export type LevelKind = (typeof LEVEL_KINDS)[number];

export type LevelOrigin = 'manual' | 'auto';

export type LevelSource = {
  origin: LevelOrigin;
  entityId?: string;
  /** Numeric state, undefined when the entity is missing/unavailable/non-numeric. */
  value?: number;
  unit?: string;
};

export type LevelSources = {
  /** Remaining level in %, drives the progress bar. */
  percent?: LevelSource;
  /** Remaining amount in liters (`*_total` sensor), only used for the displayed value. */
  liters?: LevelSource;
};

export type DiscoveredEntities = { percent?: string; liters?: string };

const KIND_WORD: Record<LevelKind, string> = { co2: 'co2', filter: 'filter' };

const LITER_UNITS = new Set(['l', 'L', 'ℓ']);

function isUnavailable(stateObj: HassEntity | undefined): boolean {
  return !stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown';
}

function objectId(entityId: string): string {
  return entityId.slice(entityId.indexOf('.') + 1);
}

/** Object id without the numeric suffix HA appends to duplicate entity ids (`remaining_co2_2` → `remaining_co2`). */
function baseObjectId(entityId: string): string {
  return objectId(entityId).replace(/_\d+$/, '');
}

function entityRegistry(hass: HomeAssistant): Record<string, EntityRegistryDisplayEntry> | undefined {
  return (hass as HassWithRegistry).entities;
}

/** Platform (integration) of an entity, as known to the frontend's entity registry. */
export function getEntityPlatform(hass: HomeAssistant, entityId?: string): string | undefined {
  return entityId ? entityRegistry(hass)?.[entityId]?.platform : undefined;
}

function isLiterSensor(entityId: string, stateObj: HassEntity | undefined): boolean {
  const unit = stateObj?.attributes?.unit_of_measurement;
  if (typeof unit === 'string' && unit !== '') return LITER_UNITS.has(unit);
  // unavailable sensors may have their attributes stripped, fall back to the integration's naming
  return isUnavailable(stateObj) && baseObjectId(entityId).endsWith('_total');
}

function isPercentSensor(entityId: string, stateObj: HassEntity | undefined): boolean {
  const unit = stateObj?.attributes?.unit_of_measurement;
  if (typeof unit === 'string' && unit !== '') return unit === '%';
  return isUnavailable(stateObj) && !baseObjectId(entityId).endsWith('_total');
}

/**
 * Find the percent and liters sensors of the given kind on the same device as
 * `entityId`.
 *
 * Entities are first matched by the integration's own naming (`*_remaining_<kind>`
 * and `*_remaining_<kind>_total`, also with HA's `_2` duplicate suffix), then by looser word + unit matching so renamed or
 * localized entity ids still resolve. The Grohe app-specific variant
 * (`remaining_filter_app`) is only used when no plain percent sensor exists.
 */
export function discoverLevelEntities(hass: HomeAssistant, entityId: string | undefined, kind: LevelKind): DiscoveredEntities {
  const registry = entityRegistry(hass);
  const deviceId = entityId ? registry?.[entityId]?.device_id : undefined;
  if (!registry || !deviceId) return {};

  const word = KIND_WORD[kind];
  const candidates = Object.values(registry)
    .filter((entry) => entry.device_id === deviceId && entry.entity_id.startsWith('sensor.'))
    .map((entry) => ({ id: entry.entity_id, stateObj: hass.states[entry.entity_id] }))
    .filter(({ id, stateObj }) => !!stateObj && (objectId(id).includes(word) || `${stateObj.attributes?.friendly_name ?? ''}`.toLowerCase().includes(word)))
    .sort((a, b) => a.id.localeCompare(b.id));

  const percents = candidates.filter(({ id, stateObj }) => isPercentSensor(id, stateObj));
  const liters = candidates.filter(({ id, stateObj }) => isLiterSensor(id, stateObj));

  const exactPercent = percents.find(({ id }) => baseObjectId(id).endsWith(`_remaining_${word}`));
  const plainPercent = percents.find(({ id }) => !objectId(id).includes('_app'));
  const exactLiters = liters.find(({ id }) => baseObjectId(id).endsWith(`_remaining_${word}_total`));

  return {
    percent: (exactPercent ?? plainPercent ?? percents[0])?.id,
    liters: (exactLiters ?? liters[0])?.id,
  };
}

/**
 * Whether the feature should be offered for a tile entity: the entity belongs to the
 * Grohe Smarthome integration, or (when the platform is unknown to the frontend) the
 * device exposes a matching level sensor.
 */
export function isLevelSupported(hass: HomeAssistant, entityId: string | undefined, kind: LevelKind): boolean {
  if (!entityId) return false;
  const platform = getEntityPlatform(hass, entityId);
  if (platform) return platform === GROHE_PLATFORM;
  return !!discoverLevelEntities(hass, entityId, kind).percent;
}

function toSource(hass: HomeAssistant, entityId: string | undefined, origin: LevelOrigin): LevelSource | undefined {
  if (!entityId) return undefined;
  const stateObj = hass.states[entityId];
  const value = stateObj ? Number(stateObj.state) : NaN;
  const unit = stateObj?.attributes?.unit_of_measurement;
  return { origin, entityId, value: Number.isFinite(value) ? value : undefined, unit: typeof unit === 'string' ? unit : undefined };
}

/** Resolve both sources: manual config override first, then auto-discovery. */
export function resolveLevelSources(hass: HomeAssistant, entityId: string | undefined, kind: LevelKind, config: Partial<GroheBlueFeatureConfig> | undefined): LevelSources {
  const auto = discoverLevelEntities(hass, entityId, kind);
  return {
    percent: config?.entity ? toSource(hass, config.entity, 'manual') : toSource(hass, auto.percent, 'auto'),
    liters: config?.liters_entity ? toSource(hass, config.liters_entity, 'manual') : toSource(hass, auto.liters, 'auto'),
  };
}

/** The integration's reset button for the given kind (`button.*_reset_co2` / `button.*_reset_filter`) on the tile entity's device. */
export function discoverResetButton(hass: HomeAssistant, entityId: string | undefined, kind: LevelKind): string | undefined {
  const registry = entityRegistry(hass);
  const deviceId = entityId ? registry?.[entityId]?.device_id : undefined;
  if (!registry || !deviceId) return undefined;
  const word = KIND_WORD[kind];
  const buttons = Object.values(registry)
    .filter((entry) => entry.device_id === deviceId && entry.entity_id.startsWith('button.'))
    .map((entry) => entry.entity_id)
    .sort();
  return buttons.find((id) => baseObjectId(id).endsWith(`_reset_${word}`)) ?? buttons.find((id) => objectId(id).includes('reset') && objectId(id).includes(word));
}
