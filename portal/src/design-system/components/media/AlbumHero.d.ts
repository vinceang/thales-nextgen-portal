import * as React from "react";

/**
 * Media "now featured" hero: a crisp cover plus the same image as a blurred
 * full-bleed aura under a dark gradient for legible light text. Cover aspect +
 * width are configurable for square album art (default) or portrait book
 * covers. Drop into HeroCarousel via `renderSlide`.
 */
export interface AlbumHeroProps {
  /** Cover image — shown crisp and (blurred) as the background aura. */
  cover?: string;
  /** Bright-blue kicker (e.g. "Listen"). */
  kicker?: string;
  /** Album / feature title (Playfair). */
  title: React.ReactNode;
  /** Secondary line (artist). */
  subtitle?: React.ReactNode;
  /** Primary CTA label (uppercased). Omit for no button. */
  ctaLabel?: string;
  onCta?: () => void;
  /** Hero height — px number or a CSS length. Default 440. */
  height?: number | string;
  /** Crisp cover aspect ratio (CSS `aspect-ratio`). Default "1 / 1"; use "2 / 3" for books. */
  aspect?: string;
  /** Crisp cover width (CSS length/clamp). Default `clamp(120px, 38%, 340px)`; narrow it for tall covers. */
  coverWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AlbumHero(props: AlbumHeroProps): JSX.Element;
