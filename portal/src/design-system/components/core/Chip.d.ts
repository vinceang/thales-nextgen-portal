import * as React from "react";

/**
 * Compact sharp token for an applied filter / selected value / tag. For the
 * rounded category filter use GenrePill instead — that is the one rounded shape.
 */
export interface ChipProps {
  /** Selected state — solid highlight-blue fill. */
  selected?: boolean;
  /** When provided, renders a trailing × dismiss control. */
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  /** Optional leading element (small icon / avatar). */
  leading?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Chip(props: ChipProps): JSX.Element;
