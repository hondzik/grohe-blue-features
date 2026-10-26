import { describe, expect, it } from 'vitest';
import { discoverLevelEntities, discoverResetButton, isLevelSupported, resolveLevelSources } from './level-sources';
import type { HomeAssistant } from 'custom-card-helpers';

type Fake = { id: string; state: string; unit?: string; name?: string; deviceId?: string; platform?: string };

function makeHass(entities: Fake[]): HomeAssistant {
  const states: Record<string, unknown> = {};
  const registry: Record<string, unknown> = {};
  for (const e of entities) {
    states[e.id] = { entity_id: e.id, state: e.state, attributes: { ...(e.unit ? { unit_of_measurement: e.unit } : {}), friendly_name: e.name ?? e.id } };
    registry[e.id] = { entity_id: e.id, device_id: e.deviceId ?? 'dev1', platform: e.platform ?? 'grohe_smarthome' };
  }
  return { states, entities: registry } as unknown as HomeAssistant;
}

const PREFIX = 'sensor.kitchen_my_grohe_blue_home';
const grohe: Fake[] = [
  { id: `${PREFIX}_remaining_co2`, state: '98', unit: '%' },
  { id: `${PREFIX}_remaining_co2_total`, state: '55', unit: 'L' },
  { id: `${PREFIX}_remaining_filter`, state: '100', unit: '%' },
  { id: `${PREFIX}_remaining_filter_app`, state: '90', unit: '%' },
  { id: `${PREFIX}_remaining_filter_total`, state: '1997', unit: 'L' },
  { id: `${PREFIX}_date_co2_replacement`, state: '2026-12-01' },
  { id: `${PREFIX}_cycles_still`, state: '10' },
  { id: 'sensor.other_remaining_co2', state: '5', unit: '%', deviceId: 'dev2' },
  { id: 'button.kitchen_my_grohe_blue_home_reset_co2', state: 'unknown' },
];

describe('discoverLevelEntities', () => {
  const hass = makeHass(grohe);
  const tile = `${PREFIX}_cycles_still`;

  it('finds the CO2 percent and liters sensors on the same device', () => {
    expect(discoverLevelEntities(hass, tile, 'co2')).toEqual({ percent: `${PREFIX}_remaining_co2`, liters: `${PREFIX}_remaining_co2_total` });
  });

  it('prefers the plain filter sensor over the app variant', () => {
    expect(discoverLevelEntities(hass, tile, 'filter')).toEqual({ percent: `${PREFIX}_remaining_filter`, liters: `${PREFIX}_remaining_filter_total` });
  });

  it('falls back to the app variant when no plain percent sensor exists', () => {
    const only = makeHass(grohe.filter((e) => e.id !== `${PREFIX}_remaining_filter`));
    expect(discoverLevelEntities(only, tile, 'filter').percent).toBe(`${PREFIX}_remaining_filter_app`);
  });

  it('ignores entities of other devices', () => {
    expect(discoverLevelEntities(hass, 'sensor.other_remaining_co2', 'co2').percent).toBe('sensor.other_remaining_co2');
  });

  it('still matches unavailable sensors by name', () => {
    const unavailable = makeHass(grohe.map((e) => (e.id.endsWith('remaining_co2') || e.id.endsWith('co2_total') ? { ...e, state: 'unavailable', unit: undefined } : e)));
    expect(discoverLevelEntities(unavailable, tile, 'co2')).toEqual({ percent: `${PREFIX}_remaining_co2`, liters: `${PREFIX}_remaining_co2_total` });
  });

  it('returns nothing for unknown entities or a missing registry', () => {
    expect(discoverLevelEntities(hass, 'sensor.nope', 'co2')).toEqual({});
    expect(discoverLevelEntities(hass, undefined, 'co2')).toEqual({});
    expect(discoverLevelEntities({ states: {} } as unknown as HomeAssistant, tile, 'co2')).toEqual({});
  });
});

describe('isLevelSupported', () => {
  it('supports entities of the Grohe integration', () => {
    expect(isLevelSupported(makeHass(grohe), `${PREFIX}_cycles_still`, 'co2')).toBe(true);
  });

  it('rejects entities of other integrations', () => {
    expect(isLevelSupported(makeHass(grohe.map((e) => ({ ...e, platform: 'other' }))), `${PREFIX}_cycles_still`, 'co2')).toBe(false);
  });

  it('falls back to discovery when the platform is unknown', () => {
    const withoutPlatform = (entities: Fake[]) => {
      const hass = makeHass(entities);
      for (const entry of Object.values((hass as unknown as { entities: Record<string, { platform?: string }> }).entities)) delete entry.platform;
      return hass;
    };
    expect(isLevelSupported(withoutPlatform(grohe), `${PREFIX}_cycles_still`, 'co2')).toBe(true);
    expect(isLevelSupported(withoutPlatform([{ id: 'sensor.x', state: '1' }]), 'sensor.x', 'co2')).toBe(false);
  });

  it('rejects a missing entity id', () => {
    expect(isLevelSupported(makeHass(grohe), undefined, 'co2')).toBe(false);
  });
});

describe('resolveLevelSources', () => {
  const hass = makeHass(grohe);
  const tile = `${PREFIX}_cycles_still`;

  it('reads numeric values and units from the discovered sensors', () => {
    const sources = resolveLevelSources(hass, tile, 'co2', undefined);
    expect(sources.percent).toMatchObject({ origin: 'auto', value: 98, unit: '%' });
    expect(sources.liters).toMatchObject({ origin: 'auto', value: 55, unit: 'L' });
  });

  it('lets manual config override the discovered sensors', () => {
    const sources = resolveLevelSources(hass, tile, 'co2', { entity: `${PREFIX}_remaining_filter`, liters_entity: `${PREFIX}_remaining_filter_total` });
    expect(sources.percent).toMatchObject({ origin: 'manual', value: 100 });
    expect(sources.liters).toMatchObject({ origin: 'manual', value: 1997 });
  });

  it('reports non-numeric states as undefined value', () => {
    const sources = resolveLevelSources(makeHass(grohe.map((e) => (e.id.endsWith('remaining_co2') ? { ...e, state: 'unavailable' } : e))), tile, 'co2', undefined);
    expect(sources.percent?.value).toBeUndefined();
  });

  it('returns no sources when nothing is found', () => {
    expect(resolveLevelSources(hass, 'sensor.nope', 'co2', undefined)).toEqual({ percent: undefined, liters: undefined });
  });
});

describe('discoverResetButton', () => {
  const tile = `${PREFIX}_cycles_still`;

  it('finds the reset button of the kind on the same device', () => {
    const hass = makeHass([...grohe, { id: 'button.kitchen_my_grohe_blue_home_reset_filter', state: 'unknown' }]);
    expect(discoverResetButton(hass, tile, 'co2')).toBe('button.kitchen_my_grohe_blue_home_reset_co2');
    expect(discoverResetButton(hass, tile, 'filter')).toBe('button.kitchen_my_grohe_blue_home_reset_filter');
  });

  it('returns nothing when the button is missing or the device is unknown', () => {
    const hass = makeHass(grohe);
    expect(discoverResetButton(hass, tile, 'filter')).toBeUndefined();
    expect(discoverResetButton(hass, 'sensor.nope', 'co2')).toBeUndefined();
    expect(discoverResetButton(hass, 'sensor.other_remaining_co2', 'co2')).toBeUndefined();
  });
});

describe('duplicate entity id suffix (_2)', () => {
  const P = 'sensor.kitchen_my_grohe_blue_home';
  const dup: Fake[] = [
    { id: `${P}_cycles_still_2`, state: '10' },
    { id: `${P}_remaining_co2_2`, state: '0', unit: '%' },
    { id: `${P}_remaining_co2_total_2`, state: 'unavailable' },
    { id: `${P}_remaining_filter_app_2`, state: '90', unit: '%' },
    { id: `${P}_remaining_filter_2`, state: '100', unit: '%' },
    { id: 'button.kitchen_my_grohe_blue_home_reset_co2_filter_2', state: 'unknown' },
    { id: 'button.kitchen_my_grohe_blue_home_reset_co2_2', state: 'unknown' },
  ];
  const hass = makeHass(dup);
  const tile = `${P}_cycles_still_2`;

  it('still prefers the integration naming', () => {
    expect(discoverLevelEntities(hass, tile, 'co2')).toEqual({ percent: `${P}_remaining_co2_2`, liters: `${P}_remaining_co2_total_2` });
    expect(discoverLevelEntities(hass, tile, 'filter').percent).toBe(`${P}_remaining_filter_2`);
  });

  it('finds the suffixed reset button before looser matches', () => {
    expect(discoverResetButton(hass, tile, 'co2')).toBe('button.kitchen_my_grohe_blue_home_reset_co2_2');
  });
});
