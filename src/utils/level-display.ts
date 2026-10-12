import type { LevelKind, LevelSources } from './level-sources';

export const DEFAULT_COLORS: Record<LevelKind, string> = { co2: 'blue', filter: 'green' };
export const DEFAULT_ICONS: Record<LevelKind, string> = { co2: 'mdi:molecule-co2', filter: 'mdi:water-check-outline' };

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

export type LevelDisplay = {
  /** 0-100, drives the bar width. */
  percent: number;
  /** Text shown next to the bar, e.g. `98 %` or `55 L`. */
  text: string;
  available: boolean;
};

function formatNumber(value: number, language: string | undefined): string {
  return new Intl.NumberFormat(language, { maximumFractionDigits: 1 }).format(value);
}

/**
 * Bar always follows the percentage sensor; the text follows the configured unit and
 * falls back to the percentage when no liters value is available.
 */
export function computeLevelDisplay(sources: LevelSources, unit: GroheLevelUnit, language?: string): LevelDisplay {
  const rawPercent = sources.percent?.value;
  const percent = rawPercent === undefined ? 0 : Math.min(100, Math.max(0, rawPercent));
  const liters = sources.liters?.value;

  if (unit === 'liter' && liters !== undefined) {
    return { percent, text: `${formatNumber(liters, language)} ${sources.liters?.unit ?? 'L'}`, available: true };
  }
  if (rawPercent === undefined) return { percent, text: '–', available: false };
  return { percent, text: `${formatNumber(rawPercent, language)} %`, available: true };
}
