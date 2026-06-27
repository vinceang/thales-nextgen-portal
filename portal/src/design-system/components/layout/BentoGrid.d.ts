import * as React from "react";

/** One tier's layout: rows of space-separated area names + optional track sizing. */
export interface BentoTier {
  /** Rows of the grid, each a string of area names, e.g. "hero hero promoA". */
  areas: string[];
  /** grid-template-columns, e.g. "2fr 1fr 1fr". */
  columns?: string;
  /** grid-template-rows (optional). */
  rows?: string;
}

/**
 * Asymmetric layout via CSS named grid-template-areas — mobile-first. Name regions once
 * (keys of `items`), then re-place them per tier at the 561 / 1101px breakpoints.
 */
export interface BentoGridProps {
  /** Map of area name → node. Each is placed into its matching grid area. */
  items: Record<string, React.ReactNode>;
  /** Base / phone tier (single-column stack is typical). */
  phone?: BentoTier;
  /** Tablet tier (≥ 561px). */
  tablet?: BentoTier;
  /** Desktop tier (≥ 1101px) — the asymmetric composition. */
  desktop?: BentoTier;
  /** Gap in px. Default 16. */
  gap?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function BentoGrid(props: BentoGridProps): JSX.Element;
