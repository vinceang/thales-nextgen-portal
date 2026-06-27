import * as React from "react";

export interface NewsItemProps {
  image?: string;
  headline: React.ReactNode;
  /** Relative time, e.g. "an hour ago". */
  timestamp?: string;
  /** Lead story = large stacked layout with a Playfair headline. */
  lead?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** A news headline row (or lead story) — thumbnail, headline, relative timestamp. */
export function NewsItem(props: NewsItemProps): JSX.Element;
