import { formatNumber } from 'custom-card-helpers';
import type { LevelKind, LevelSources } from './level-sources';
import type { FrontendLocaleData } from 'custom-card-helpers';

export const DEFAULT_COLORS: Record<LevelKind, string> = { co2: 'blue', filter: 'green' };
export const DEFAULT_ICONS: Record<LevelKind, string> = { co2: 'mdi:molecule-co2', filter: 'mdi:air-filter' };

export function getBoolConfigVal(config: Partial<GroheBlueFeatureConfig> | undefined, key: keyof GroheBlueFeatureConfig, defaultValue: boolean): boolean {
  const value = config?.[key];
  return value !== undefined ? !!value : defaultValue;
}

export function getUnit(config: Partial<GroheBlueFeatureConfig> | undefined): GroheLevelUnit {
  return config?.unit === 'liter' ? 'liter' : 'percent';
}

export function getValuePosition(config: Partial<GroheBlueFeatureConfig> | undefined): GroheValuePosition {
  return config?.value_position === 'left' ? 'left' : 'right';
}

/** Converts a HA palette name (`blue`, `deep-orange`) to its theme CSS variable; other CSS colors pass through. */
export function resolveCssColor(color: string | undefined, kind: LevelKind): string {
  const value = (color ?? '').trim() || DEFAULT_COLORS[kind];
  if (/^[a-z]+(-[a-z]+)*$/i.test(value) && !['transparent', 'currentcolor', 'inherit'].includes(value.toLowerCase())) {
    return `var(--${value.toLowerCase()}-color, ${value})`;
  }
  return value;
}

export function resolveIcon(config: Partial<GroheBlueFeatureConfig> | undefined, kind: LevelKind): string | undefined {
  if (!getBoolConfigVal(config, 'show_icon', true)) return undefined;
  return config?.icon?.trim() || DEFAULT_ICONS[kind];
}

/** Edge content of the combined feature; the legacy `edge_content: value` + `unit` pair maps to `percent` / `liter`. */
export function getEdgeContent(config: Partial<GroheBlueCombinedFeatureConfig> | undefined): GroheEdgeContent {
  const content = config?.edge_content;
  if (content === 'percent' || content === 'liter') return content;
  if (content === 'value') return config?.unit === 'liter' ? 'liter' : 'percent';
  return 'icon';
}

/** Maps the combined config's per-kind keys (`co2_entity`, ...) to the single-feature shape used by the shared utils. */
export function kindConfig(config: Partial<GroheBlueCombinedFeatureConfig> | undefined, kind: LevelKind): Partial<GroheBlueFeatureConfig> {
  return {
    unit: config?.unit,
    color: config?.[`${kind}_color`],
    icon: config?.[`${kind}_icon`],
    entity: config?.[`${kind}_entity`],
    liters_entity: config?.[`${kind}_liters_entity`],
  };
}

export type LevelDisplay = {
  /** 0-100, drives the bar width. */
  percent: number;
  /** Text shown next to the bar, e.g. `98 %` or `55 L`. */
  text: string;
  available: boolean;
};

/** Locale-aware (respects the number format of the HA user profile), at most one decimal. */
function formatLevel(value: number, locale: FrontendLocaleData | undefined): string {
  return formatNumber(value, locale, { maximumFractionDigits: 1 });
}

/**
 * Bar always follows the percentage sensor; the text follows the configured unit and
 * falls back to the percentage when no liters value is available.
 */
export function computeLevelDisplay(sources: LevelSources, unit: GroheLevelUnit, locale?: FrontendLocaleData): LevelDisplay {
  const rawPercent = sources.percent?.value;
  const percent = rawPercent === undefined ? 0 : Math.min(100, Math.max(0, rawPercent));
  const liters = sources.liters?.value;

  if (unit === 'liter' && liters !== undefined) {
    return { percent, text: `${formatLevel(liters, locale)} ${sources.liters?.unit ?? 'L'}`, available: true };
  }
  if (rawPercent === undefined) return { percent, text: '–', available: false };
  return { percent, text: `${formatLevel(rawPercent, locale)} %`, available: true };
}

/** Native `title` tooltips are plain text, so CO2 uses the Unicode subscript two. */
export const CO2_LABEL = 'CO₂';

/** Tooltip like `CO₂: 98% / 55l`; always shows both percent and liters, whatever unit the feature displays. */
export function computeLevelTitle(name: string, sources: LevelSources, locale?: FrontendLocaleData): string {
  const percent = sources.percent?.value;
  const liters = sources.liters?.value;
  const parts = [percent === undefined ? '–' : `${formatLevel(percent, locale)} %`];
  if (liters !== undefined) parts.push(`${formatLevel(liters, locale)} l`);
  return `${name}: ${parts.join(' / ')}`;
}
