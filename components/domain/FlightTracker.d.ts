import * as React from "react";

export interface FlightTrackerProps {
  /** Origin airport code. */
  origin?: string;
  /** Destination airport code. */
  destination?: string;
  /** Remaining/elapsed label, e.g. "3h 28m". */
  duration?: string;
  /** 0–1 progress of the flight. */
  progress?: number;
  /**
   * Surface it sits on:
   *  "dark"  — the always-black overlay drawer (white-alpha, fixed). Default.
   *  "theme" — a themed surface (page rail) — follows light/dark tokens.
   */
  tone?: "dark" | "theme";
  style?: React.CSSProperties;
}

/** Origin → plane → destination progress strip for the side drawer header. */
export function FlightTracker(props: FlightTrackerProps): JSX.Element;
