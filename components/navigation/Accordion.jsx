import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Accordion — stacked expandable sections separated by hairlines. One item open
 * by default; pass `multiple` to allow several. Header = Montserrat title + a
 * chevron that rotates on open. Flat, dark, one accent.
 */
export function Accordion({ items = [], multiple = false, defaultOpen = [], style, ...rest }) {
  const [open, setOpen] = React.useState(() => new Set(defaultOpen));
  const toggle = (i) => setOpen((prev) => {
    const next = new Set(multiple ? prev : []);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div style={{ borderTop: "1px solid var(--color-border)", ...style }} {...rest}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              style={{
                display: "flex", alignItems: "center", gap: 16, width: "100%",
                background: "none", border: "none", cursor: "pointer", textAlign: "start",
                padding: "20px 4px",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--fs-h3)",
                color: isOpen ? "var(--color-white)" : "var(--on-surface-2)",
                transition: "color var(--dur-link) var(--ease-smooth)",
              }}
            >
              <span style={{ flex: 1 }}>{it.title}</span>
              <span style={{ flex: "none", color: isOpen ? "var(--color-bright-blue)" : "var(--on-surface-muted)", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform var(--dur-link) var(--ease-smooth)" }}>
                <Icon name="chevron-down" size={20} />
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 4px 22px", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}>
                {it.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
