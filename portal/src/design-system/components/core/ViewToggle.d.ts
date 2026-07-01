import * as React from "react";

/** Gallery layout mode. */
export type GalleryView = "grid" | "list";

/**
 * Two-option segmented control for switching a gallery between grid and list
 * layouts. Presentational — the consumer owns `value` + `onChange`. The selected
 * segment is an inverted fill (theme-safe), not a hue.
 */
export interface ViewToggleProps {
  /** Current view. Default "grid". */
  value?: GalleryView;
  onChange?: (view: GalleryView) => void;
  /** Accessible label / tooltip for the grid button. Default "Grid view". */
  gridLabel?: string;
  /** Accessible label / tooltip for the list button. Default "List view". */
  listLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ViewToggle(props: ViewToggleProps): JSX.Element;
