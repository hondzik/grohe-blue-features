import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { groheBlueCombinedFeatureStyles } from './grohe-blue-combined-feature.styles';
import setupCustomlocalize from './localize';
import { HoldTapHandler, isInteractive, levelActionCallbacks } from './utils/hold-tap';
import { CO2_LABEL, computeLevelDisplay, computeLevelTitle, DEFAULT_ICONS, getEdgeContent, kindConfig, resolveCssColor } from './utils/level-display';
import { isLevelSupported, resolveLevelSources } from './utils/level-sources';
import type { HoldTapCallbacks } from './utils/hold-tap';
import type { LevelKind, LevelSources } from './utils/level-sources';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { CSSResultGroup, TemplateResult } from 'lit';
import './grohe-blue-combined-feature-config';

@customElement('grohe-blue-combined-feature')
export class GroheBlueCombinedFeature extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: GroheBlueCombinedFeatureConfig;
  @property({ attribute: false }) context?: LovelaceCardFeatureContext;

  /** One handler per bar; each resolves the current sources of its kind when pressed. */
  private readonly _actions: Record<LevelKind, HoldTapHandler> = {
    co2: new HoldTapHandler(() => this._actionCallbacks('co2')),
    filter: new HoldTapHandler(() => this._actionCallbacks('filter')),
  };

  private _sources(kind: LevelKind): LevelSources {
    return this.hass ? resolveLevelSources(this.hass, this.context?.entity_id, kind, kindConfig(this.config, kind)) : {};
  }

  private _actionCallbacks(kind: LevelKind): HoldTapCallbacks {
    if (!this.hass) return {};
    return levelActionCallbacks({
      host: this,
      hass: this.hass,
      contextEntityId: this.context?.entity_id,
      kind,
      sources: this._sources(kind),
      unit: getEdgeContent(this.config) === 'liter' ? 'liter' : 'percent',
      tapAction: this.config?.tap_action,
      holdReset: this.config?.hold_reset,
    });
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('grohe-blue-combined-feature-config');
  }

  static getStubConfig(): GroheBlueCombinedFeatureConfig {
    return { type: 'custom:grohe-blue-combined-feature' };
  }

  get stateObj(): HassEntity | undefined {
    return this.context?.entity_id ? this.hass?.states[this.context.entity_id] : undefined;
  }

  // hui-card-feature.ts assigns `element.stateObj = ...` on every render for legacy
  // compatibility; without this setter the assignment throws and the feature stays blank.
  set stateObj(_stateObj: HassEntity | undefined) {
    void _stateObj;
  }

  getCardSize(): number {
    return 1;
  }

  setConfig(config: GroheBlueCombinedFeatureConfig) {
    this.config = config;
  }

  render(): TemplateResult {
    const hass = this.hass;
    if (!hass || !this.context || !isLevelSupported(hass, this.context.entity_id, 'co2')) {
      return html`<div class="combined"><div class="edge">${setupCustomlocalize(hass)('feature.unsupported')}</div></div>`;
    }
    const kinds: LevelKind[] = this.config?.order === 'filter_co2' ? ['filter', 'co2'] : ['co2', 'filter'];
    return html`<div class="combined">${this.renderItem(hass, kinds[0], true)} ${this.renderItem(hass, kinds[1], false)}</div>`;
  }

  /** The first item renders `edge bar`, the second `bar edge`, so the edges sit on the outside. */
  private renderItem(hass: HomeAssistant, kind: LevelKind, first: boolean): TemplateResult {
    const cfg = kindConfig(this.config, kind);
    const sources = this._sources(kind);
    const edgeContent = getEdgeContent(this.config);
    const display = computeLevelDisplay(sources, edgeContent === 'liter' ? 'liter' : 'percent', hass.locale?.language);
    const title = computeLevelTitle(kind === 'co2' ? CO2_LABEL : setupCustomlocalize(hass)('feature.name.filter'), sources, hass.locale?.language);
    const edge = html`<div class="edge ${first ? 'first' : 'second'}">
      ${edgeContent === 'icon' ? html`<ha-icon icon=${cfg.icon?.trim() || DEFAULT_ICONS[kind]}></ha-icon>` : display.text}
    </div>`;
    const interactive = isInteractive(this._actionCallbacks(kind));
    const h = this._actions[kind];
    const bar = html`<div class="bar" title=${title} role=${interactive ? 'button' : nothing} tabindex=${interactive ? '0' : nothing} aria-label=${title}>
      <div class="level" style="width: ${display.percent}%;"></div>
    </div>`;

    return html`
      <div
        class="item${display.available ? '' : ' unavailable'}${interactive ? ' interactive' : ''}"
        style="--level-color: ${resolveCssColor(cfg.color, kind)}"
        @pointerdown=${h.onPointerDown}
        @pointerup=${h.onPointerUp}
        @pointerleave=${h.onPointerCancel}
        @pointercancel=${h.onPointerCancel}
        @click=${h.onClick}
        @contextmenu=${h.onContextMenu}
        @keydown=${h.onKeyDown}
      >
        ${first ? edge : bar} ${first ? bar : edge}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return groheBlueCombinedFeatureStyles;
  }
}

window.customCardFeatures ||= [];
window.customCardFeatures.push({
  type: 'grohe-blue-combined-feature',
  name: 'Grohe Blue CO₂ + filter level',
  isSupported: (hass, context) => isLevelSupported(hass, context.entity_id, 'co2'),
  configurable: true,
});
