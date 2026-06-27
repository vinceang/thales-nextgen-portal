import * as React from "react";

export interface DataGridColumn {
  key: string;
  header: React.ReactNode;
  align?: "start" | "center" | "end";
  width?: number | string;
  /** Disable sorting for this column. */
  sortable?: boolean;
  /** Value used for sorting (defaults to row[key]). */
  sortValue?: (row: any) => string | number;
  /** Custom cell renderer. */
  render?: (row: any) => React.ReactNode;
}

/**
 * Interactive table — click-to-sort heads, optional row selection, sticky head.
 * Same flat sharp treatment as Table; one accent for sort / selection.
 */
export interface DataGridProps {
  columns?: DataGridColumn[];
  rows?: any[];
  /** Field used as the row id (default "id"). */
  rowKey?: string;
  /** Show a leading selection checkbox column. */
  selectable?: boolean;
  /** Controlled selected ids (Set or array). */
  selected?: Set<string> | string[];
  onSelectedChange?: (next: Set<string>) => void;
  style?: React.CSSProperties;
}

export function DataGrid(props: DataGridProps): JSX.Element;
