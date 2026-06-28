import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Breadcrumbs.module.css";

/**
 * Breadcrumbs — hierarchical trail. Muted ancestor links (real :hover), a chevron
 * separator that mirrors under RTL, and a plain white current page (no link).
 */
export function Breadcrumbs({ items = [], className, style, ...rest }) {
  return (
    <nav aria-label="Breadcrumb" className={className} style={style} {...rest}>
      <ol className={s.list}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className={s.item}>
              {last || !it.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? s.current : s.crumb}>{it.label}</span>
              ) : (
                <a href={it.href} className={s.link}>{it.label}</a>
              )}
              {!last && (
                <span aria-hidden="true" data-chevron className={s.sep}>
                  <Icon name="chevron-right" size={15} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
