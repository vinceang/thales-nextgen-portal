import * as React from "react";

/**
 * Horizontally-scrolling row with an edge-fade at both ends (a CSS mask, so the
 * outermost items appear to fade out) and a hidden scrollbar. The reusable fade
 * treatment for non-tile scrollers (source rails, filter-pill rows); tile
 * shelves use MediaRail.
 */
export interface FadeScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fade width at each end — px number or CSS length. Default 32. */
  fade?: number | string;
  /** Gap between children — px number or CSS length. Default var(--space-sm). */
  gap?: number | string;
  /** Center the track when its content fits (vs. left-aligned). Default true. */
  center?: boolean;
  children?: React.ReactNode;
}

export function FadeScroller(props: FadeScrollerProps): JSX.Element;
