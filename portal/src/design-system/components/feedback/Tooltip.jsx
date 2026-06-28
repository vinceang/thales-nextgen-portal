import React from "react";
import s from "./Tooltip.module.css";

/**
 * Tooltip — small label revealed on hover / focus of its single child (pure CSS,
 * was JS state). Black bubble, sharp, flat. `placement` top|bottom|start|end is
 * RTL-aware. Wrap exactly one focusable/hoverable element.
 */
export function Tooltip({ label, placement = "top", children, className, style, ...rest }) {
  return (
    <span className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      {children}
      <span role="tooltip" className={s.bubble} data-placement={placement}>{label}</span>
    </span>
  );
}
