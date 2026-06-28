import React from "react";
import s from "./Popover.module.css";

/**
 * Popover — click-triggered floating panel for richer content than a Tooltip.
 * Flat dark surface; closes on outside click / Esc. RTL-aware align. Width via
 * the --po-w custom property.
 */
export function Popover({ trigger, placement = "bottom", align = "start", width = 260, defaultOpen = false, children, className, style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onEsc); };
  }, [open]);

  return (
    <span ref={ref} className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      <span className={s.trigger} onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div role="dialog" className={s.panel} data-placement={placement} data-align={align} style={{ "--po-w": `${width}px` }}>
          {typeof children === "function" ? children({ close: () => setOpen(false) }) : children}
        </div>
      )}
    </span>
  );
}
