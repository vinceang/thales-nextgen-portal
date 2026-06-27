import React from "react";
import { Icon } from "../core/Icon.jsx";

const ICONS = { info: "info", success: "check-circle", warning: "alert-triangle", error: "alert-circle" };

/**
 * Toast — transient floating notification. Same monochrome+blue, icon-driven
 * status as Alert, but elevated by surface contrast (black overlay tone) on a
 * hairline border — no shadow. Optional single action link + dismiss.
 */
export function Toast({ tone = "info", title, action, onAction, onClose, children, style, ...rest }) {
  const blue = tone === "info" || tone === "success";
  return (
    <div
      role="status"
      style={{
        display: "flex", alignItems: "flex-start", gap: 14, width: "min(380px, 90vw)",
        background: "var(--color-black)", border: "1px solid var(--color-border-strong)",
        borderRadius: "var(--radius-card)", padding: "14px 16px",
        fontFamily: "var(--font-sans)", ...style,
      }}
      {...rest}
    >
      <span style={{ flex: "none", color: blue ? "var(--color-bright-blue)" : "var(--color-white)", marginTop: 1 }}>
        <Icon name={ICONS[tone]} size={20} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-white)", marginBottom: children ? 3 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>{children}</div>}
        {action && (
          <button type="button" onClick={onAction}
            style={{ marginTop: 8, background: "none", border: "none", padding: 0, cursor: "pointer",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.04em",
              textTransform: "uppercase", color: "var(--color-bright-blue)" }}>
            {action}
          </button>
        )}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose}
          style={{ flex: "none", background: "none", border: "none", padding: 2, cursor: "pointer", color: "rgba(255,255,255,0.6)", marginInlineEnd: -2 }}>
          <Icon name="x" size={16} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}

/**
 * ToastViewport — fixed stack anchored to a screen corner. Stacks toasts with a
 * gap; defaults to the bottom inline-end corner (mirrors under RTL).
 */
export function ToastViewport({ placement = "bottom-end", children, style, ...rest }) {
  const [v, h] = placement.split("-");
  return (
    <div
      style={{
        position: "fixed", zIndex: 200, display: "flex", flexDirection: "column", gap: 12,
        [v === "top" ? "top" : "bottom"]: 24,
        insetInlineEnd: h === "end" ? 24 : "auto",
        insetInlineStart: h === "start" ? 24 : h === "center" ? "50%" : "auto",
        transform: h === "center" ? "translateX(-50%)" : "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
