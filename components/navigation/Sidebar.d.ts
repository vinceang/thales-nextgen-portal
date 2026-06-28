import * as React from "react";
import type { FlightTrackerProps } from "../domain/FlightTracker";

export interface SidebarItem {
  /** Selection key (defaults to label). */
  key?: string;
  /** @deprecated alias for `key`. */
  value?: string;
  label: React.ReactNode;
  /** Leading line-icon name (shown in both treatments). */
  icon?: string;
  /** Trailing count / tag. */
  badge?: React.ReactNode;
}

/**
 * The portal's configurable navigation surface — the two white-label sidebar
 * treatments the IFE shipped, switched by `variant`. The mini flight tracker is
 * a configurable item in either: pass `flight` to show it, omit to hide.
 */
export interface SidebarProps {
  /**
   *  "overlay" (A) — full-height slide-out drawer over a backdrop, large
   *                  single-word items (the white-label default skin). Themed. Default.
   *  "rail"    (B) — persistent icon rail pinned to the inline-start edge;
   *                  expanding it WIDENS the rail in-flow and pushes the content
   *                  toward the inline-end (right in LTR, left in RTL).
   */
  variant?: "overlay" | "rail";
  /** Nav items — strings or { key, label, icon, badge }. */
  items?: (string | SidebarItem)[];
  /** Active item key. */
  active?: string;
  onSelect?: (key: string) => void;
  /** Mini flight tracker shown at the top of the panel; omit to hide. */
  flight?: FlightTrackerProps;
  /**
   * Expanded/open state.
   *  - `overlay`: the drawer is open.
   *  - `rail`: the rail is widened (labels shown, content pushed). If none of
   *    `onToggle`/`onOpen`/`onClose` is provided, the rail manages this itself.
   */
  open?: boolean;
  /** Expand the rail (`rail`, controlled mode). */
  onOpen?: () => void;
  /** Collapse the rail / close the drawer. */
  onClose?: () => void;
  /** Toggle the rail's expanded state (`rail`, controlled mode). Preferred over
   *  onOpen/onClose when a single control flips it both ways. */
  onToggle?: () => void;
  /** Optional uppercase cap above the items in the expanded rail. */
  title?: string;
  /**
   * Show the rail's own expand (hamburger) button at the top (`rail` only).
   * Default true. Set false when an external control (e.g. the NavBar
   * hamburger) already drives `onOpen`, to avoid a duplicate trigger.
   */
  showToggle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Sidebar(props: SidebarProps): JSX.Element;
