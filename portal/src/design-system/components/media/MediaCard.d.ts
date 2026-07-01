import * as React from "react";

/**
 * Cover image with a title/subtitle caption below it (album+artist, podcast+host,
 * book+author). Sibling to ShowcaseTile (which overlays its caption).
 */
export interface MediaCardProps {
  /** Cover image URL. */
  image?: string;
  title: React.ReactNode;
  /** Secondary line under the title (artist, author…). */
  subtitle?: React.ReactNode;
  /** Cover aspect ratio (CSS `aspect-ratio` value). Default "1 / 1". */
  aspect?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function MediaCard(props: MediaCardProps): JSX.Element;
