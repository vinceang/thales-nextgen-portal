import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Checkbox — square check control with inline label/children. Unchecked = dark
 * fill with hairline outline; checked = highlight-blue fill with a white check.
 */
export function Checkbox({ checked = false, onChange, children, size = 24, style, ...rest }) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", ...style }} {...rest}>
      <span
        onClick={() => onChange && onChange(!checked)}
        style={{
          flex: "none",
          width: size,
          height: size,
          background: checked ? "var(--color-highlight-blue)" : "var(--color-surface-3)",
          border: checked ? "1px solid var(--color-highlight-blue)" : "1px solid var(--color-border-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          transition: "all 0.2s var(--ease-smooth)",
        }}
      >
        {checked && <Icon name="check" size={size - 8} strokeWidth={2.4} />}
      </span>
      {children && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.45, color: "var(--on-surface)" }}>
          {children}
        </span>
      )}
    </label>
  );
}
