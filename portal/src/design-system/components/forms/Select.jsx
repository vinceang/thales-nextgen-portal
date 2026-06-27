import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Select — labelled dropdown. Same flush dark fill as Input with a chevron on
 * the right. Placeholder option renders in grey.
 */
export function Select({
  label,
  id,
  placeholder = "Select...",
  options = [],
  value = "",
  onChange,
  style,
  ...rest
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {label && (
        <label htmlFor={id} style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 400, color: "var(--on-surface)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: value ? "var(--color-white)" : "var(--color-grey)",
            background: "var(--color-surface-3)",
            border: "1px solid transparent",
            borderRadius: "var(--radius-control)",
            padding: "14px 44px 14px 16px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
            cursor: "pointer",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-highlight-blue)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
          {...rest}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val} style={{ color: "#000" }}>{lbl}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--on-surface-muted)" }}>
          <Icon name="chevron-down" size={18} />
        </span>
      </div>
    </div>
  );
}
