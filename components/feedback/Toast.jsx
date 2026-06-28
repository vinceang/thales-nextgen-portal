import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Toast.module.css";

const ICONS = { info: "info", success: "check-circle", warning: "alert-triangle", error: "alert-circle" };

/** Toast — transient floating notification. Icon-driven status (one hue), flat on black. */
export function Toast({ tone = "info", title, action, onAction, onClose, children, className, style, ...rest }) {
  const blue = tone === "info" || tone === "success";
  return (
    <div
      role="status"
      data-blue={blue || undefined}
      className={className ? `${s.toast} ${className}` : s.toast}
      style={style}
      {...rest}
    >
      <span className={s.icon}><Icon name={ICONS[tone]} size={20} /></span>
      <div className={s.body}>
        {title && <div className={s.title}>{title}</div>}
        {children && <div className={s.message}>{children}</div>}
        {action && <button type="button" className={s.action} onClick={onAction}>{action}</button>}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" className={s.close} onClick={onClose}>
          <Icon name="x" size={16} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}

/** ToastViewport — fixed corner stack that holds Toasts. */
export function ToastViewport({ placement = "bottom-end", children, className, style, ...rest }) {
  const [v, h] = placement.split("-");
  return (
    <div data-v={v} data-h={h} className={className ? `${s.viewport} ${className}` : s.viewport} style={style} {...rest}>
      {children}
    </div>
  );
}
