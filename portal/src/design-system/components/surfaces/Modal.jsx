import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Modal.module.css";

/**
 * Modal — centered blocking dialog over a dim backdrop (no frosted blur). Sharp,
 * flat. Esc / backdrop click close. Render conditionally on `open`. Width via var.
 */
export function Modal({ open, onClose, title, footer, width = 520, children, className, style, ...rest }) {
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
        className={className ? `${s.dialog} ${className}` : s.dialog}
        style={{ "--modal-w": `${width}px`, ...style }}
        {...rest}
      >
        {(title || onClose) && (
          <div className={s.header}>
            {title && <h2 className={s.title}>{title}</h2>}
            {onClose && (
              <button type="button" aria-label="Close" className={s.close} onClick={onClose}>
                <Icon name="x" size={22} strokeWidth={1.9} />
              </button>
            )}
          </div>
        )}
        <div className={s.body}>{children}</div>
        {footer && <div className={s.footer}>{footer}</div>}
      </div>
    </div>
  );
}
