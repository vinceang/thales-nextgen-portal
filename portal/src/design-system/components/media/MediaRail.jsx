import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";
import s from "./MediaRail.module.css";

/**
 * MediaRail — a labelled, horizontally-scrolling row of media tiles (the
 * streaming "shelf"). Children are the tiles; the rail owns the scroll
 * container, scroll-snap, hidden scrollbar, and the desktop prev/next arrows.
 * Generic over the tile (ShowcaseTile, NewsItem, …) — each child carries its
 * own width. RTL-safe: scrolls along the inline axis, arrows use logical insets.
 */
export function MediaRail({ title, action, gap = 16, children, className, style, ...rest }) {
  const ref = React.useRef(null);

  function page(dir) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className={className ? `${s.rail} ${className}` : s.rail} style={style} {...rest}>
      {(title || action) && (
        <div className={s.head}>
          {title && <h3 className={s.title}>{title}</h3>}
          {action && <div className={s.action}>{action}</div>}
        </div>
      )}
      <div className={s.viewport}>
        <IconButton label="Scroll back" className={`${s.arrow} ${s.arrowStart}`} onClick={() => page(-1)}>
          <Icon name="chevron-left" />
        </IconButton>
        <div className={s.scroller} ref={ref} style={{ "--rail-gap": `${gap}px` }}>
          {children}
        </div>
        <IconButton label="Scroll forward" className={`${s.arrow} ${s.arrowEnd}`} onClick={() => page(1)}>
          <Icon name="chevron-right" />
        </IconButton>
      </div>
    </section>
  );
}
