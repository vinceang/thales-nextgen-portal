import * as React from "react";

/**
 * Horizontally-scrolling "shelf" of media tiles with a heading and desktop
 * prev/next arrows. Children are the tiles (each carries its own width).
 */
export interface MediaRailProps {
  /** Row heading (e.g. "Trending Now"). */
  title?: string;
  /** Optional node at the inline-end of the heading (e.g. a "See all" Link). */
  action?: React.ReactNode;
  /** Gap between tiles in px. Default 16. */
  gap?: number;
  /** The tiles. */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MediaRail(props: MediaRailProps): JSX.Element;
