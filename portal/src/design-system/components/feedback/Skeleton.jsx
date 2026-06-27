import React from "react";

/**
 * Skeleton — content placeholder that pulses (ds-pulse) while real content
 * loads. `variant` text|block|circle. Square by default (radius-card) to match
 * the surface it stands in; circle for avatars. Use to reserve poster / tile /
 * list layout so there's no shift when data arrives.
 */
export function Skeleton({ variant = "block", width, height, lines = 1, gap = 10, style, ...rest }) {
  const base = {
    background: "var(--color-surface-3)",
    animation: "ds-pulse 1.4s var(--ease-smooth) infinite",
  };

  if (variant === "text") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap, ...style }} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            style={{
              ...base,
              height: height || 12,
              width: i === lines - 1 && lines > 1 ? "60%" : (width || "100%"),
              borderRadius: "var(--radius-control)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      style={{
        display: "block",
        ...base,
        width: width || "100%",
        height: height || (variant === "circle" ? 48 : 120),
        borderRadius: variant === "circle" ? "var(--radius-pill)" : "var(--radius-card)",
        ...style,
      }}
      {...rest}
    />
  );
}
