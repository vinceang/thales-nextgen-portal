import React from "react";

/**
 * TextArea — multi-line text field. Same flush dark fill as Input, square
 * corners, grey placeholder, 1px highlight-blue focus border. Vertically
 * resizable; optional helper / character-count line below.
 */
export function TextArea({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  maxLength,
  helper,
  style,
  inputStyle,
  ...rest
}) {
  const count = typeof value === "string" ? value.length : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {label && (
        <label htmlFor={id} style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 400, color: "var(--on-surface)" }}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--text-primary)",
          background: "var(--color-surface-3)",
          border: "1px solid transparent",
          borderRadius: "var(--radius-control)",
          padding: "14px 16px",
          width: "100%",
          boxSizing: "border-box",
          outline: "none",
          resize: "vertical",
          transition: "border-color 0.2s var(--ease-smooth)",
          ...inputStyle,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-highlight-blue)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
        {...rest}
      />
      {(helper || maxLength) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-secondary)" }}>
          <span>{helper}</span>
          {maxLength && <span style={{ marginInlineStart: "auto", fontVariantNumeric: "tabular-nums" }}>{count}/{maxLength}</span>}
        </div>
      )}
    </div>
  );
}
