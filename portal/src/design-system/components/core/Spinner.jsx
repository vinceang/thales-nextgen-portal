import React from "react";
import s from "./Spinner.module.css";

/**
 * Spinner — indeterminate loading ring (hairline track, highlight-blue arc).
 * Size / thickness flow through CSS custom properties; honours reduced-motion.
 */
export function Spinner({ size = 28, thickness = 3, label, className, style, ...rest }) {
  return (
    <span
      role="status"
      aria-label={label || "Loading"}
      className={className ? `${s.spinner} ${className}` : s.spinner}
      style={style}
      {...rest}
    >
      <span className={s.ring} style={{ "--spin-size": `${size}px`, "--spin-thick": `${thickness}px` }} />
      {label && <span className={s.label}>{label}</span>}
    </span>
  );
}
