import * as React from "react";

/**
 * Secondary news story: image, relative timestamp, and title. In a grid it's a
 * vertical card (image on top); on phone it flips to an image-left list row.
 * Presentational; `onClick` opens the story.
 */
export interface NewsCardProps {
  /** Story image URL. */
  image?: string;
  /** Relative timestamp (e.g. "2 minutes ago"). */
  timeAgo?: React.ReactNode;
  /** Story title (Montserrat). */
  title: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function NewsCard(props: NewsCardProps): JSX.Element;
