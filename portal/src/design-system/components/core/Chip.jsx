import React from "react";
import { Icon } from "./Icon.jsx";
import s from "./Chip.module.css";

/**
 * Chip — compact SHARP token (radius-control) for an applied filter / selected
 * value / tag. Selected = blue fill; optional trailing × dismiss (mirrors under
 * RTL via logical props). For the rounded category filter use GenrePill instead.
 */
export function Chip({ selected = false, onRemove, onClick, leading, children, className, style, ...rest }) {
  return (
    <span
      onClick={onClick}
      data-selected={selected || undefined}
      data-clickable={onClick ? "true" : undefined}
      className={className ? `${s.chip} ${className}` : s.chip}
      style={style}
      {...rest}
    >
      {leading && <span className={s.leading}>{leading}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          className={s.remove}
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
        >
          <Icon name="x" size={14} strokeWidth={2.2} />
        </button>
      )}
    </span>
  );
}
