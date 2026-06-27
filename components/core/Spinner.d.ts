import * as React from "react";

/**
 * Indeterminate loading ring — hairline track, highlight-blue arc.
 */
export interface SpinnerProps {
  /** Diameter in px. Default 28. */
  size?: number;
  /** Ring stroke width in px. Default 3. */
  thickness?: number;
  /** Optional inline caption shown after the ring (and used as aria-label). */
  label?: string;
  style?: React.CSSProperties;
}

export function Spinner(props: SpinnerProps): JSX.Element;
