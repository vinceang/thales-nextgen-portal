import * as React from "react";

export interface CarouselDotsProps {
  /** Number of slides. */
  count: number;
  /** Active slide index. */
  active?: number;
  onSelect?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/** Dot position indicators for the hero / movie carousel (active dot elongates). */
export function CarouselDots(props: CarouselDotsProps): JSX.Element;
