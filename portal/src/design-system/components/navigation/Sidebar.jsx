import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";
import { FlightTracker } from "../domain/FlightTracker.jsx";
import s from "./Sidebar.module.css";

/**
 * Sidebar — the portal's configurable navigation surface, with two white-label
 * treatments: variant="overlay" (full-height slide-out drawer) and variant="rail"
 * (a persistent icon rail that expands in-flow). The mini FlightTracker is an
 * optional item in either. Built from logical properties so RTL works for free.
 */
function normalize(items) {
  return items.map((it) =>
    typeof it === "string"
      ? { key: it, label: it }
      : { key: it.key ?? it.value ?? it.label, label: it.label, icon: it.icon, badge: it.badge }
  );
}

export function Sidebar({
  variant = "overlay", items = [], active, onSelect, flight,
  open = false, onOpen, onClose, onToggle, title, showToggle = true,
  className, style, ...rest
}) {
  const list = normalize(items);

  // ── B · icon rail that expands in-flow (pushes content) ──────────────────
  if (variant === "rail") {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const controlled = onToggle != null || onOpen != null || onClose != null;
    const isOpen = controlled ? open : internalOpen;
    const toggle = controlled
      ? () => (onToggle ? onToggle() : isOpen ? onClose && onClose() : onOpen && onOpen())
      : () => setInternalOpen((o) => !o);

    return (
      <nav className={className ? `${s.rail} ${className}` : s.rail} data-open={isOpen || undefined} style={style} {...rest}>
        <div className={s.railTrack}>
          {showToggle && (
            <div className={s.railToggle}>
              <IconButton label={isOpen ? "Collapse menu" : "Expand menu"} onClick={toggle}><Icon name="menu" /></IconButton>
            </div>
          )}

          {flight && (
            <div className={s.railFlight}>
              <div className={s.railPlane}>
                <span className={s.railPlaneIcon}><Icon name="plane" size={20} strokeWidth={1.75} /></span>
              </div>
              <div className={s.railTrackerWrap}><FlightTracker {...flight} tone="theme" /></div>
            </div>
          )}

          {title && <div className={s.railTitle}>{title}</div>}

          {list.map((it) => {
            const isActive = active === it.key;
            return (
              <button
                key={it.key}
                className={s.railItem}
                data-active={isActive ? "true" : undefined}
                title={typeof it.label === "string" ? it.label : undefined}
                onClick={() => onSelect && onSelect(it.key)}
              >
                {isActive && <span className={s.railRule} />}
                <span className={s.railIcon}><Icon name={it.icon || "menu"} size={20} /></span>
                <span className={s.railLabel}>{it.label}</span>
                {it.badge != null && <span className={s.railBadge}>{it.badge}</span>}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // ── A · full-height overlay drawer (white-label default) ─────────────────
  return (
    <div aria-hidden={!open} data-open={open || undefined} className={className ? `${s.overlay} ${className}` : s.overlay} style={style} {...rest}>
      <div className={s.overlayBackdrop} onClick={onClose} />
      <nav className={s.overlayPanel}>
        <div className={s.overlayHead}>
          <IconButton label="Close" onClick={onClose}><Icon name="x" /></IconButton>
          {flight && <div className={s.overlayTracker}><FlightTracker {...flight} tone="theme" /></div>}
        </div>
        <div className={s.overlayNav}>
          {list.map((it) => {
            const isActive = active === it.key;
            return (
              <a key={it.key} className={s.overlayItem} data-active={isActive ? "true" : undefined} onClick={() => onSelect && onSelect(it.key)}>
                {it.icon && <Icon name={it.icon} size={22} />}
                <span>{it.label}</span>
                {it.badge != null && <span className={s.overlayBadge}>{it.badge}</span>}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
