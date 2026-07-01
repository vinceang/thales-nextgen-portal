import React from "react";
import s from "./FadeScroller.module.css";

function len(v) { return typeof v === "number" ? `${v}px` : v; }

/**
 * FadeScroller — a horizontally-scrolling row with a soft edge-fade at both ends
 * (a CSS mask, so the outermost items appear to fade out) and a hidden
 * scrollbar. The reusable "fade" treatment for NON-tile scrollers (source rails,
 * filter-pill rows); tile shelves use MediaRail. RTL-safe (scrolls the inline
 * axis). Children lay out in a flex track; each child sizes itself.
 *
 * - `fade`   — fade width at each end (px number or CSS length). Default 32.
 * - `gap`    — gap between children (px number or CSS length). Default --space-sm.
 * - `center` — center the track when it fits (like a centered pill row). Default true.
 */
export function FadeScroller({ fade = 32, gap, center = true, className, style, children, ...rest }) {
  const vars = { "--fade-size": len(fade) };
  if (gap != null) vars["--fade-gap"] = len(gap);
  return (
    <div className={className ? `${s.scroller} ${className}` : s.scroller} style={{ ...vars, ...style }} {...rest}>
      <div className={s.track} data-center={center || undefined}>{children}</div>
    </div>
  );
}
