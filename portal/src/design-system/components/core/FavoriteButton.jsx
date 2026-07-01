import React from "react";
import { Icon } from "./Icon.jsx";
import s from "./FavoriteButton.module.css";

/**
 * FavoriteButton — a heart "save" toggle for media tiles. Presentational only:
 * the consumer owns the state and passes `active` + `onChange(next)`. Active =
 * the heart fills bright-blue (the one accent — never red). Stops click
 * propagation so it can sit over a clickable tile without triggering it.
 */
export function FavoriteButton({ active = false, onChange, label = "Favorite", size = 16, className, style, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      title={label}
      data-active={active || undefined}
      onClick={(e) => {
        e.stopPropagation();
        onChange && onChange(!active);
      }}
      className={className ? `${s.btn} ${className}` : s.btn}
      style={{ "--fav-size": `${size}px`, ...style }}
      {...rest}
    >
      <Icon name="heart" size={size} />
    </button>
  );
}
