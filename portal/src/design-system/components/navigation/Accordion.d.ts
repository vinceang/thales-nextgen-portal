import * as React from "react";

export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

/**
 * Stacked expandable sections separated by hairlines, with a rotating chevron.
 */
export interface AccordionProps {
  items?: AccordionItem[];
  /** Allow several panels open at once. Default false (single). */
  multiple?: boolean;
  /** Indices open on mount. */
  defaultOpen?: number[];
  className?: string;
  style?: React.CSSProperties;
}

export function Accordion(props: AccordionProps): JSX.Element;
