import React from "react";
import s from "./TextArea.module.css";

/**
 * TextArea — multi-line field. Same dark fill / sharp corners / :focus border as
 * Input; vertically resizable; optional helper / character-count line.
 */
export function TextArea({ label, id, placeholder, value, onChange, rows = 4, maxLength, helper, className, style, inputStyle, ...rest }) {
  const count = typeof value === "string" ? value.length : 0;
  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style}>
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        className={s.field}
        style={inputStyle}
        {...rest}
      />
      {(helper || maxLength) && (
        <div className={s.helper}>
          <span>{helper}</span>
          {maxLength && <span className={s.count}>{count}/{maxLength}</span>}
        </div>
      )}
    </div>
  );
}
