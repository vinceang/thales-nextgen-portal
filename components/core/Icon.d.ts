import * as React from "react";

export type IconName =
  | "menu" | "home" | "search" | "wifi" | "user" | "x"
  | "plane" | "chevron-right" | "chevron-left" | "chevron-down"
  | "mountain" | "gauge" | "navigation" | "clock"
  | "sun" | "cloud" | "cloud-sun" | "cloud-rain"
  | "moon" | "cloud-moon" | "wind"
  | "check" | "eye" | "credit-card";

export interface IconProps {
  /** Glyph name. */
  name: IconName;
  /** Pixel size. Default 22. */
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: React.CSSProperties;
}

/** Thin single-weight line icon (Lucide-equivalent) used throughout the portal. */
export function Icon(props: IconProps): JSX.Element;
