import * as React from "react";

export interface TableColumn {
  key: string;
  header: React.ReactNode;
  /** Cell alignment — use "end" for numbers (right-aligned, tabular). */
  align?: "start" | "center" | "end";
  width?: number | string;
  /** Custom cell renderer (row) => node. */
  render?: (row: any) => React.ReactNode;
}

/**
 * Semantic data table — uppercase heads, hairline dividers, flat. For sorting /
 * selection / large sets use DataGrid.
 */
export interface TableProps {
  columns?: TableColumn[];
  rows?: any[];
  /** Field used as the React key per row. */
  rowKey?: string;
  getCellValue?: (row: any, col: TableColumn) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Table(props: TableProps): JSX.Element;
