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
 * Auto-advancing stack of HeroBanner slides with CarouselDots. Autoplay is
 * configurable (white-label): `autoPlay` toggles it, `intervalMs` sets cadence.
 * Pauses on hover/focus and under prefers-reduced-motion.
 */
export interface HeroCarouselProps {
  slides?: HeroSlide[];
  /** Auto-advance slides. Default true. */
  autoPlay?: boolean;
  /** Cadence between slides in ms. Default 6000. */
  intervalMs?: number;
  /** Carousel height — px number or a CSS length. Default 480. */
  height?: number | string;
  /** Fired when a slide's CTA is clicked: (slide, index). */
  onCta?: (slide: HeroSlide, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function HeroCarousel(props: HeroCarouselProps): JSX.Element;
