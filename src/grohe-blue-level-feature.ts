import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { groheBlueLevelFeatureStyles } from './grohe-blue-level-feature.styles';
import setupCustomlocalize from './localize';
import { HoldTapHandler, isInteractive, levelActionCallbacks } from './utils/hold-tap';
import { CO2_LABEL, computeLevelDisplay, computeLevelTitle, getUnit, getValuePosition, resolveCssColor, resolveIcon } from './utils/level-display';
import { isLevelSupported, resolveLevelSources } from './utils/level-sources';
import type { HoldTapCallbacks } from './utils/hold-tap';
import type { LevelKind, LevelSources } from './utils/level-sources';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { CSSResultGroup, TemplateResult } from 'lit';
import './grohe-blue-level-feature-config';

/** Shared implementation of the CO2 and filter features; subclasses only differ in `kind`. */
export abstract class GroheBlueLevelFeature extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: GroheBlueFeatureConfig;
  @property({ attribute: false }) context?: LovelaceCardFeatureContext;

  protected abstract readonly kind: LevelKind;

  private readonly _actions = new HoldTapHandler(() => this._actionCallbacks());

  private _actionCallbacks(): HoldTapCallbacks {
    if (!this.hass) return {};
    return levelActionCallbacks({
      host: this,
      hass: this.hass,
      contextEntityId: this.context?.entity_id,
      kind: this.kind,
      sources: this.sources,
      unit: getUnit(this.config),
      tapAction: this.config?.tap_action,
      holdReset: this.config?.hold_reset,
    });
  }

  get stateObj(): HassEntity | undefined {
    return this.context?.entity_id ? this.hass?.states[this.context.entity_id] : undefined;
  }

  // hui-card-feature.ts assigns `element.stateObj = ...` directly on every render
  // for legacy custom-card-feature compatibility. Without this setter, that
  // assignment throws (assigning to a getter-only accessor from strict-mode
  // code) and aborts the render, leaving the feature blank. State is derived
  // from context/hass above, so the assigned value is intentionally ignored.
  set stateObj(_stateObj: HassEntity | undefined) {
    void _stateObj;
  }

  get sources(): LevelSources {
    if (!this.hass) return {};
    return resolveLevelSources(this.hass, this.context?.entity_id, this.kind, this.config);
  }

  getCardSize(): number {
    return 1;
  }

  setConfig(config: GroheBlueFeatureConfig) {
    this.config = config;
  }

  render(): TemplateResult {
    if (!this.hass || !this.context || !this.sources.percent) {
      return html`<div class="level-row"><span class="value">${setupCustomlocalize(this.hass)('feature.unsupported')}</span></div>`;
    }

    const display = computeLevelDisplay(this.sources, getUnit(this.config), this.hass.locale?.language);
    const position = getValuePosition(this.config);
    const icon = resolveIcon(this.config, this.kind);
    const value = html`<div class="value ${position}">${display.text}</div>`;
    const title = computeLevelTitle(this.kind === 'co2' ? CO2_LABEL : setupCustomlocalize(this.hass)('feature.name.filter'), this.sources, this.hass.locale?.language);
    const interactive = isInteractive(this._actionCallbacks());
    const h = this._actions;

    return html`
      <div
        class="level-row${display.available ? '' : ' unavailable'}${interactive ? ' interactive' : ''}"
        style="--level-color: ${resolveCssColor(this.config?.color, this.kind)}"
        role=${interactive ? 'button' : nothing}
        tabindex=${interactive ? '0' : nothing}
        aria-label=${title}
        @pointerdown=${h.onPointerDown}
        @pointerup=${h.onPointerUp}
        @pointerleave=${h.onPointerCancel}
        @pointercancel=${h.onPointerCancel}
        @click=${h.onClick}
        @contextmenu=${h.onContextMenu}
        @keydown=${h.onKeyDown}
      >
        ${icon ? html`<ha-icon icon=${icon}></ha-icon>` : nothing} ${position === 'left' ? value : nothing}
        <div class="bar" title=${title}>
          <div class="level" style="width: ${display.percent}%;"></div>
        </div>
        ${position === 'right' ? value : nothing}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return groheBlueLevelFeatureStyles;
  }
}

@customElement('grohe-blue-co2-feature')
export class GroheBlueCo2Feature extends GroheBlueLevelFeature {
  protected readonly kind: LevelKind = 'co2';

  static getConfigElement(): HTMLElement {
    return document.createElement('grohe-blue-co2-feature-config');
  }

  static getStubConfig(): GroheBlueFeatureConfig {
    return { type: 'custom:grohe-blue-co2-feature' };
  }
}

@customElement('grohe-blue-filter-feature')
export class GroheBlueFilterFeature extends GroheBlueLevelFeature {
  protected readonly kind: LevelKind = 'filter';

  static getConfigElement(): HTMLElement {
    return document.createElement('grohe-blue-filter-feature-config');
  }

  static getStubConfig(): GroheBlueFeatureConfig {
    return { type: 'custom:grohe-blue-filter-feature' };
  }
}

window.customCardFeatures ||= [];
window.customCardFeatures.push(
  {
    type: 'grohe-blue-co2-feature',
    name: 'Grohe Blue CO₂ level',
    isSupported: (hass, context) => isLevelSupported(hass, context.entity_id, 'co2'),
    configurable: true,
  },
  {
    type: 'grohe-blue-filter-feature',
    name: 'Grohe Blue filter level',
    isSupported: (hass, context) => isLevelSupported(hass, context.entity_id, 'filter'),
    configurable: true,
  },
);
