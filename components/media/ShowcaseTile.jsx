import React from "react";
import { Kicker } from "../core/Kicker.jsx";
import s from "./ShowcaseTile.module.css";

const DISPLAY_TITLE_MIN = 30; // px
const DISPLAY_HEIGHT_MIN = 300; // px

function defaultTitleFontKey(titleSize, height) {
  return titleSize >= DISPLAY_TITLE_MIN || height >= DISPLAY_HEIGHT_MIN ? "display" : "sans";
}
function len(v, d) { const x = v ?? d; return typeof x === "number" ? `${x}px` : x; }

/**
 * ShowcaseTile — signature bento cell: full-bleed image, scrim, kicker + title.
 * Title font is prominence-driven by default (large → Playfair, else Montserrat);
 * override with `titleFont` / `kickerFont` or `titleStyle` / `kickerStyle`. Real
 * :hover brightness; all roles weight 600. (ADR 0002.)
 */
export function ShowcaseTile({
  image, kicker, title, font, titleFont, kickerFont, titleStyle, kickerStyle, serif,
  titleSize = 28, height = 220, align = "left", onClick, className, style, ...rest
}) {
  const explicitTitle = titleFont || font || (serif === true ? "tile" : serif === false ? "sans" : null);
  const titleKey = explicitTitle || defaultTitleFontKey(titleSize, height);
  const kickerFamily = kickerFont ? `var(--font-${kickerFont})` : undefined;

  return (
    <div
      onClick={onClick}
      data-clickable={onClick ? "true" : undefined}
      className={className ? `${s.tile} ${className}` : s.tile}
      style={{ "--tile-h": len(height, 220), ...style }}
      {...rest}
    >
      {image && <img src={image} alt="" className={s.img} />}
      <div className={s.scrim} />
      <div className={s.content} data-align={align === "center" ? "center" : undefined}>
        {kicker && (
          <Kicker style={{ fontSize: 12, ...(kickerFamily ? { fontFamily: kickerFamily } : {}), ...kickerStyle }}>
            {kicker}
          </Kicker>
        )}
        <div className={s.title} data-font={titleKey} style={{ "--tile-title-size": `${titleSize}px`, ...titleStyle }}>
          {title}
        </div>
      </div>
    </div>
  );
}
