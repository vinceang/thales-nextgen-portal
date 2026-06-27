import * as React from "react";

/**
 * Primary/secondary action button with an uppercase Montserrat label and sharp corners.
 */
export interface ButtonProps {
  /** Visual style. Primary = highlight-blue fill for the single most important action. */
  variant?: "primary" | "secondary";
  /** Control size. */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
