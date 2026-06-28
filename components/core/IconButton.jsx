import React from "react";
import s from "./IconButton.module.css";

/**
 * IconButton — square, borderless icon affordance (nav bar + small controls).
 * Real :hover (was JS). Glyph box sized via the --ib-size custom property.
 */
export function IconButton({ label, active = false, size = 22, onClick, children, className, style, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      data-active={active || undefined}
      className={className ? `${s.btn} ${className}` : s.btn}
      style={{ "--ib-size": `${size}px`, ...style }}
      {...rest}
    >
      <span className={s.icon}>{children}</span>
    </button>
  );
}
