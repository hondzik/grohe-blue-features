import type { HomeAssistant } from 'custom-card-helpers';

export {};

declare global {
  interface Window {
    customCardFeatures: CustomCardFeature[];
    customCards: CustomCard[];
  }

  interface LovelaceCardFeatureContext {
    entity_id?: string;
    area_id?: string;
  }

  interface CustomCardFeature {
    type: string;
    name: string;
    configurable?: boolean;
    isSupported?: (hass: HomeAssistant, context: LovelaceCardFeatureContext) => boolean;
  }

  interface CustomCard {
    type: string;
    name: string;
    description: string;
  }

  type FeatureConfig = {
    type: string;
  };

  type GroheLevelUnit = 'percent' | 'liter';

  /** HA frontend action config, as produced by the `ui_action` selector (`more-info`, `navigate`, `none`, ...). */
  type GroheActionConfig = { action: string; [key: string]: unknown };

  type GroheActionOptions = {
    /** Action on tap; defaults to more-info of the sensor in the displayed unit. */
    tap_action?: GroheActionConfig;
    /** Long-press resets the counter via the integration's reset button (after confirmation). */
    hold_reset?: boolean;
  };
  type GroheValuePosition = 'left' | 'right';

  type GroheBlueFeatureConfig = FeatureConfig &
    GroheActionOptions & {
      /** Unit of the displayed value; the progress bar always follows the percentage. */
      unit?: GroheLevelUnit;
      /** HA palette color name (e.g. `blue`) or any CSS color. */
      color?: string;
      value_position?: GroheValuePosition;
      show_icon?: boolean;
      /** Custom icon, e.g. `mdi:molecule-co2`; the feature default is used when empty. */
      icon?: string;
      /** Manual override of the percentage sensor. */
      entity?: string;
      /** Manual override of the liters sensor. */
      liters_entity?: string;
    };

  type GroheEdgeContent = 'icon' | 'percent' | 'liter';

  type GroheBlueCombinedFeatureConfig = FeatureConfig &
    GroheActionOptions & {
      /** What is shown at the outer edge of each bar; the bars themselves always follow the percentage. `value` is the legacy form, resolved through `unit`. */
      edge_content?: GroheEdgeContent | 'value';
      /** @deprecated Replaced by `edge_content: percent | liter`; only read together with the legacy `edge_content: value`. */
      unit?: GroheLevelUnit;
      /** Which bar comes first (left). */
      order?: 'co2_filter' | 'filter_co2';
      co2_color?: string;
      filter_color?: string;
      co2_icon?: string;
      filter_icon?: string;
      co2_entity?: string;
      co2_liters_entity?: string;
      filter_entity?: string;
      filter_liters_entity?: string;
    };

  // Minimal shape of the entity/device registry display data the frontend
  // attaches to the hass object (missing from custom-card-helpers' types).
  interface EntityRegistryDisplayEntry {
    entity_id: string;
    device_id?: string;
    name?: string;
    platform?: string;
  }

  interface DeviceRegistryDisplayEntry {
    id: string;
    name?: string;
    name_by_user?: string;
  }

  type HassWithRegistry = HomeAssistant & {
    entities?: Record<string, EntityRegistryDisplayEntry>;
    devices?: Record<string, DeviceRegistryDisplayEntry>;
  };
}
