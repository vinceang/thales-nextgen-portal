import * as React from "react";

export interface KickerProps {
  /** Render with an underline (the "kicker 2" link treatment). */
  underline?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Bright-blue uppercase action label that sits above a media-tile or hero title. */
export function Kicker(props: KickerProps): JSX.Element;
