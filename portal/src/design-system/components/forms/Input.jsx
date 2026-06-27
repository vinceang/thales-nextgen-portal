import React from "react";

/**
 * Input — labelled text field. Label sits above; the field is a flush dark
 * rectangle (slightly lighter than the page), square corners, grey placeholder.
 * Focus draws a 1px highlight-blue border.
 */
export function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  style,
  inputStyle,
  ...rest
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {label && (
        <label htmlFor={id} style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 400, color: "var(--on-surface)" }}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "var(--text-primary)",
          background: "var(--color-surface-3)",
          border: "1px solid transparent",
          borderRadius: "var(--radius-control)",
          padding: "14px 16px",
          width: "100%",
          boxSizing: "border-box",
          outline: "none",
          transition: "border-color 0.2s var(--ease-smooth)",
          ...inputStyle,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-highlight-blue)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
        {...rest}
      />
    </div>
  );
}
