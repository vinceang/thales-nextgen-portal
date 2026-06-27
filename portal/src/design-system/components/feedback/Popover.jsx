import React from "react";

/**
 * Popover — click-triggered floating panel anchored to a trigger. Holds richer
 * content than a Tooltip (links, lists, a small form). Dark surface, hairline
 * border, flat (no shadow). Closes on outside click / Esc. RTL-aware align.
 */
export function Popover({ trigger, placement = "bottom", align = "start", width = 260, defaultOpen = false, children, style, ...rest }) {
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

  const vert = placement === "top"
    ? { bottom: "calc(100% + 8px)" }
    : { top: "calc(100% + 8px)" };
  const horiz = align === "end"
    ? { insetInlineEnd: 0 }
    : align === "center"
    ? { insetInlineStart: "50%", transform: "translateX(-50%)" }
    : { insetInlineStart: 0 };

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex", ...style }} {...rest}>
      <span onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", cursor: "pointer" }}>
        {trigger}
      </span>
      {open && (
        <div
          role="dialog"
          style={{
            position: "absolute", zIndex: 120, ...vert, ...horiz, width,
            background: "var(--color-surface-2)", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)", padding: 16,
            fontFamily: "var(--font-sans)", color: "var(--text-primary)",
          }}
        >
          {typeof children === "function" ? children({ close: () => setOpen(false) }) : children}
        </div>
      )}
    </span>
  );
}
