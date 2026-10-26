import type { HomeAssistant } from 'custom-card-helpers';

/** The Grohe cloud recalculates the levels only with the device's next measurement, so poll a few times. */
export const REFRESH_DELAYS_MS = [5_000, 60_000];

/** How long to wait for the reset button to be pressed after the hold (the user still has to confirm the dialog). */
const CONFIRM_TIMEOUT_MS = 120_000;

type Pending = { button: string; buttonState?: string; entities: string[]; until: number };

/**
 * After a hold-to-reset, waits until the reset button's state (its last-pressed timestamp)
 * changes — i.e. the user confirmed the dialog and the press went through — and then asks HA
 * to refresh the level sensors via `homeassistant.update_entity`.
 */
export class ResetRefresher {
  private pending?: Pending;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(private readonly getHass: () => HomeAssistant | undefined) {}

  arm(button: string, entities: Array<string | undefined>) {
    const hass = this.getHass();
    const ids = entities.filter((id): id is string => !!id);
    if (!hass || ids.length === 0) return;
    this.pending = { button, buttonState: hass.states[button]?.state, entities: ids, until: Date.now() + CONFIRM_TIMEOUT_MS };
  }

  /** Call on every `hass` update. */
  check() {
    const pending = this.pending;
    const hass = this.getHass();
    if (!pending || !hass) return;
    if (Date.now() > pending.until) {
      this.pending = undefined;
      return;
    }
    if (hass.states[pending.button]?.state === pending.buttonState) return;
    this.pending = undefined;
    for (const delay of REFRESH_DELAYS_MS) {
      this.timers.push(setTimeout(() => this.refresh(pending.entities), delay));
    }
  }

  dispose() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];
    this.pending = undefined;
  }

  private refresh(entities: string[]) {
    this.getHass()
      ?.callService('homeassistant', 'update_entity', { entity_id: entities })
      .catch(() => undefined);
  }
}
