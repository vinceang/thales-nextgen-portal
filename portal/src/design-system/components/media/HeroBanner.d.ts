import * as React from "react";

/**
 * Large editorial promo banner with a Playfair headline and primary CTA.
 */
export interface HeroBannerProps {
  image?: string;
  /** Bright-blue kicker above the headline. */
  kicker?: string;
  /** Playfair headline. */
  title: React.ReactNode;
  /** Primary CTA label (uppercased). Omit for no button. */
  ctaLabel?: string;
  /** Append a trailing chevron to the CTA (mirrors the Link `arrow` affordance). */
  ctaArrow?: boolean;
  onCta?: () => void;
  height?: number;
  style?: React.CSSProperties;
}

export function HeroBanner(props: HeroBannerProps): JSX.Element;
