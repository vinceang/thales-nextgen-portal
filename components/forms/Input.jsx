import React from "react";
import s from "./Input.module.css";

/**
 * Input — labelled text field. Flush dark fill, square corners, real :focus
 * highlight-blue border (was a JS focus handler).
 */
export function Input({ label, id, type = "text", placeholder, value, onChange, className, style, inputStyle, ...rest }) {
  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style}>
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={s.input}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
}
