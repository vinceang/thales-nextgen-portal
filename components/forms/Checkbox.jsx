import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Checkbox.module.css";

/**
 * Checkbox — square check control with inline label. Checked = highlight-blue
 * fill + white check. Box size flows through the --cb-size custom property.
 */
export function Checkbox({ checked = false, onChange, children, size = 24, className, style, ...rest }) {
  return (
    <label
      className={className ? `${s.label} ${className}` : s.label}
      style={{ "--cb-size": `${size}px`, ...style }}
      {...rest}
    >
      <span className={s.box} data-checked={checked || undefined} onClick={() => onChange && onChange(!checked)}>
        {checked && <Icon name="check" size={size - 8} strokeWidth={2.4} />}
      </span>
      {children && <span className={s.text}>{children}</span>}
    </label>
  );
}
