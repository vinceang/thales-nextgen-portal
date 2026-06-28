import * as React from "react";

/**
 * Pulsing placeholder that reserves layout while content loads.
 */
export interface SkeletonProps {
  /** `text` (one or more lines) | `block` (tile/poster) | `circle` (avatar). */
  variant?: "text" | "block" | "circle";
  /** CSS width (e.g. 200 or "100%"). */
  width?: number | string;
  /** CSS height. */
  height?: number | string;
  /** For variant="text": number of lines (last is shortened). */
  lines?: number;
  /** Gap between text lines in px. */
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
