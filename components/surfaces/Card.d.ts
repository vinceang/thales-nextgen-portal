import * as React from "react";

/**
 * Neutral content container — dark raised surface, hairline border, sharp, flat.
 * For media tiles use ShowcaseTile; for pricing use PlanCard.
 */
export interface CardProps {
  /** Serif title in the header (or pass a custom `header`). */
  title?: string;
  subtitle?: string;
  /** Custom header node (overrides title/subtitle). */
  header?: React.ReactNode;
  /** Footer node; children align to the inline-end. */
  footer?: React.ReactNode;
  /** Lift the border on hover (use when the whole card is a link). */
  interactive?: boolean;
  /** Inner padding in px. Default 20. */
  padding?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
