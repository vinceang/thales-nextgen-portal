import * as React from "react";

/** One hero slide. Mirrors the HeroBanner props the carousel forwards. */
export interface HeroSlide {
  id?: string;
  image?: string;
  kicker?: string;
  title: React.ReactNode;
  ctaLabel?: string;
  ctaArrow?: boolean;
}

/**
 * Auto-advancing stack of slides with CarouselDots. By default each slide is a
 * HeroBanner; pass `renderSlide` to render a custom slide (e.g. AlbumHero) and
 * reuse the autoplay/dots/crossfade machinery. Autoplay is configurable
 * (white-label): `autoPlay` toggles it, `intervalMs` sets cadence. Pauses on
 * hover/focus and under prefers-reduced-motion.
 *
 * Generic over the slide type `T` — defaults to `HeroSlide` (the shape the
 * built-in HeroBanner rendering consumes).
 */
export interface HeroCarouselProps<T = HeroSlide> {
  slides?: T[];
  /** Custom slide renderer. When set, overrides the default HeroBanner. */
  renderSlide?: (slide: T, index: number) => React.ReactNode;
  /** Auto-advance slides. Default true. */
  autoPlay?: boolean;
  /** Cadence between slides in ms. Default 6000. */
  intervalMs?: number;
  /** Carousel height — px number or a CSS length. Default 480. */
  height?: number | string;
  /** Fired when a default (HeroBanner) slide's CTA is clicked: (slide, index). */
  onCta?: (slide: T, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function HeroCarousel<T = HeroSlide>(props: HeroCarouselProps<T>): JSX.Element;
