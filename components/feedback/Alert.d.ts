import * as React from "react";

/**
 * Inline status banner. Status is shown by the icon, not colour (the system has
 * one hue). Flat — dark surface, hairline border, no left accent bar, no shadow.
 */
export interface AlertProps {
  /** Chooses the leading icon: info | success | warning | error. */
  tone?: "info" | "success" | "warning" | "error";
  title?: string;
  /** When provided, renders a dismiss ×. */
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Alert(props: AlertProps): JSX.Element;
