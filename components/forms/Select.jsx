import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Select.module.css";

/**
 * Select — labelled dropdown matching the Input fill, with a chevron and grey
 * placeholder (data-empty). Real :focus border.
 */
export function Select({ label, id, placeholder = "Select...", options = [], value = "", onChange, className, style, ...rest }) {
  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style}>
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      <div className={s.control}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          data-empty={value ? undefined : "true"}
          className={s.select}
          {...rest}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val} className={s.opt}>{lbl}</option>;
          })}
        </select>
        <span className={s.chev}><Icon name="chevron-down" size={18} /></span>
      </div>
    </div>
  );
}
