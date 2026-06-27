import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  id?: string;
  /** Placeholder option shown in grey when nothing is chosen. */
  placeholder?: string;
  /** Options as strings or { value, label }. */
  options?: (string | SelectOption)[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

/** Labelled dropdown matching the Input fill, with a chevron and grey placeholder. */
export function Select(props: SelectProps): JSX.Element;
