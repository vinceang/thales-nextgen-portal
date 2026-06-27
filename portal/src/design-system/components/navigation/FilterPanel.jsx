import React from "react";

/**
 * FilterPanel — container for a set of filter groups (genres, price, rating).
 * Header with a title and a "Clear all" link; hairline-separated FilterSections
 * hold the actual controls (GenrePill rows, Checkboxes, Chips, a price range).
 * Sits inline in a sidebar or inside a Drawer on phone. Flat, dark.
 */
export function FilterPanel({ title = "Filters", activeCount = 0, onClear, children, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16 }}>
        <span style={{ fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--text-primary)" }}>{title}</span>
        {activeCount > 0 && (
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-bright-blue)" }}>{activeCount}</span>
        )}
        {onClear && (
          <button type="button" onClick={onClear}
            style={{ marginInlineStart: "auto", background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.04em",
              textTransform: "uppercase", color: "var(--on-surface-muted)", transition: "color var(--dur-link) var(--ease-smooth)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-bright-blue)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-surface-muted)")}>
            Clear all
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * FilterSection — one labelled group within a FilterPanel. Hairline top rule;
 * UPPERCASE label; arbitrary control children below.
 */
export function FilterSection({ label, children, style, ...rest }) {
  return (
    <div style={{ borderTop: "1px solid var(--color-border)", paddingBlock: 18, ...style }} {...rest}>
      {label && (
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 14 }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}
