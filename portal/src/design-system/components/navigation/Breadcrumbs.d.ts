import * as React from "react";

export interface Crumb {
  label: React.ReactNode;
  /** Omit on the current (last) page. */
  href?: string;
}

/**
 * Hierarchical trail — muted links, chevron separators (mirror under RTL),
 * plain current page.
 */
export interface BreadcrumbsProps {
  items?: Crumb[];
  style?: React.CSSProperties;
}

export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
