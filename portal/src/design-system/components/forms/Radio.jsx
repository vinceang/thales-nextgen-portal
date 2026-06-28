import React from "react";
import s from "./Radio.module.css";

/**
 * Radio — single circular choice with inline label (visually-hidden native input
 * for a11y). Selected = highlight-blue ring + filled dot. Size flows through vars.
 */
export function Radio({ checked = false, onChange, name, value, children, size = 22, className, style, ...rest }) {
  return (
    <label
      className={className ? `${s.label} ${className}` : s.label}
      style={{ "--rd-size": `${size}px`, "--rd-dot": `${size * 0.42}px`, ...style }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        className={s.input}
        onChange={(e) => onChange && onChange(value ?? e.target.value, e)}
        {...rest}
      />
      <span className={s.ring} data-checked={checked || undefined}>
        {checked && <span className={s.dot} />}
      </span>
      {children && <span className={s.text}>{children}</span>}
    </label>
  );
}

/** RadioGroup — vertical list of Radios sharing one selection. */
export function RadioGroup({ name, options = [], value, onChange, gap = 16, className, style, ...rest }) {
  return (
    <div
      role="radiogroup"
      className={className ? `${s.group} ${className}` : s.group}
      style={{ "--rg-gap": `${gap}px`, ...style }}
      {...rest}
    >
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        return (
          <Radio key={val} name={name} value={val} checked={value === val} onChange={onChange}>
            {lbl}
          </Radio>
        );
      })}
    </div>
  );
}
