import * as React from "react";

/**
 * Heart "save to favorites" toggle for media tiles. Presentational — the
 * consumer owns state via `active` + `onChange`. Active fills the heart
 * bright-blue (the one accent; never red).
 */
export interface FavoriteButtonProps {
  /** Saved state. */
  active?: boolean;
  /** Called with the next state when toggled. */
  onChange?: (next: boolean) => void;
  /** Accessible label / tooltip (e.g. "Add to favorites"). */
  label?: string;
  /** Heart glyph size in px. Default 20. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FavoriteButton(props: FavoriteButtonProps): JSX.Element;
