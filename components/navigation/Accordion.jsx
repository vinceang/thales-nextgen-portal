import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Accordion.module.css";

/**
 * Accordion — stacked expandable sections separated by hairlines, with a chevron
 * that rotates on open. `multiple` allows several panels open at once.
 */
export function Accordion({ items = [], multiple = false, defaultOpen = [], className, style, ...rest }) {
  const [open, setOpen] = React.useState(() => new Set(defaultOpen));
  const toggle = (i) => setOpen((prev) => {
    const next = new Set(multiple ? prev : []);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div className={className ? `${s.root} ${className}` : s.root} style={style} {...rest}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className={s.section}>
            <button type="button" aria-expanded={isOpen} className={s.header} data-open={isOpen ? "true" : undefined} onClick={() => toggle(i)}>
              <span className={s.title}>{it.title}</span>
              <span className={s.chev}><Icon name="chevron-down" size={20} /></span>
            </button>
            {isOpen && <div className={s.content}>{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
