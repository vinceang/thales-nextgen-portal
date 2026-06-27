import * as React from "react";

export interface GenrePillProps {
  /** Active pill = solid highlight-blue fill. */
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Rounded category/topic filter chip (the only pill shape in the system). */
export function GenrePill(props: GenrePillProps): JSX.Element;
