import * as React from "react";

/**
 * Hero route card for a Flight page — origin/destination codes, status, progress
 * line with plane, elapsed/remaining. (The drawer's compact strip is FlightTracker.)
 */
export interface FlightProgressProps {
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  /** Status kicker, e.g. "En Route", "Boarding", "Landed". */
  status?: string;
  /** 0–1 progress of the flight. */
  progress?: number;
  /** Left footer label. */
  elapsed?: string;
  /** Right footer label. */
  remaining?: string;
  /** Fill with surface-2 instead of a transparent hairline panel. */
  filled?: boolean;
  style?: React.CSSProperties;
}

export function FlightProgress(props: FlightProgressProps): JSX.Element;
