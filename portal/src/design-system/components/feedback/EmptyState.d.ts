import * as React from "react";

/**
 * Centered placeholder for a view with no content yet.
 */
export interface EmptyStateProps {
  /** Line-icon name shown in the hairline ring (default "inbox"). */
  icon?: string;
  title?: string;
  message?: string;
  /** Optional single action node (e.g. a <Button/>). */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
