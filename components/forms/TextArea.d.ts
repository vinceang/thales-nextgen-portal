import * as React from "react";

/**
 * Multi-line text field. Same dark fill / sharp corners / blue focus as Input.
 */
export interface TextAreaProps {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Initial visible rows. Default 4. The field is vertically resizable. */
  rows?: number;
  /** Caps input and shows an N/max counter. */
  maxLength?: number;
  /** Helper text under the field. */
  helper?: string;
  className?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export function TextArea(props: TextAreaProps): JSX.Element;
