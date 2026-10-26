import { describe, expect, it } from 'vitest';
import { buildResetAction, buildTapAction, DEFAULT_TAP_ACTION, getActionEntity, isTapEnabled } from './level-actions';

const sources = {
  percent: { origin: 'auto' as const, entityId: 'sensor.remaining_co2', value: 98 },
  liters: { origin: 'auto' as const, entityId: 'sensor.remaining_co2_total', value: 55 },
};

describe('getActionEntity', () => {
  it('opens the sensor of the displayed unit', () => {
    expect(getActionEntity(sources, 'percent')).toBe('sensor.remaining_co2');
    expect(getActionEntity(sources, 'liter')).toBe('sensor.remaining_co2_total');
  });

  it('falls back to the other sensor when one is missing', () => {
    expect(getActionEntity({ percent: sources.percent }, 'liter')).toBe('sensor.remaining_co2');
    expect(getActionEntity({ liters: sources.liters }, 'percent')).toBe('sensor.remaining_co2_total');
    expect(getActionEntity({}, 'percent')).toBeUndefined();
  });
});

describe('isTapEnabled', () => {
  it('is enabled by default and for any action except none', () => {
    expect(isTapEnabled(undefined)).toBe(true);
    expect(isTapEnabled({ action: 'navigate', navigation_path: '/x' })).toBe(true);
    expect(isTapEnabled({ action: 'none' })).toBe(false);
  });
});

describe('buildTapAction', () => {
  it('defaults to more-info of the resolved entity', () => {
    expect(buildTapAction('sensor.a', undefined)).toEqual({ config: { entity: 'sensor.a', tap_action: DEFAULT_TAP_ACTION }, action: 'tap' });
  });

  it('passes a custom tap action through', () => {
    const tap = { action: 'navigate', navigation_path: '/energy' };
    expect(buildTapAction('sensor.a', tap).config.tap_action).toBe(tap);
  });
});

describe('buildResetAction', () => {
  it('presses the reset button behind a confirmation', () => {
    expect(buildResetAction('button.reset_co2', 'Sure?')).toEqual({
      config: {
        entity: 'button.reset_co2',
        hold_action: { action: 'perform-action', perform_action: 'button.press', target: { entity_id: 'button.reset_co2' }, confirmation: { text: 'Sure?' } },
      },
      action: 'hold',
    });
  });
});
