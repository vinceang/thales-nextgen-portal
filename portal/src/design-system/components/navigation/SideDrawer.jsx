import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";
import { FlightTracker } from "../domain/FlightTracker.jsx";
import s from "./SideDrawer.module.css";

// Where the nav items line up — the FlightTracker's origin code starts at
// (header inline padding 20) + (close button 22+12) + (gap 16) = 70px.
const NAV_INSET = 70;
const NAV_INSET_BARE = 28; // fallback when there is no flight tracker

/**
 * SideDrawer — full-height black slide-out menu. Flight tracker at the top, large
 * single-word nav items below (active = bright-blue), dimmed backdrop. When a
 * flight tracker is shown, the nav items left-align with its origin code. An
 * optional `footer` slot pins controls (e.g. a language selector) to the bottom.
 */
export function SideDrawer({ open = false, items = [], active, flight, footer, onSelect, onClose, className, style, ...rest }) {
  return (
    <div
      aria-hidden={!open}
      data-open={open || undefined}
      className={className ? `${s.root} ${className}` : s.root}
      style={style}
      {...rest}
    >
      <div className={s.backdrop} onClick={onClose} />
      <nav className={s.panel} style={{ "--nav-inset": `${flight ? NAV_INSET : NAV_INSET_BARE}px` }}>
        <div className={s.head}>
          <IconButton label="Close" onClick={onClose}><Icon name="x" /></IconButton>
          {flight && <div className={s.tracker}><FlightTracker {...flight} /></div>}
        </div>
        <div className={s.nav}>
          {items.map((it) => {
            const key = typeof it === "string" ? it : it.key;
            const label = typeof it === "string" ? it : it.label;
            return (
              <a key={key} className={s.item} data-active={active === key ? "true" : undefined} onClick={() => onSelect && onSelect(key)}>
                {label}
              </a>
            );
          })}
        </div>
        {footer && <div className={s.footer}>{footer}</div>}
      </nav>
    </div>
  );
}
