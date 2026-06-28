import * as React from "react";

/**
 * Container for a set of filter groups. Header with title + "Clear all"; holds
 * FilterSections. Use inline in a sidebar or inside a Drawer on phone.
 */
export interface FilterPanelProps {
  title?: string;
  /** Count of applied filters, shown beside the title. */
  activeCount?: number;
  /** Renders the "Clear all" link when provided. */
  onClear?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function FilterPanel(props: FilterPanelProps): JSX.Element;

/** One labelled group within a FilterPanel (hairline rule + uppercase label). */
export interface FilterSectionProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function FilterSection(props: FilterSectionProps): JSX.Element;
