import * as React from "react";

/**
 * Small hover/focus label on a single child. Black bubble, sharp, flat.
 */
export interface TooltipProps {
  /** The text shown in the bubble. */
  label: React.ReactNode;
  /** RTL-aware placement. start/end follow the inline axis. */
  placement?: "top" | "bottom" | "start" | "end";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Tooltip(props: TooltipProps): JSX.Element;
