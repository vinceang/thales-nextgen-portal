import * as React from "react";

export interface IconButtonProps {
  /** Accessible label (aria-label). */
  label: string;
  /** Active state colors the glyph bright-blue (e.g. live Wi-Fi). */
  active?: boolean;
  /** Glyph pixel size. Default 22. */
  size?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** The icon SVG (e.g. a Lucide glyph). */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Borderless square icon button for the nav bar and small controls. */
export function IconButton(props: IconButtonProps): JSX.Element;
