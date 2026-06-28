import * as React from "react";

/**
 * The system's single responsive grid, authored mobile-first: phone is the base
 * stack; tablet/desktop add columns upward at the documented 561 / 1101px breakpoints.
 */
export interface TileGridProps {
  /** Columns on desktop (≥ 1101px). Default 4. */
  columns?: number;
  /** Columns on tablet (561–1100px). Defaults to min(columns, 2). */
  tablet?: number;
  /** Columns on phone (≤ 560px). Default 1. */
  phone?: number;
  /** Gap in px. Default 16. */
  gap?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TileGrid(props: TileGridProps): JSX.Element;
