import React from "react";

/**
 * Button — primary action control.
 * Sharp corners, uppercase Montserrat label. Primary = highlight-blue fill;
 * secondary = transparent with hairline outline.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  children,
  style,
  ...rest
}) {
  const pad = {
    sm: "6px 16px",
    md: "10px 22px",
    lg: "14px 28px",
  }[size];
  const fontSize = { sm: 13, md: 14, lg: 16 }[size];

  const base = {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    border: "1px solid transparent",
    borderRadius: "var(--radius-control)",
    padding: pad,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    width: fullWidth ? "100%" : "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "background 0.3s var(--ease-smooth), color 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth)",
    lineHeight: 1.2,
  };

  const variants = {
    primary: {
      background: "var(--color-highlight-blue)",
      color: "var(--color-white)",
    },
    secondary: {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: "var(--color-border-strong)",
    },
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.background = "rgb(13, 130, 232)";
        else e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = variants[variant].background;
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
