import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * Avatar — passenger / source identity mark. SHARP by default (radius-card) to
 * stay on-brand; pass shape="circle" where a round avatar is wanted. Renders,
 * in priority order: an image, then initials, then a line "user" glyph.
 */
const SIZES = { sm: 28, md: 40, lg: 56 };

export function Avatar({
  src,
  name,
  size = "md",
  shape = "square",
  style,
  ...rest
}) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  const initials = name
    ? name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        width: px,
        height: px,
        overflow: "hidden",
        background: "var(--color-surface-3)",
        border: "1px solid var(--color-border)",
        borderRadius: shape === "circle" ? "var(--radius-pill)" : "var(--radius-card)",
        color: "var(--on-surface)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: Math.round(px * 0.38),
        letterSpacing: "0.02em",
        userSelect: "none",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : initials ? (
        initials
      ) : (
        <Icon name="user" size={Math.round(px * 0.55)} strokeWidth={1.6} />
      )}
    </span>
  );
}
