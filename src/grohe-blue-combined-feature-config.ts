import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { groheBlueLevelFeatureConfigStyles } from './grohe-blue-level-feature-config.styles';
import setupCustomlocalize from './localize';
import { DEFAULT_COLORS, DEFAULT_ICONS, getUnit } from './utils/level-display';
import { discoverLevelEntities, LEVEL_KINDS } from './utils/level-sources';
import type { LevelKind } from './utils/level-sources';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';

type ConfigKey = keyof GroheBlueCombinedFeatureConfig;

@customElement('grohe-blue-combined-feature-config')
export class GroheBlueCombinedFeatureConfigEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) context?: LovelaceCardFeatureContext;
  @property({ type: Object }) config: Partial<GroheBlueCombinedFeatureConfig> = {};

  setConfig(config: Partial<GroheBlueCombinedFeatureConfig>) {
    this.config = { ...config };
  }

  static get styles(): CSSResultGroup {
    return groheBlueLevelFeatureConfigStyles;
  }

  render(): TemplateResult {
    const localize = setupCustomlocalize(this.hass);
    const orderOptions = [
      { value: 'co2_filter', label: `${localize('editor.sections.co2')} → ${localize('editor.sections.filter')}` },
      { value: 'filter_co2', label: `${localize('editor.sections.filter')} → ${localize('editor.sections.co2')}` },
    ];
    const options = (keys: Array<[string, string]>) => keys.map(([value, key]) => ({ value, label: localize(key) }));

    return html`
      <div class="field">
        ${this.renderSelect(
          'unit',
          getUnit(this.config),
          options([
            ['percent', 'editor.unit.percent'],
            ['liter', 'editor.unit.liter'],
          ]),
          'editor.unit',
          localize,
        )}
      </div>
      <div class="field">
        ${this.renderSelect(
          'edge_content',
          this.config.edge_content ?? 'icon',
          options([
            ['icon', 'editor.edge_content.icon'],
            ['value', 'editor.edge_content.value'],
          ]),
          'editor.edge_content',
          localize,
        )}
      </div>
      <div class="field">${this.renderSelect('order', this.config.order ?? 'co2_filter', orderOptions, 'editor.order', localize)}</div>
      ${(this.config.order === 'filter_co2' ? [...LEVEL_KINDS].reverse() : LEVEL_KINDS).map((kind) => this.renderKind(kind, localize))}
    `;
  }

  private renderSelect(key: ConfigKey, value: string, options: Array<{ value: string; label: string }>, textKey: string, localize: (key: string) => string): TemplateResult {
    return html`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ select: { mode: 'dropdown', options } }}
        .value=${value}
        .label=${localize(`${textKey}.label`)}
        .helper=${localize(`${textKey}.description`)}
        .required=${true}
        @value-changed=${(ev: CustomEvent) => this._onValueChange(key, ev)}
      ></ha-selector>
    `;
  }

  private renderKind(kind: LevelKind, localize: (key: string) => string): TemplateResult {
    const auto = this.hass ? discoverLevelEntities(this.hass, this.context?.entity_id, kind) : {};
    const colorKey = `${kind}_color` as ConfigKey;
    const iconKey = `${kind}_icon` as ConfigKey;

    return html`
      <div class="options">
        <div class="section-label">${localize(`editor.sections.${kind}`)}</div>
        ${this.renderSource(`${kind}_entity` as ConfigKey, auto.percent, localize('editor.sources.percent_sensor'), localize)}
        ${this.renderSource(`${kind}_liters_entity` as ConfigKey, auto.liters, localize('editor.sources.liters_sensor'), localize)}
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ ui_color: { include_none: false, include_state: false } }}
            .value=${(this.config[colorKey] as string | undefined) ?? DEFAULT_COLORS[kind]}
            .label=${localize('editor.color.label')}
            .required=${true}
            @value-changed=${(ev: CustomEvent) => this._onValueChange(colorKey, ev)}
          ></ha-selector>
        </div>
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ icon: { placeholder: DEFAULT_ICONS[kind] } }}
            .value=${(this.config[iconKey] as string | undefined) ?? ''}
            .label=${localize('editor.icon.label')}
            .required=${false}
            @value-changed=${(ev: CustomEvent) => this._onValueChange(iconKey, ev)}
          ></ha-selector>
        </div>
      </div>
    `;
  }

  private renderSource(key: ConfigKey, autoEntity: string | undefined, label: string, localize: (key: string) => string): TemplateResult {
    const manual = this.config[key] as string | undefined;
    let chip: TemplateResult | typeof nothing = nothing;
    if (manual) {
      chip = html`<span class="chip manual">${localize('editor.sources.manual')}</span>`;
    } else if (autoEntity) {
      chip = html`<span class="chip auto">${localize('editor.sources.auto')}</span>`;
    }

    return html`
      <div class="source-row">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: 'sensor' } }}
          .value=${manual ?? autoEntity ?? ''}
          .label=${label}
          .required=${false}
          @value-changed=${(ev: CustomEvent) => this._onSourceChange(key, autoEntity, ev)}
        ></ha-selector>
        <div class="row-tail">
          ${chip}
          ${
            manual
              ? html`
                  <button class="reset-button" title=${localize('editor.sources.reset')} aria-label=${localize('editor.sources.reset')} @click=${() => this._setKey(key, undefined)}>
                    <svg viewBox="0 0 24 24"><path d="M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z" /></svg>
                  </button>
                `
              : nothing
          }
        </div>
      </div>
    `;
  }

  private _onSourceChange(key: ConfigKey, autoEntity: string | undefined, ev: CustomEvent) {
    ev.stopPropagation();
    const value = (ev.detail?.value as string | undefined) || undefined;
    this._setKey(key, value === autoEntity ? undefined : value);
  }

  private _onValueChange(key: ConfigKey, ev: CustomEvent) {
    ev.stopPropagation();
    this._setKey(key, (ev.detail?.value as string | undefined) || undefined);
  }

  private _setKey(key: ConfigKey, value: string | undefined) {
    const newConfig: Record<string, unknown> = { ...this.config };
    if (value === undefined) {
      delete newConfig[key];
    } else {
      newConfig[key] = value;
    }
    this.config = newConfig as Partial<GroheBlueCombinedFeatureConfig>;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config }, bubbles: true, composed: true }));
  }
}
