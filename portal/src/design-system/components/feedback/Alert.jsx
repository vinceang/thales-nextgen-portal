import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Alert — inline status banner. The system has ONE hue, so status is carried by
 * the ICON (info / check-circle / alert-triangle), not by a red/green fill.
 * Flat: dark surface, hairline border, leading line icon — NO left accent bar,
 * no shadow. Optional title, dismiss × (mirrors via logical inset).
 */
const ICONS = { info: "info", success: "check-circle", warning: "alert-triangle", error: "alert-circle" };

export function Alert({ tone = "info", title, onClose, children, style, ...rest }) {
  const blue = tone === "info" || tone === "success";
  return (
    <div
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        background: "var(--color-surface-2)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)", padding: "16px 18px",
        fontFamily: "var(--font-sans)", ...style,
      }}
      {...rest}
    >
      <span style={{ flex: "none", color: blue ? "var(--color-bright-blue)" : "var(--color-white)", marginTop: 1 }}>
        <Icon name={ICONS[tone]} size={20} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: children ? 4 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.78)" }}>{children}</div>}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose}
          style={{ flex: "none", background: "none", border: "none", padding: 2, cursor: "pointer", color: "var(--on-surface-muted)", marginInlineEnd: -4 }}>
          <Icon name="x" size={16} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}
