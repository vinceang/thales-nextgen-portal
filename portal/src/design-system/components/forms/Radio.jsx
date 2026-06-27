import React from "react";

/**
 * Radio — single circular choice control with inline label. Selected = a
 * highlight-blue ring with a filled blue dot; unselected = hairline ring on the
 * dark fill. Round (a radio is conventionally circular). Compose several with a
 * shared `name` for a group; `RadioGroup` does that for a list of options.
 */
export function Radio({ checked = false, onChange, name, value, children, size = 22, style, ...rest }) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", ...style }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange && onChange(value ?? e.target.value, e)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span
        style={{
          flex: "none",
          width: size,
          height: size,
          borderRadius: "var(--radius-pill)",
          background: "var(--color-surface-3)",
          border: checked ? "1px solid var(--color-highlight-blue)" : "1px solid var(--color-border-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s var(--ease-smooth)",
        }}
      >
        {checked && (
          <span style={{ width: size * 0.42, height: size * 0.42, borderRadius: "var(--radius-pill)", background: "var(--color-highlight-blue)" }} />
        )}
      </span>
      {children && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.45, color: "var(--on-surface)" }}>{children}</span>
      )}
    </label>
  );
}

/**
 * RadioGroup — vertical list of Radios sharing one selection. Pass `options`
 * (strings or {value,label}) plus `value` / `onChange`.
 */
export function RadioGroup({ name, options = [], value, onChange, gap = 16, style, ...rest }) {
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap, ...style }} {...rest}>
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
