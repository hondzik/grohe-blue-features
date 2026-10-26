import { css } from 'lit';

export const groheBlueLevelFeatureStyles = css`
  .level-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: var(--feature-height, 42px);
    padding: 0 4px;
    box-sizing: border-box;
    --level-color: var(--primary-color);
  }

  .level-row.unavailable .level {
    opacity: 0.4;
  }

  ha-icon {
    flex: none;
    --mdc-icon-size: 20px;
    color: var(--level-color);
  }

  .bar {
    flex: 1;
    min-width: 0;
    border: 1px solid color-mix(in srgb, var(--level-color) 80%, transparent);
    border-radius: 5px;
    height: 8px;
    background-color: color-mix(in srgb, var(--level-color) 30%, transparent);
    overflow: hidden;
  }

  .level {
    height: 100%;
    background-color: color-mix(in srgb, var(--level-color) 70%, transparent);
    transition: width 0.4s ease;
  }

  .value {
    flex: none;
    min-width: 45px;
    font-size: var(--ha-font-size-s);
    font-weight: var(--ha-font-weight-normal);
    letter-spacing: 0.4px;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .value.right {
    text-align: right;
  }

  .value.left {
    text-align: left;
  }

  /* clickable bars: pointer, hover highlight, keyboard focus, no text selection / callout on long-press */
  .interactive {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
  }

  .interactive:hover .bar {
    filter: brightness(1.2);
  }

  .level-row:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: 8px;
  }
`;
