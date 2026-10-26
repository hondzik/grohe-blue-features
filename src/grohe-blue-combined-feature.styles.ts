import { css } from 'lit';

export const groheBlueCombinedFeatureStyles = css`
  .combined {
    display: grid;
    grid-template-columns: auto 1fr 1fr auto;
    align-items: center;
    column-gap: 8px;
    height: var(--feature-height, 42px);
    padding: 0 4px;
    box-sizing: border-box;
  }

  /* items only group the cells and carry the bar color */
  .item {
    display: contents;
    --level-color: var(--primary-color);
  }

  .item.unavailable .level {
    opacity: 0.4;
  }

  .edge {
    display: flex;
    align-items: center;
    font-size: var(--ha-font-size-s);
    letter-spacing: 0.4px;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .edge.first {
    justify-content: flex-start;
  }

  .edge.second {
    justify-content: flex-end;
  }

  ha-icon {
    --mdc-icon-size: 20px;
    color: var(--level-color);
  }

  .bar {
    min-width: 0;
    border: 1px solid color-mix(in srgb, var(--level-color) 80%, transparent);
    border-radius: 5px;
    height: 8px;
    background-color: color-mix(in srgb, var(--level-color) 30%, transparent);
    overflow: hidden;
  }

  /* extra space between the two bars */
  .item + .item .bar:first-child {
    margin-left: 8px;
  }

  /* the right bar is anchored to the right edge, so it shrinks from the middle of the card */
  .item + .item .level {
    margin-left: auto;
  }

  .level {
    height: 100%;
    background-color: color-mix(in srgb, var(--level-color) 70%, transparent);
    transition: width 0.4s ease;
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

  .bar:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;
