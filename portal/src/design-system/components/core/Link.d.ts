import * as React from "react";

/**
 * Text hyperlink. `inline` = bright-blue body link (underline on hover);
 * `standalone` = uppercase Montserrat action link with optional chevron.
 */
export interface LinkProps {
  href?: string;
  /** `inline` body link | `standalone` uppercase action link. */
  variant?: "inline" | "standalone";
  /** Show a trailing chevron (mirrors under RTL). */
  arrow?: boolean;
  /** Open in a new tab + rel=noopener. */
  external?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Link(props: LinkProps): JSX.Element;
