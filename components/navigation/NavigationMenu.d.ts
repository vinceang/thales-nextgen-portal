import * as React from "react";

export interface NavMenuItem {
  label: React.ReactNode;
  /** Selection key (defaults to label). */
  value?: string;
  /** Leading line-icon name. */
  icon?: string;
  /** Trailing count / badge. */
  badge?: React.ReactNode;
}
export interface NavMenuGroup {
  label?: string;
  items: NavMenuItem[];
}

/**
 * Data-driven vertical destination list, optionally grouped into sections.
 * Active item is bright-blue with an inline-start rule. Built to grow.
 */
export interface NavigationMenuProps {
  /** Flat NavMenuItem[] or grouped NavMenuGroup[]. */
  items?: NavMenuItem[] | NavMenuGroup[];
  value?: string;
  onSelect?: (value: string, item: NavMenuItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function NavigationMenu(props: NavigationMenuProps): JSX.Element;
