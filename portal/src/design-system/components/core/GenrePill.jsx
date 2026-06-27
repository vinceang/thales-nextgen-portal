import React from "react";

/**
 * GenrePill — horizontally-scrollable category filter chip. The ONE rounded
 * shape in the system. Active pill = solid highlight-blue; inactive = hairline
 * outline. Used for movie genres, news topics, etc.
 */
export function GenrePill({ active = false, onClick, children, style, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "8px 18px",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: "all 0.3s var(--ease-smooth)",
        background: active ? "var(--color-highlight-blue)" : "transparent",
        color: active ? "var(--color-white)" : "var(--on-surface-2)",
        border: active ? "1px solid var(--color-highlight-blue)" : "1px solid var(--color-border-strong)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
