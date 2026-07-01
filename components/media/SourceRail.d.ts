import * as React from "react";

/** A selectable news source. */
export interface NewsSource {
  /** Stable id (selection key). */
  id: string;
  /** Display name (used for the button's aria-label / tooltip). */
  name: string;
  /** Monochrome logo URL (an SVG using `currentColor` works best). */
  logo: string;
}

/**
 * Horizontally-scrollable row of news-source logos. Inactive sources are dimmed;
 * the active one lifts to a solid light chip. Presentational — the consumer owns
 * selection via `active` + `onSelect`. Edge-fade + hidden scrollbar from FadeScroller.
 */
export interface SourceRailProps {
  sources?: NewsSource[];
  /** Active source id. */
  active?: string;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SourceRail(props: SourceRailProps): JSX.Element;
