import * as React from "react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Inline label content (may contain links). */
  children?: React.ReactNode;
  /** Box size in px. Default 24. */
  size?: number;
  style?: React.CSSProperties;
}

/** Square checkbox with inline label — blue fill + white check when checked. */
export function Checkbox(props: CheckboxProps): JSX.Element;
