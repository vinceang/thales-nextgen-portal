import * as React from "react";

/** Single circular radio choice with inline label. */
export interface RadioProps {
  checked?: boolean;
  /** (value, event) => void */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  size?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function Radio(props: RadioProps): JSX.Element;

/** Vertical group of radios sharing one selection. */
export interface RadioGroupProps {
  name?: string;
  /** string[] or {value,label}[] */
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Gap between options in px. Default 16. */
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
}
export function RadioGroup(props: RadioGroupProps): JSX.Element;
