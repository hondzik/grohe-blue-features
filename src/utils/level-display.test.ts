import { describe, expect, it } from 'vitest';
import { CO2_LABEL, computeLevelDisplay, computeLevelTitle, getBoolConfigVal, getUnit, getValuePosition, kindConfig, resolveCssColor, resolveIcon } from './level-display';

describe('config helpers', () => {
  it('getBoolConfigVal uses the default when unset', () => {
    expect(getBoolConfigVal(undefined, 'show_icon', true)).toBe(true);
    expect(getBoolConfigVal({ show_icon: false }, 'show_icon', true)).toBe(false);
  });

  it('getUnit and getValuePosition fall back to defaults', () => {
    expect(getUnit(undefined)).toBe('percent');
    expect(getUnit({ unit: 'liter' })).toBe('liter');
    expect(getValuePosition(undefined)).toBe('right');
    expect(getValuePosition({ value_position: 'left' })).toBe('left');
  });
});

describe('resolveCssColor', () => {
  it('maps palette names to theme variables', () => {
    expect(resolveCssColor('deep-orange', 'co2')).toBe('var(--deep-orange-color, deep-orange)');
  });

  it('uses the kind default when empty', () => {
    expect(resolveCssColor(undefined, 'co2')).toBe('var(--blue-color, blue)');
    expect(resolveCssColor('  ', 'filter')).toBe('var(--green-color, green)');
  });

  it('passes through explicit CSS colors', () => {
    expect(resolveCssColor('#ff0000', 'co2')).toBe('#ff0000');
    expect(resolveCssColor('rgb(1, 2, 3)', 'co2')).toBe('rgb(1, 2, 3)');
  });
});

describe('resolveIcon', () => {
  it('returns the default icon per kind', () => {
    expect(resolveIcon(undefined, 'co2')).toBe('mdi:molecule-co2');
    expect(resolveIcon({}, 'filter')).toBe('mdi:air-filter');
  });

  it('returns a custom icon, or nothing when icons are disabled', () => {
    expect(resolveIcon({ icon: 'mdi:star' }, 'co2')).toBe('mdi:star');
    expect(resolveIcon({ show_icon: false, icon: 'mdi:star' }, 'co2')).toBeUndefined();
  });
});

describe('computeLevelDisplay', () => {
  const sources = { percent: { origin: 'auto' as const, value: 98, unit: '%' }, liters: { origin: 'auto' as const, value: 55, unit: 'L' } };

  it('shows percent and drives the bar from it', () => {
    expect(computeLevelDisplay(sources, 'percent', 'en')).toEqual({ percent: 98, text: '98 %', available: true });
  });

  it('shows liters while the bar still follows the percentage', () => {
    expect(computeLevelDisplay(sources, 'liter', 'en')).toEqual({ percent: 98, text: '55 L', available: true });
  });

  it('falls back to percent when no liters value exists', () => {
    expect(computeLevelDisplay({ percent: sources.percent }, 'liter', 'en').text).toBe('98 %');
  });

  it('clamps the bar to 0-100', () => {
    expect(computeLevelDisplay({ percent: { origin: 'auto', value: 140 } }, 'percent', 'en').percent).toBe(100);
    expect(computeLevelDisplay({ percent: { origin: 'auto', value: -3 } }, 'percent', 'en').percent).toBe(0);
  });

  it('reports unavailable values', () => {
    expect(computeLevelDisplay({ percent: { origin: 'auto' } }, 'percent', 'en')).toEqual({ percent: 0, text: '–', available: false });
  });
});

describe('kindConfig', () => {
  const config = { unit: 'liter' as const, co2_color: 'red', filter_color: 'teal', co2_icon: 'mdi:a', filter_entity: 'sensor.f', co2_liters_entity: 'sensor.cl' };

  it('maps the per-kind keys to the single-feature shape', () => {
    expect(kindConfig(config, 'co2')).toEqual({ unit: 'liter', color: 'red', icon: 'mdi:a', entity: undefined, liters_entity: 'sensor.cl' });
    expect(kindConfig(config, 'filter')).toMatchObject({ color: 'teal', entity: 'sensor.f', icon: undefined });
  });

  it('tolerates a missing config', () => {
    expect(kindConfig(undefined, 'co2').color).toBeUndefined();
  });
});

describe('computeLevelTitle', () => {
  it('shows percent and liters regardless of the displayed unit', () => {
    const sources = { percent: { origin: 'auto' as const, value: 98 }, liters: { origin: 'auto' as const, value: 55 } };
    expect(computeLevelTitle(CO2_LABEL, sources, 'en')).toBe('CO₂: 98 % / 55 l');
    expect(computeLevelTitle('Filter', sources, 'en')).toBe('Filter: 98 % / 55 l');
  });

  it('omits liters when unavailable and shows a dash for a missing percentage', () => {
    expect(computeLevelTitle('Filter', { percent: { origin: 'auto', value: 40 } }, 'en')).toBe('Filter: 40 %');
    expect(computeLevelTitle('Filter', { liters: { origin: 'auto', value: 12 } }, 'en')).toBe('Filter: – / 12 l');
  });
});
