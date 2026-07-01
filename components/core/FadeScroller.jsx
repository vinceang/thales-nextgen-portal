import React from "react";
import { IconButton } from "./IconButton.jsx";
import { Icon } from "./Icon.jsx";
import s from "./FadeScroller.module.css";

function len(v) { return typeof v === "number" ? `${v}px` : v; }

/**
 * FadeScroller — a horizontally-scrolling row with a soft edge-fade at both ends
 * (a CSS mask, so the outermost items appear to fade out) and a hidden
 * scrollbar. The reusable "fade" treatment for NON-tile scrollers (source rails,
 * filter-pill rows); tile shelves use MediaRail. RTL-safe (scrolls the inline
 * axis). Children lay out in a flex track; each child sizes itself.
 *
 * - `fade`     — fade width at each end (px number or CSS length). Default 32.
 * - `gap`      — gap between children (px number or CSS length). Default --space-sm.
 * - `center`   — center the track when it fits (like a centered pill row). Default true.
 * - `controls` — show desktop prev/next arrows (only when the row overflows;
 *                touch devices keep native scroll). Default false.
 */
export function FadeScroller({ fade = 32, gap, center = true, controls = false, className, style, children, ...rest }) {
  const ref = React.useRef(null);
  const [scrollable, setScrollable] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !controls) return;
    const check = () => setScrollable(el.scrollWidth - el.clientWidth > 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [controls, children]);

  function page(dir) {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const vars = { "--fade-size": len(fade) };
  if (gap != null) vars["--fade-gap"] = len(gap);
  const showArrows = controls && scrollable;

  return (
    <div className={className ? `${s.viewport} ${className}` : s.viewport} style={style} {...rest}>
      {showArrows && (
        <IconButton label="Scroll back" className={`${s.arrow} ${s.arrowStart}`} onClick={() => page(-1)}>
          <Icon name="chevron-left" />
        </IconButton>
      )}
      <div className={s.scroller} ref={ref} style={vars}>
        <div className={s.track} data-center={center || undefined}>{children}</div>
      </div>
      {showArrows && (
        <IconButton label="Scroll forward" className={`${s.arrow} ${s.arrowEnd}`} onClick={() => page(1)}>
          <Icon name="chevron-right" />
        </IconButton>
      )}
    </div>
  );
}
