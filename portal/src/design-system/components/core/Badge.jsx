import React from "react";
import s from "./Badge.module.css";

/**
 * Badge — small sharp status / count label, or a standalone `dot`. Monochrome +
 * blue only (status meaning comes from an icon/label, never a second hue).
 */
export function Badge({ tone = "neutral", dot = false, children, className, style, ...rest }) {
  if (dot) {
    return (
      <span data-tone={tone} className={className ? `${s.dot} ${className}` : s.dot} style={style} {...rest} />
    );
  }
  return (
    <span data-tone={tone} className={className ? `${s.badge} ${className}` : s.badge} style={style} {...rest}>
      {children}
    </span>
  );
}
