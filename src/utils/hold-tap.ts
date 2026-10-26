import setupCustomlocalize from '../localize';
import { buildResetAction, buildTapAction, getActionEntity, isTapEnabled } from './level-actions';
import { discoverResetButton } from './level-sources';
import type { HassActionDetail } from './level-actions';
import type { LevelKind, LevelSources } from './level-sources';
import type { HomeAssistant } from 'custom-card-helpers';

const HOLD_MS = 500;

export type HoldTapCallbacks = {
  tap?: () => void;
  hold?: () => void;
};

/**
 * Pointer/keyboard handling for one clickable bar: a short press fires `tap`, holding for
 * 500 ms fires `hold`. Every event is stopped so the Tile card's own action doesn't fire too.
 * Callbacks are resolved lazily on each press, so they always see the current config/state.
 */
export class HoldTapHandler {
  private timer?: number;
  private held = false;
  private pressed = false;

  constructor(private readonly callbacks: () => HoldTapCallbacks) {}

  onPointerDown = (ev: PointerEvent) => {
    ev.stopPropagation();
    if (ev.button !== 0) return;
    this.pressed = true;
    this.held = false;
    const { hold } = this.callbacks();
    if (hold) {
      this.timer = window.setTimeout(() => {
        this.timer = undefined;
        this.held = true;
        hold();
      }, HOLD_MS);
    }
  };

  onPointerUp = (ev: PointerEvent) => {
    ev.stopPropagation();
    if (!this.pressed) return;
    this.pressed = false;
    this.clearTimer();
    if (!this.held) this.callbacks().tap?.();
  };

  /** Moving off the bar or the browser taking over (scroll) cancels the press. */
  onPointerCancel = () => {
    this.pressed = false;
    this.clearTimer();
  };

  onClick = (ev: Event) => {
    ev.stopPropagation();
  };

  /** Suppress the long-press context menu on touch devices when hold does something. */
  onContextMenu = (ev: Event) => {
    if (this.callbacks().hold) ev.preventDefault();
  };

  onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    ev.preventDefault();
    ev.stopPropagation();
    this.callbacks().tap?.();
  };

  private clearTimer() {
    if (this.timer !== undefined) {
      window.clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
}

export type LevelActionOptions = {
  host: HTMLElement;
  hass: HomeAssistant;
  contextEntityId?: string;
  kind: LevelKind;
  sources: LevelSources;
  unit: GroheLevelUnit;
  tapAction?: GroheActionConfig;
  holdReset?: boolean;
  /** Called when the reset hold fires, with the reset button and the sensors to refresh once it's pressed. */
  onReset?: (button: string, entities: Array<string | undefined>) => void;
};

function fireAction(host: HTMLElement, detail: HassActionDetail) {
  host.dispatchEvent(new CustomEvent('hass-action', { detail, bubbles: true, composed: true }));
}

/** Tap = configured `tap_action` (default more-info of the sensor in the displayed unit); hold = optional counter reset. */
export function levelActionCallbacks(options: LevelActionOptions): HoldTapCallbacks {
  const { host, hass, kind, sources, unit, tapAction } = options;
  const resetButton = options.holdReset ? discoverResetButton(hass, options.contextEntityId, kind) : undefined;
  return {
    tap: isTapEnabled(tapAction) ? () => fireAction(host, buildTapAction(getActionEntity(sources, unit), tapAction)) : undefined,
    hold: resetButton
      ? () => {
          options.onReset?.(resetButton, [sources.percent?.entityId, sources.liters?.entityId]);
          fireAction(host, buildResetAction(resetButton, setupCustomlocalize(hass)(`feature.reset_confirm.${kind}`)));
        }
      : undefined,
  };
}

export function isInteractive(callbacks: HoldTapCallbacks): boolean {
  return !!callbacks.tap || !!callbacks.hold;
}
