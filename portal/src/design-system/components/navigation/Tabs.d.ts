import * as React from "react";

/**
 * Horizontal view switcher. Active tab is bright-blue with a highlight-blue
 * underline. Data-driven; scrolls when it overflows.
 */
export interface TabsProps {
  /** string[] or {value,label}[]. */
  tabs?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
