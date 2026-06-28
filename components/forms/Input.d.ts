import * as React from "react";

export interface InputProps {
  /** Field label rendered above the input. */
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Style for the outer wrapper. */
  className?: string;
  style?: React.CSSProperties;
  /** Style for the <input> itself. */
  inputStyle?: React.CSSProperties;
}

/** Labelled text field — flush dark fill, square corners, blue focus border. */
export function Input(props: InputProps): JSX.Element;
