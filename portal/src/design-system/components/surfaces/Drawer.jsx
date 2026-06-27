import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Drawer — edge sheet that slides in over a dim black backdrop. Generic content
 * panel (filters, cart, details). For the portal's primary slide-out NAV use
 * SideDrawer. `side` start|end|bottom is RTL-aware (start/end follow the inline
 * axis; the slide direction mirrors). Flat, dark, no shadow.
 */
export function Drawer({ open, onClose, side = "end", title, footer, size = 380, children, style, ...rest }) {
  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const bottom = side === "bottom";
  const panelPos = bottom
    ? { insetInline: 0, bottom: 0, width: "100%", maxHeight: typeof size === "number" ? size : size, borderTop: "1px solid var(--color-border-strong)" }
    : side === "start"
    ? { insetInlineStart: 0, top: 0, bottom: 0, width: size, borderInlineEnd: "1px solid var(--color-border-strong)" }
    : { insetInlineEnd: 0, top: 0, bottom: 0, width: size, borderInlineStart: "1px solid var(--color-border-strong)" };

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 290, background: "rgba(0,0,0,0.7)" }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute", ...panelPos, maxWidth: "100%",
          display: "flex", flexDirection: "column",
          background: "var(--color-black)",
          ...style,
        }}
        {...rest}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderBottom: "1px solid var(--color-border)" }}>
          {title && <div style={{ flex: 1, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--fs-h3)", color: "var(--color-white)" }}>{title}</div>}
          {onClose && (
            <button type="button" aria-label="Close" onClick={onClose}
              style={{ flex: "none", marginInlineStart: "auto", background: "none", border: "none", padding: 4, cursor: "pointer", color: "rgba(255,255,255,0.7)" }}>
              <Icon name="x" size={22} strokeWidth={1.9} />
            </button>
          )}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", padding: 24, borderTop: "1px solid var(--color-border)" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
