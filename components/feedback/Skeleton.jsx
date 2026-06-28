import React from "react";
import s from "./Skeleton.module.css";

/** Coerce a number|string dimension to a CSS length. */
function len(v, fallback) {
  const x = v ?? fallback;
  return typeof x === "number" ? `${x}px` : x;
}

/**
 * Skeleton — pulsing placeholder that reserves layout while content loads.
 * `text` (one or more lines) | `block` (tile/poster) | `circle` (avatar).
 */
export function Skeleton({ variant = "block", width, height, lines = 1, gap = 10, className, style, ...rest }) {
  if (variant === "text") {
    return (
      <div className={className ? `${s.text} ${className}` : s.text} style={{ "--sk-gap": `${gap}px`, ...style }} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={s.line}
            data-last={lines > 1 && i === lines - 1 ? "true" : undefined}
            style={{ "--sk-w": len(width, "100%"), "--sk-h": len(height, 12) }}
          />
        ))}
      </div>
    );
  }
  return (
    <span
      className={className ? `${s.block} ${className}` : s.block}
      data-variant={variant}
      style={{ "--sk-w": len(width, "100%"), "--sk-h": len(height, variant === "circle" ? 48 : 120), ...style }}
      {...rest}
    />
  );
}
