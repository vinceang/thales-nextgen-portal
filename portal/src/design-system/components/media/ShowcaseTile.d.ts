import * as React from "react";

/**
 * Signature bento media cell — full-bleed image, bottom scrim, kicker + serif title.
 */
export interface ShowcaseTileProps {
  /** Full-bleed background image URL. */
  image?: string;
  /** Bright-blue action kicker (WATCH / LISTEN / DESTINATION …). */
  kicker?: string;
  /** Tile title. */
  title: React.ReactNode;
  /**
   * Title font family:
   *  "tile"    — Noto Serif Display 600 (default)
   *  "sans"    — Montserrat 700
   *  "display" — Playfair Display 700 (reserve for hero-level tiles only)
   */
  font?: "tile" | "sans" | "display";
  /** @deprecated Use `font`. Serif title (Noto Serif); false = Montserrat. */
  serif?: boolean;
  /** Title font-size in px. */
  titleSize?: number;
  /** Tile height in px. */
  height?: number;
  align?: "left" | "center";
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function ShowcaseTile(props: ShowcaseTileProps): JSX.Element;
