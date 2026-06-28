import React from "react";
import { Icon } from "./Icon.jsx";
import s from "./Avatar.module.css";

/**
 * Avatar — passenger / source identity mark. SHARP by default (radius-card);
 * pass shape="circle" for round. Falls back image → initials → user glyph.
 * Size flows through the --avatar-size / --avatar-font custom properties.
 */
const SIZES = { sm: 28, md: 40, lg: 56 };

export function Avatar({ src, name, size = "md", shape = "square", className, style, ...rest }) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  const initials = name
    ? name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : null;

  return (
    <span
      data-shape={shape}
      className={className ? `${s.avatar} ${className}` : s.avatar}
      style={{ "--avatar-size": `${px}px`, "--avatar-font": `${Math.round(px * 0.38)}px`, ...style }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name || ""} className={s.img} />
      ) : initials ? (
        initials
      ) : (
        <Icon name="user" size={Math.round(px * 0.55)} strokeWidth={1.6} />
      )}
    </span>
  );
}
