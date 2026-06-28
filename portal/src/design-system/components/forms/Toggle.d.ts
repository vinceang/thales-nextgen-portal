import * as React from "react";

/**
 * On/off switch. Rounded track + knob (an allowed rounded shape). Highlight-blue
 * when on. The knob travels along the inline axis, so it mirrors under RTL.
 */
export interface ToggleProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** Label after the switch (or pass children). */
  label?: string;
  /** Track height in px (width is 1.8×). Default 26. */
  size?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Toggle(props: ToggleProps): JSX.Element;
