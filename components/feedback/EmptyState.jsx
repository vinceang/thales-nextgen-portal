import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * EmptyState — centered placeholder for a view with no content yet (no search
 * results, empty watchlist, offline). A quiet line icon in a hairline ring, a
 * serif title (cinematic, like a tile), a muted line of guidance, and an
 * optional single action. Flat, dark, one accent.
 */
export function EmptyState({ icon = "inbox", title, message, action, style, ...rest }) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        gap: 16, padding: "56px 24px", maxWidth: 420, marginInline: "auto", ...style,
      }}
      {...rest}
    >
      <span
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 64, height: 64, borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border)", color: "var(--on-surface-faint)",
        }}
      >
        <Icon name={icon} size={28} strokeWidth={1.5} />
      </span>
      {title && (
        <div style={{ fontFamily: "var(--font-tile)", fontWeight: 600, fontSize: "var(--fs-h3)", color: "var(--text-primary)" }}>
          {title}
        </div>
      )}
      {message && (
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          {message}
        </div>
      )}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
