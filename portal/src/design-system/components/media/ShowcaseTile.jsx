import React from "react";
import { Kicker } from "../core/Kicker.jsx";

/**
 * ShowcaseTile — the signature bento cell: full-bleed image, dark bottom scrim,
 * bright-blue kicker, and a title. Square corners, no shadow.
 *
 * Title font is chosen via `font`:
 *   "tile"    — Noto Serif Display 600 (default; cinematic tile/card titles)
 *   "sans"    — Montserrat 700 (functional / utility tiles)
 *   "display" — Playfair Display 700 (RESERVED for hero-level tiles only)
 */
const TILE_FONTS = {
  tile:    { fontFamily: "var(--font-tile)",    fontWeight: 600, letterSpacing: "-0.03em" },
  sans:    { fontFamily: "var(--font-sans)",    fontWeight: 700, letterSpacing: "0" },
  display: { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.03em" },
};

export function ShowcaseTile({
  image,
  kicker,
  title,
  font,
  serif = true,
  titleSize = 28,
  height = 220,
  align = "left",
  onClick,
  style,
  ...rest
}) {
  // `font` wins; otherwise fall back to the legacy `serif` boolean.
  const fontKey = font || (serif === false ? "sans" : "tile");
  const titleFont = TILE_FONTS[fontKey] || TILE_FONTS.tile;
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        cursor: onClick ? "pointer" : "default",
        background: "var(--color-surface-2)",
        ...style,
      }}
      {...rest}
    >
      {image && (
        <img
          src={image}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s var(--ease-smooth), filter 0.3s var(--ease-smooth)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)" }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 18,
          textAlign: align,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: align === "center" ? "center" : "flex-start",
        }}
      >
        {kicker && <Kicker style={{ fontSize: 12 }}>{kicker}</Kicker>}
        <div
          style={{
            ...titleFont,
            fontSize: titleSize,
            lineHeight: 1.05,
            color: "var(--color-white)",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
