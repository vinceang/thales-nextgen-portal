import * as React from "react";

/**
 * Music "now featured" hero: a crisp 1:1 cover plus the same image as a blurred
 * full-bleed aura under a dark gradient for legible light text. Drop into
 * HeroCarousel via `renderSlide`.
 */
export interface AlbumHeroProps {
  /** Square cover image — shown crisp and (blurred) as the background aura. */
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
  className?: string;
  style?: React.CSSProperties;
}

export function AlbumHero(props: AlbumHeroProps): JSX.Element;
