import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Drawer.module.css";

function len(v, d) { const x = v ?? d; return typeof x === "number" ? `${x}px` : x; }

/**
 * Drawer — edge sheet that slides in over a dim backdrop. `side` start|end|bottom
 * is RTL-aware. For the primary slide-out NAV use SideDrawer. Size via --drawer-size.
 */
export function Drawer({ open, onClose, side = "end", title, footer, size = 380, children, className, style, ...rest }) {
  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={s.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div
        role="dialog"
        aria-modal="true"
        data-side={side}
        className={className ? `${s.panel} ${className}` : s.panel}
        style={{ "--drawer-size": len(size, 380), ...style }}
        {...rest}
      >
        <div className={s.header}>
          {title && <div className={s.title}>{title}</div>}
          {onClose && (
            <button type="button" aria-label="Close" className={s.close} onClick={onClose}>
              <Icon name="x" size={22} strokeWidth={1.9} />
            </button>
          )}
        </div>
        <div className={s.body}>{children}</div>
        {footer && <div className={s.footer}>{footer}</div>}
      </div>
    </div>
  );
}
