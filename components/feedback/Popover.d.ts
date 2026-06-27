import * as React from "react";

/**
 * Click-triggered floating panel for richer content than a Tooltip. Flat dark
 * surface; closes on outside click / Esc.
 */
export interface PopoverProps {
  /** The clickable anchor element. */
  trigger: React.ReactNode;
  placement?: "top" | "bottom";
  /** Inline-axis alignment to the trigger (RTL-aware). */
  align?: "start" | "center" | "end";
  width?: number;
  defaultOpen?: boolean;
  /** Node, or a render fn receiving { close }. */
  children?: React.ReactNode | ((api: { close: () => void }) => React.ReactNode);
  style?: React.CSSProperties;
}

export function Popover(props: PopoverProps): JSX.Element;
