import * as React from "react";
import type { FlightTrackerProps } from "../domain/FlightTracker";

export interface DrawerItem {
  key: string;
  label: string;
}

/**
 * Full-height black slide-out menu: flight tracker + large Montserrat nav items.
 */
export interface SideDrawerProps {
  open?: boolean;
  /** Nav items — strings or { key, label }. */
  items?: (string | DrawerItem)[];
  /** Active item key. */
  active?: string;
  /** Flight tracker props rendered at the top; omit to hide. */
  flight?: FlightTrackerProps;
  /** Optional slot pinned to the bottom of the panel (e.g. a language selector). */
  footer?: React.ReactNode;
  onSelect?: (key: string) => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SideDrawer(props: SideDrawerProps): JSX.Element;
