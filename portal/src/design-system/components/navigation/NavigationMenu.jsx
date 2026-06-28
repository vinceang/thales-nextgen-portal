import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./NavigationMenu.module.css";

/**
 * NavigationMenu — data-driven vertical destination list, optionally grouped.
 * Active item is bright-blue with an inline-start rule (real :hover). Built to grow.
 */
export function NavigationMenu({ items = [], value, onSelect, className, style, ...rest }) {
  const groups = items.length && items[0] && items[0].items ? items : [{ items }];

  return (
    <nav className={className ? `${s.menu} ${className}` : s.menu} style={style} {...rest}>
      {groups.map((g, gi) => (
        <div key={gi} className={s.group}>
          {g.label && <div className={s.groupLabel}>{g.label}</div>}
          {g.items.map((it) => {
            const val = it.value ?? it.label;
            const active = value === val;
            return (
              <button
                key={val}
                type="button"
                aria-current={active ? "page" : undefined}
                className={s.item}
                data-active={active ? "true" : undefined}
                onClick={() => onSelect && onSelect(val, it)}
              >
                {active && <span className={s.rule} />}
                {it.icon && <span className={s.icon}><Icon name={it.icon} size={20} /></span>}
                <span className={s.label}>{it.label}</span>
                {it.badge != null && <span className={s.badge}>{it.badge}</span>}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
