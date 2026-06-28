import * as React from "react";

/**
 * Identity mark for a passenger or content source. Sharp by default; falls back
 * image → initials → user glyph.
 */
export interface AvatarProps {
  /** Image URL. If absent, initials from `name`, else a line user glyph. */
  src?: string;
  /** Full name — drives initials and the image alt text. */
  name?: string;
  /** Preset `sm`(28) | `md`(40) | `lg`(56), or an explicit pixel number. */
  size?: "sm" | "md" | "lg" | number;
  /** `square` (radius-card, on-brand default) | `circle` (radius-pill). */
  shape?: "square" | "circle";
  className?: string;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
