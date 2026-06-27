import React from "react";

/**
 * Spinner — indeterminate loading ring. A faint hairline track with a
 * highlight-blue arc rotating via the `ds-spin` keyframe. Circular (a loader,
 * not a surface), single accent, no glow. Honours reduced-motion.
 */
export function Spinner({ size = 28, thickness = 3, label, style, ...rest }) {
  return (
    <span
      role="status"
      aria-label={label || "Loading"}
      style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}
      {...rest}
    >
      <span
        style={{
          display: "inline-block",
          width: size,
          height: size,
          borderRadius: "var(--radius-pill)",
          border: `${thickness}px solid var(--color-border)`,
          borderTopColor: "var(--color-highlight-blue)",
          animation: "ds-spin 0.8s linear infinite",
        }}
      />
      {label && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-secondary)" }}>
          {label}
        </span>
      )}
    </span>
  );
}
