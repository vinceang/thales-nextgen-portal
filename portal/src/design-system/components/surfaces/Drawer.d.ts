import * as React from "react";

/**
 * Edge sheet that slides in over a dim black backdrop. Generic content panel;
 * for the primary slide-out navigation use SideDrawer.
 */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  /** RTL-aware edge: start | end (inline axis) | bottom. Default "end". */
  side?: "start" | "end" | "bottom";
  title?: string;
  footer?: React.ReactNode;
  /** Width (side panels) or height (bottom) in px. Default 380. */
  size?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Drawer(props: DrawerProps): JSX.Element;
