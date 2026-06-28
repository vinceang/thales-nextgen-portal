import * as React from "react";

/**
 * Small sharp status / count label. Monochrome + blue only — status meaning is
 * carried by an icon or label, never a second hue.
 */
export interface BadgeProps {
  /** `neutral` (surface fill) | `accent` (blue fill) | `outline` (hairline). */
  tone?: "neutral" | "accent" | "outline";
  /** Render a tiny standalone status dot instead of a labelled tag. */
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
