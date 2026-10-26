import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { REFRESH_DELAYS_MS, ResetRefresher } from './reset-refresher';
import type { HomeAssistant } from 'custom-card-helpers';

const BUTTON = 'button.reset_co2_2';
const SENSORS = ['sensor.remaining_co2_2', 'sensor.remaining_co2_total_2'];

function makeHass(buttonState: string) {
  const callService = vi.fn().mockResolvedValue(undefined);
  return { states: { [BUTTON]: { state: buttonState } }, callService } as unknown as HomeAssistant & { callService: ReturnType<typeof vi.fn> };
}

describe('ResetRefresher', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('refreshes the sensors after the reset button is pressed', () => {
    let hass = makeHass('2026-10-26T10:00:00+00:00');
    const refresher = new ResetRefresher(() => hass);
    refresher.arm(BUTTON, [...SENSORS, undefined]);

    refresher.check();
    vi.advanceTimersByTime(REFRESH_DELAYS_MS[REFRESH_DELAYS_MS.length - 1]);
    expect(hass.callService).not.toHaveBeenCalled();

    hass = makeHass('2026-10-26T10:18:09+00:00');
    refresher.check();
    vi.advanceTimersByTime(REFRESH_DELAYS_MS[REFRESH_DELAYS_MS.length - 1]);
    expect(hass.callService).toHaveBeenCalledTimes(REFRESH_DELAYS_MS.length);
    expect(hass.callService).toHaveBeenCalledWith('homeassistant', 'update_entity', { entity_id: SENSORS });
  });

  it('does nothing when the dialog is not confirmed in time', () => {
    let hass = makeHass('before');
    const refresher = new ResetRefresher(() => hass);
    refresher.arm(BUTTON, SENSORS);
    vi.advanceTimersByTime(121_000);
    hass = makeHass('after');
    refresher.check();
    vi.runAllTimers();
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('cancels pending refreshes on dispose and ignores an empty sensor list', () => {
    let hass = makeHass('before');
    const refresher = new ResetRefresher(() => hass);
    refresher.arm(BUTTON, SENSORS);
    hass = makeHass('after');
    refresher.check();
    refresher.dispose();
    vi.runAllTimers();
    expect(hass.callService).not.toHaveBeenCalled();

    refresher.arm(BUTTON, [undefined]);
    hass = makeHass('later');
    refresher.check();
    vi.runAllTimers();
    expect(hass.callService).not.toHaveBeenCalled();
  });
});
