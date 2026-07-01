import * as React from "react";

/**
 * Horizontal list row for gallery LIST mode: a thumbnail (aspect configurable)
 * + title/subtitle/meta, with optional trailing content (e.g. a FavoriteButton).
 * Sibling to MediaCard (which stacks its caption below a cover).
 */
export interface MediaRowProps {
  /** Thumbnail image URL. */
  image?: string;
  /** Thumbnail aspect ratio (CSS `aspect-ratio`). Default "1 / 1"; e.g. "2 / 3" for books. */
  aspect?: string;
  title: React.ReactNode;
  /** Secondary line (artist, author…). */
  subtitle?: React.ReactNode;
  /** Tertiary line (e.g. a relative timestamp). */
  meta?: React.ReactNode;
  /** Trailing node at the inline-end (e.g. a FavoriteButton). */
  trailing?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function MediaRow(props: MediaRowProps): JSX.Element;
