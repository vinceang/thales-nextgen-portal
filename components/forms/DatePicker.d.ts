import * as React from "react";

/**
 * Labelled date field that opens a sharp calendar panel — month nav, 7-column
 * day grid, highlight-blue selected day, hairline today ring. Flat (no shadow).
 */
export interface DatePickerProps {
  label?: string;
  id?: string;
  /** Selected date (Date | null). */
  value?: Date | null;
  /** Called with the chosen Date. */
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DatePicker(props: DatePickerProps): JSX.Element;
