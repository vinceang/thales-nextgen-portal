import React from "react";

/**
 * IconButton — square, borderless icon affordance used in the nav bar
 * (search, Wi-Fi, profile) and small controls. Themed line icon
 * (follows --text-primary), no fill.
 */
export function IconButton({
  label,
  active = false,
  size = 22,
  onClick,
  children,
  style,
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        padding: 6,
        cursor: "pointer",
        color: active ? "var(--color-highlight-blue)" : "var(--text-primary)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        width: size + 12,
        height: size + 12,
        transition: "color 0.3s var(--ease-smooth), opacity 0.3s var(--ease-smooth)",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      {...rest}
    >
      <span style={{ width: size, height: size, display: "inline-block" }}>{children}</span>
    </button>
  );
}
