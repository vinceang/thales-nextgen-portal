import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Modal — centered blocking dialog over a dim black backdrop (no frosted blur).
 * Dark surface, hairline border, sharp corners, flat. Header (serif title +
 * close), scrollable body, footer with actions at the inline-end. Esc and
 * backdrop click close. Render conditionally on `open`.
 */
export function Modal({ open, onClose, title, footer, width = 520, children, style, ...rest }) {
  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: "100%", maxWidth: width, maxHeight: "calc(100vh - 48px)",
          display: "flex", flexDirection: "column",
          background: "var(--color-surface-2)", border: "1px solid var(--color-border-strong)",
          borderRadius: "var(--radius-card)", overflow: "hidden", ...style,
        }}
        {...rest}
      >
        {(title || onClose) && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "22px 24px 0" }}>
            {title && <h2 style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h2)", letterSpacing: "var(--tracking-headline)", color: "var(--text-primary)" }}>{title}</h2>}
            {onClose && (
              <button type="button" aria-label="Close" onClick={onClose}
                style={{ flex: "none", background: "none", border: "none", padding: 4, cursor: "pointer", color: "var(--on-surface-muted)", marginInlineEnd: -4 }}>
                <Icon name="x" size={22} strokeWidth={1.9} />
              </button>
            )}
          </div>
        )}
        <div style={{ padding: 24, overflowY: "auto", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--on-surface-2)" }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", padding: "0 24px 24px" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
