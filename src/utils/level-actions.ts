import type { LevelSources } from './level-sources';

export const DEFAULT_TAP_ACTION: GroheActionConfig = { action: 'more-info' };

/** Detail of the frontend's `hass-action` event, handled by HA's own action handler (more-info, navigate, confirmation, ...). */
export type HassActionDetail = {
  config: { entity?: string; tap_action?: GroheActionConfig; hold_action?: GroheActionConfig };
  action: 'tap' | 'hold';
};

/** Entity opened by more-info: the liters sensor when liters are displayed, otherwise (or when it's missing) the percentage sensor. */
export function getActionEntity(sources: LevelSources, unit: GroheLevelUnit): string | undefined {
  if (unit === 'liter' && sources.liters?.entityId) return sources.liters.entityId;
  return sources.percent?.entityId ?? sources.liters?.entityId;
}

export function isTapEnabled(tapAction: GroheActionConfig | undefined): boolean {
  return (tapAction?.action ?? DEFAULT_TAP_ACTION.action) !== 'none';
}

export function buildTapAction(entity: string | undefined, tapAction: GroheActionConfig | undefined): HassActionDetail {
  return { config: { entity, tap_action: tapAction ?? DEFAULT_TAP_ACTION }, action: 'tap' };
}

/** Presses the integration's reset button, behind HA's confirmation dialog. */
export function buildResetAction(button: string, confirmText: string): HassActionDetail {
  return {
    config: {
      entity: button,
      hold_action: { action: 'perform-action', perform_action: 'button.press', target: { entity_id: button }, confirmation: { text: confirmText } },
    },
    action: 'hold',
  };
}
