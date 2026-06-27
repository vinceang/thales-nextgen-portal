import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Breadcrumbs — hierarchical trail. Muted ancestor links, a chevron separator
 * that MIRRORS under RTL, and a plain white current page (no link). Single-line,
 * Montserrat. Flows along the inline axis.
 */
export function Breadcrumbs({ items = [], style, ...rest }) {
  return (
    <nav aria-label="Breadcrumb" style={{ ...style }} {...rest}>
      <ol style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", listStyle: "none", margin: 0, padding: 0, fontFamily: "var(--font-sans)", fontSize: 14 }}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              {last || !it.href ? (
                <span aria-current={last ? "page" : undefined} style={{ color: last ? "var(--color-white)" : "var(--text-secondary)", fontWeight: last ? 600 : 400 }}>
                  {it.label}
                </span>
              ) : (
                <a href={it.href} style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color var(--dur-link) var(--ease-smooth)" }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-bright-blue)")}
                   onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
                  {it.label}
                </a>
              )}
              {!last && (
                <span aria-hidden="true" data-chevron style={{ display: "inline-flex", color: "rgba(255,255,255,0.35)" }}>
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
