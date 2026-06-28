import * as React from "react";

/**
 * Quiet label-over-value spec pair (no icon, no border) for secondary fact rows.
 * Group in a TileGrid.
 */
export interface DetailItemProps {
  /** Uppercase label. */
  label: React.ReactNode;
  /** Value text. */
  value: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export function DetailItem(props: DetailItemProps): JSX.Element;
