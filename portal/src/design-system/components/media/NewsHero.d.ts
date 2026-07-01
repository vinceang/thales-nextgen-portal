import * as React from "react";

/**
 * Featured news story: a large image beside a date, a Playfair headline, and a
 * relative timestamp. Two columns on desktop/tablet, stacked on phone.
 * Presentational; `onClick` opens the story.
 */
export interface NewsHeroProps {
  /** Story image URL. */
  image?: string;
  /** Date line above the headline (e.g. "Aug 3, 2024"). */
  date?: React.ReactNode;
  /** Headline (Playfair). */
  title: React.ReactNode;
  /** Relative timestamp under the headline (e.g. "an hour ago"). */
  timeAgo?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function NewsHero(props: NewsHeroProps): JSX.Element;
