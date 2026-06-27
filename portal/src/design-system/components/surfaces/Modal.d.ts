import * as React from "react";

/**
 * Centered blocking dialog over a dim black backdrop. Sharp, flat. Esc / backdrop
 * click close. Render conditionally with `open`.
 */
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  /** Serif headline in the header. */
  title?: string;
  /** Footer actions (align to the inline-end). */
  footer?: React.ReactNode;
  /** Max width in px. Default 520. */
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Modal(props: ModalProps): JSX.Element;
