import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Search — text field with a leading magnifier and a clear (×) affordance that
 * appears once there's a query. Flush dark fill, sharp corners, blue focus
 * border. Used in the nav-bar search overlay and any list/poster filter.
 * RTL-safe: icons use logical inset; the field flips wholesale.
 */
export function Search({
  value = "",
  onChange,
  onClear,
  onSubmit,
  placeholder = "Search",
  autoFocus = false,
  size = "md",
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const pad = size === "lg" ? "16px" : "12px";
  const fz = size === "lg" ? 17 : 15;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "var(--color-surface-3)",
        border: `1px solid ${focus ? "var(--color-highlight-blue)" : "transparent"}`,
        borderRadius: "var(--radius-control)",
        paddingInline: 16,
        paddingBlock: 0,
        transition: "border-color 0.2s var(--ease-smooth)",
        ...style,
      }}
      role="search"
    >
      <span style={{ display: "inline-flex", color: "var(--on-surface-muted)", flex: "none" }}>
        <Icon name="search" size={size === "lg" ? 22 : 18} />
      </span>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: "var(--font-sans)",
          fontSize: fz,
          color: "var(--text-primary)",
          background: "transparent",
          border: "none",
          outline: "none",
          paddingBlock: pad,
          appearance: "none",
          WebkitAppearance: "none",
        }}
        {...rest}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => { onClear ? onClear() : onChange && onChange("", null); }}
          style={{ display: "inline-flex", background: "none", border: "none", padding: 4, cursor: "pointer", color: "var(--on-surface-muted)", flex: "none" }}
        >
          <Icon name="x" size={16} strokeWidth={2.2} />
        </button>
      )}
    </form>
  );
}
