import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { renderActionOptions } from './action-options-editor';
import { groheBlueLevelFeatureConfigStyles } from './grohe-blue-level-feature-config.styles';
import setupCustomlocalize from './localize';
import { DEFAULT_COLORS, DEFAULT_ICONS, getBoolConfigVal, getUnit, getValuePosition } from './utils/level-display';
import { discoverLevelEntities } from './utils/level-sources';
import type { DiscoveredEntities, LevelKind } from './utils/level-sources';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';

type SourceField = 'entity' | 'liters_entity';

/** Shared visual editor of the CO2 and filter features; subclasses only differ in `kind`. */
export abstract class GroheBlueLevelFeatureConfigEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) context?: LovelaceCardFeatureContext;
  @property({ type: Object }) config: Partial<GroheBlueFeatureConfig> = {};

  protected abstract readonly kind: LevelKind;

  setConfig(config: Partial<GroheBlueFeatureConfig>) {
    this.config = { ...config };
  }

  static get styles(): CSSResultGroup {
    return groheBlueLevelFeatureConfigStyles;
  }

  private get _auto(): DiscoveredEntities {
    if (!this.hass) return {};
    return discoverLevelEntities(this.hass, this.context?.entity_id, this.kind);
  }

  private get _deviceName(): string | undefined {
    const hass = this.hass as HassWithRegistry | undefined;
    const deviceId = this.context?.entity_id ? hass?.entities?.[this.context.entity_id]?.device_id : undefined;
    const device = deviceId ? hass?.devices?.[deviceId] : undefined;
    return device?.name_by_user ?? device?.name;
  }

  render(): TemplateResult {
    const localize = setupCustomlocalize(this.hass);
    const auto = this._auto;
    const found = !!auto.percent || !!auto.liters;
    const deviceName = found ? this._deviceName : undefined;

    const unitOptions = [
      { value: 'percent', label: localize('editor.unit.percent') },
      { value: 'liter', label: localize('editor.unit.liter') },
    ];
    const positionOptions = [
      { value: 'left', label: localize('editor.value_position.left') },
      { value: 'right', label: localize('editor.value_position.right') },
    ];
    const showIcon = getBoolConfigVal(this.config, 'show_icon', true);

    return html`
      <div class="section-label">${localize('editor.sources.title')}</div>
      <div class="source-banner">
        <div>
          <div>${found ? localize('editor.sources.mode_auto') : localize('editor.sources.mode_none')}</div>
          ${deviceName ? html`<div class="secondary">${deviceName}</div>` : nothing}
        </div>
      </div>
      ${this.renderSourceRow('entity', auto.percent, localize('editor.sources.percent_sensor'), localize)}
      ${this.renderSourceRow('liters_entity', auto.liters, localize('editor.sources.liters_sensor'), localize)}

      <div class="options">
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ select: { mode: 'dropdown', options: unitOptions } }}
            .value=${getUnit(this.config)}
            .label=${localize('editor.unit.label')}
            .helper=${localize('editor.unit.description')}
            .required=${true}
            @value-changed=${(ev: CustomEvent) => this._onValueChange('unit', ev)}
          ></ha-selector>
        </div>
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ ui_color: { include_none: false, include_state: false } }}
            .value=${this.config.color ?? DEFAULT_COLORS[this.kind]}
            .label=${localize('editor.color.label')}
            .helper=${localize('editor.color.description')}
            .required=${true}
            @value-changed=${(ev: CustomEvent) => this._onValueChange('color', ev)}
          ></ha-selector>
        </div>
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ select: { mode: 'dropdown', options: positionOptions } }}
            .value=${getValuePosition(this.config)}
            .label=${localize('editor.value_position.label')}
            .helper=${localize('editor.value_position.description')}
            .required=${true}
            @value-changed=${(ev: CustomEvent) => this._onValueChange('value_position', ev)}
          ></ha-selector>
        </div>
        <ha-settings-row>
          <span slot="heading">${localize('editor.show_icon.label')}</span>
          <span slot="description">${localize('editor.show_icon.description')}</span>
          <ha-switch @change=${this._onShowIconChange} .checked=${showIcon} name="show_icon"></ha-switch>
        </ha-settings-row>
        ${
          showIcon
            ? html`
                <div class="field">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ icon: { placeholder: DEFAULT_ICONS[this.kind] } }}
                    .value=${this.config.icon ?? ''}
                    .label=${localize('editor.icon.label')}
                    .required=${false}
                    @value-changed=${(ev: CustomEvent) => this._onValueChange('icon', ev)}
                  ></ha-selector>
                </div>
              `
            : nothing
        }
        ${renderActionOptions(this.hass, this.config, localize, (key, value) => this._setOption(key, value))}
      </div>
    `;
  }

  private _setOption(key: keyof GroheActionOptions, value: unknown) {
    const newConfig: Record<string, unknown> = { ...this.config };
    if (value === undefined) {
      delete newConfig[key];
    } else {
      newConfig[key] = value;
    }
    this._updateConfig(newConfig as Partial<GroheBlueFeatureConfig>);
  }

  private renderSourceRow(field: SourceField, autoEntity: string | undefined, label: string, localize: (key: string) => string): TemplateResult {
    const manual = this.config[field];
    const value = manual ?? autoEntity ?? '';

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
          .value=${value}
          .label=${label}
          .required=${false}
          @value-changed=${(ev: CustomEvent) => this._onSourceChange(field, autoEntity, ev)}
        ></ha-selector>
        <div class="row-tail">
          ${chip}
          ${
            manual
              ? html`
                  <button class="reset-button" title=${localize('editor.sources.reset')} aria-label=${localize('editor.sources.reset')} @click=${() => this._onSourceReset(field)}>
                    <svg viewBox="0 0 24 24"><path d="M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z" /></svg>
                  </button>
                `
              : nothing
          }
        </div>
      </div>
    `;
  }

  private _onSourceChange(field: SourceField, autoEntity: string | undefined, ev: CustomEvent) {
    ev.stopPropagation();
    const value = (ev.detail?.value as string | undefined) || undefined;
    const newConfig = { ...this.config };
    if (!value || value === autoEntity) {
      delete newConfig[field];
    } else {
      newConfig[field] = value;
    }
    this._updateConfig(newConfig);
  }

  private _onSourceReset(field: SourceField) {
    const newConfig = { ...this.config };
    delete newConfig[field];
    this._updateConfig(newConfig);
  }

  private _onValueChange(key: 'unit' | 'color' | 'value_position' | 'icon', ev: CustomEvent) {
    ev.stopPropagation();
    const value = (ev.detail?.value as string | undefined) || undefined;
    const newConfig: Partial<GroheBlueFeatureConfig> = { ...this.config };
    if (value === undefined) {
      delete newConfig[key];
    } else {
      (newConfig as Record<string, unknown>)[key] = value;
    }
    this._updateConfig(newConfig);
  }

  private _onShowIconChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this._updateConfig({ ...this.config, show_icon: checked });
  }

  private _updateConfig(newConfig: Partial<GroheBlueFeatureConfig>) {
    this.config = newConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

@customElement('grohe-blue-co2-feature-config')
export class GroheBlueCo2FeatureConfigEditor extends GroheBlueLevelFeatureConfigEditor {
  protected readonly kind: LevelKind = 'co2';
}

@customElement('grohe-blue-filter-feature-config')
export class GroheBlueFilterFeatureConfigEditor extends GroheBlueLevelFeatureConfigEditor {
  protected readonly kind: LevelKind = 'filter';
}
