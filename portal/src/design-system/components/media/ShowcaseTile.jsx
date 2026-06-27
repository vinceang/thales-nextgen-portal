import React from "react";
import { Kicker } from "../core/Kicker.jsx";

/**
 * ShowcaseTile — the signature bento cell: full-bleed image, dark bottom scrim,
 * bright-blue kicker, and a title. Square corners, no shadow.
 *
 * Title font is PROMINENCE-DRIVEN by default: a large featured / hero tile (one
 * clearly bigger than the others in its group) uses the Playfair display face;
 * an ordinary gallery tile uses Montserrat. Noto Serif is no longer the default —
 * it is opt-in via font="tile".
 *
 * Override per tile:
 *   - `titleFont` / `kickerFont`  — pick a font role ("display" | "sans" | "tile")
 *   - `titleStyle` / `kickerStyle` — override any style on the title / kicker
 *
 * Font roles (all weight 600): "display" Playfair · "sans" Montserrat · "tile" Noto Serif.
 */
const FONT_PRESETS = {
  display: { fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.03em" },
  sans:    { fontFamily: "var(--font-sans)",    fontWeight: 600, letterSpacing: "0" },
  tile:    { fontFamily: "var(--font-tile)",    fontWeight: 600, letterSpacing: "-0.03em" },
};

// A tile reads as featured / hero — and earns the Playfair display face — when its
// title (or the tile itself) is clearly larger than a standard gallery cell.
const DISPLAY_TITLE_MIN = 30; // px
const DISPLAY_HEIGHT_MIN = 300; // px

function defaultTitleFontKey(titleSize, height) {
  return titleSize >= DISPLAY_TITLE_MIN || height >= DISPLAY_HEIGHT_MIN ? "display" : "sans";
}

export function ShowcaseTile({
  image,
  kicker,
  title,
  font,
  titleFont,
  kickerFont,
  titleStyle,
  kickerStyle,
  serif,
  titleSize = 28,
  height = 220,
  align = "left",
  onClick,
  style,
  ...rest
}) {
  // Title font: an explicit override wins (titleFont, then legacy `font`, then the
  // legacy `serif` boolean); otherwise fall back to the prominence-driven default.
  const explicitTitle =
    titleFont || font || (serif === true ? "tile" : serif === false ? "sans" : null);
  const titleKey = explicitTitle || defaultTitleFontKey(titleSize, height);
  const titlePreset = FONT_PRESETS[titleKey] || FONT_PRESETS.sans;

  // Kicker stays Montserrat unless a font role override is supplied.
  const kickerPreset = kickerFont ? FONT_PRESETS[kickerFont] : null;

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
        {kicker && (
          <Kicker
            style={{
              fontSize: 12,
              ...(kickerPreset ? { fontFamily: kickerPreset.fontFamily } : {}),
              ...kickerStyle,
            }}
          >
            {kicker}
          </Kicker>
        )}
        <div
          style={{
            ...titlePreset,
            fontSize: titleSize,
            lineHeight: 1.05,
            color: "var(--color-white)",
            ...titleStyle,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
