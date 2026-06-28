import * as React from "react";

/**
 * Page selector — sharp square cells, highlight-blue current page, mirroring
 * prev/next chevrons. Long ranges collapse with ellipses.
 */
export interface PaginationProps {
  /** Current 1-based page. */
  page?: number;
  /** Total page count. */
  total?: number;
  onChange?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Pagination(props: PaginationProps): JSX.Element;
