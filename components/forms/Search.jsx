import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Search.module.css";

/**
 * Search — text field with a leading magnifier and a clear (×) once there's a
 * query. Flush dark fill, real :focus-within border. RTL-safe (logical insets).
 */
export function Search({ value = "", onChange, onClear, onSubmit, placeholder = "Search", autoFocus = false, size = "md", className, style, ...rest }) {
  return (
    <form
      role="search"
      data-size={size}
      className={className ? `${s.form} ${className}` : s.form}
      style={style}
      onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}
    >
      <span className={s.icon}><Icon name="search" size={size === "lg" ? 22 : 18} /></span>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={s.input}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        {...rest}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          className={s.clear}
          onClick={() => { onClear ? onClear() : onChange && onChange("", null); }}
        >
          <Icon name="x" size={16} strokeWidth={2.2} />
        </button>
      )}
    </form>
  );
}
