import React from "react";
import s from "./GenrePill.module.css";

/**
 * GenrePill — horizontally-scrollable category filter chip. The ONE rounded
 * shape in the system. Active pill = solid highlight-blue; inactive = hairline
 * outline. Styling in GenrePill.module.css (active via data-attribute).
 */
export function GenrePill({ active = false, onClick, children, className, style, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      className={className ? `${s.pill} ${className}` : s.pill}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
