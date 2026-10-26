import { html } from 'lit';
import { DEFAULT_TAP_ACTION } from './utils/level-actions';
import type { HomeAssistant } from 'custom-card-helpers';
import type { TemplateResult } from 'lit';

/** Editor rows shared by all features: `tap_action` (HA's `ui_action` selector) and the `hold_reset` switch. */
export function renderActionOptions(
  hass: HomeAssistant | undefined,
  config: Partial<GroheActionOptions>,
  localize: (key: string) => string,
  onChange: (key: keyof GroheActionOptions, value: unknown) => void,
): TemplateResult {
  return html`
    <div class="field">
      <ha-selector
        .hass=${hass}
        .selector=${{ ui_action: { default_action: DEFAULT_TAP_ACTION.action } }}
        .value=${config.tap_action}
        .label=${localize('editor.tap_action.label')}
        .helper=${localize('editor.tap_action.description')}
        .required=${false}
        @value-changed=${(ev: CustomEvent) => {
          ev.stopPropagation();
          onChange('tap_action', ev.detail?.value || undefined);
        }}
      ></ha-selector>
    </div>
    <ha-settings-row>
      <span slot="heading">${localize('editor.hold_reset.label')}</span>
      <span slot="description">${localize('editor.hold_reset.description')}</span>
      <ha-switch .checked=${!!config.hold_reset} @change=${(ev: Event) => onChange('hold_reset', (ev.target as HTMLInputElement).checked || undefined)}></ha-switch>
    </ha-settings-row>
  `;
}
