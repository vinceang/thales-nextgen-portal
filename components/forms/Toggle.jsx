import React from "react";
import s from "./Toggle.module.css";

/**
 * Toggle — on/off switch (rounded track + knob). Highlight-blue when on; the
 * knob travels the inline axis (RTL-safe). Track/knob sizes flow through CSS vars.
 */
export function Toggle({ checked = false, onChange, disabled = false, label, size = 26, children, className, style, ...rest }) {
  const w = size * 1.8;
  const knob = size - 6;
  return (
    <label
      data-disabled={disabled || undefined}
      className={className ? `${s.label} ${className}` : s.label}
      style={{ "--tg-w": `${w}px`, "--tg-size": `${size}px`, "--tg-knob": `${knob}px`, ...style }}
      {...rest}
    >
      <span className={s.track} data-checked={checked || undefined} onClick={() => !disabled && onChange && onChange(!checked)}>
        <span className={s.knob} />
      </span>
      {(label || children) && <span className={s.text}>{label || children}</span>}
    </label>
  );
}
