import * as React from "react";

/**
 * Search field — leading magnifier, clear (×) once there's a query, blue focus.
 */
export interface SearchProps {
  value?: string;
  /** (value, event) => void */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement> | null) => void;
  /** Optional explicit clear handler; defaults to onChange(""). */
  onClear?: () => void;
  /** Submit handler (Enter). Receives the current value. */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** `md` (default) | `lg` for the nav-bar search overlay. */
  size?: "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

export function Search(props: SearchProps): JSX.Element;
