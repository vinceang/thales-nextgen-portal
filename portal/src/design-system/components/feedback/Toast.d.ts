import * as React from "react";

/** Transient floating notification. Icon-driven status (one hue), flat on black. */
export interface ToastProps {
  tone?: "info" | "success" | "warning" | "error";
  title?: string;
  /** Optional single action label (uppercase link). */
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): JSX.Element;

/** Fixed corner stack that holds Toasts. */
export interface ToastViewportProps {
  /** Corner: "top-start" | "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end". */
  placement?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ToastViewport(props: ToastViewportProps): JSX.Element;
