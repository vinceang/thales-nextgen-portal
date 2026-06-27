import * as React from "react";

/**
 * Determinate or indeterminate progress. Hairline track, highlight-blue fill.
 */
export interface ProgressBarProps {
  /** 0..max. Ignored when indeterminate. */
  value?: number;
  max?: number;
  /** Animated sweep when the duration is unknown. */
  indeterminate?: boolean;
  /** Caption above the track. */
  label?: string;
  /** Show a trailing % (determinate only). */
  showValue?: boolean;
  /** Track height in px. Default 6. */
  height?: number;
  style?: React.CSSProperties;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
