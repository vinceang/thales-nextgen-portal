import * as React from "react";

/**
 * Wi-Fi pricing plan card; recommended variant gets a highlight-blue top bar and filled CTA.
 */
export interface PlanCardProps {
  /** Plan name, e.g. "High-Speed Streaming". */
  name: string;
  /** Price, e.g. "$6". */
  price: string;
  /** Feature lines (rendered with blue check-circle bullets). */
  features?: string[];
  /** Emphasize as recommended: solid blue top bar, star, badge, filled CTA. */
  recommended?: boolean;
  /** Caption above the CTA on the recommended card. */
  badge?: string;
  ctaLabel?: string;
  onSelect?: () => void;
  className?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PlanCard(props: PlanCardProps): JSX.Element;
