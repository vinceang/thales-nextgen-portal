import * as React from "react";

/** Font role for a tile's title or kicker. */
export type TileFontRole = "display" | "sans" | "tile";

/**
 * Signature bento media cell — full-bleed image, bottom scrim, kicker + title.
 *
 * Title font is prominence-driven by default: a large featured / hero tile gets
 * the Playfair display face, an ordinary gallery tile gets Montserrat. Noto Serif
 * ("tile") is opt-in. Override per tile with `titleFont` / `kickerFont` (font role)
 * or `titleStyle` / `kickerStyle` (arbitrary style).
 */
export interface ShowcaseTileProps {
  /** Full-bleed background image URL. */
  image?: string;
  /** Bright-blue action kicker (WATCH / LISTEN / DESTINATION …). */
  kicker?: string;
  /** Tile title. */
  title: React.ReactNode;
  /**
   * Title font role override. When omitted, the font is chosen by prominence:
   *  large/hero tile → "display" (Playfair); otherwise → "sans" (Montserrat).
   *  "display" — Playfair Display 600
   *  "sans"    — Montserrat 600
   *  "tile"    — Noto Serif Display 600 (opt-in)
   */
  titleFont?: TileFontRole;
  /** Kicker font role override. Defaults to Montserrat (the kicker's own face). */
  kickerFont?: TileFontRole;
  /** Arbitrary style overrides for the title element. */
  titleStyle?: React.CSSProperties;
  /** Arbitrary style overrides for the kicker element. */
  kickerStyle?: React.CSSProperties;
  /** @deprecated Use `titleFont`. Alias for the title font role. */
  font?: TileFontRole;
  /** @deprecated Use `titleFont`. true = Noto Serif ("tile"); false = Montserrat ("sans"). */
  serif?: boolean;
  /** Title font-size in px. Drives the prominence default (≥30 → display). */
  titleSize?: number;
  /** Tile height — px number, or a CSS length string (e.g. "100%") to fill its cell.
   *  A numeric height ≥300 drives the prominence default (→ display). */
  height?: number | string;
  align?: "left" | "center";
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ShowcaseTile(props: ShowcaseTileProps): JSX.Element;
