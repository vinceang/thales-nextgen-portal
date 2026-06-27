import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * NavigationMenu — data-driven vertical list of destinations, with optional
 * section groups (the readme calls for nav that grows without a redesign).
 * Active item = bright-blue with a 2px highlight-blue rule on the inline-start
 * edge. Optional leading line icon + trailing count badge. RTL-safe.
 */
export function NavigationMenu({ items = [], value, onSelect, style, ...rest }) {
  // Normalise into groups: [{ label?, items: [...] }]
  const groups = items.length && items[0] && items[0].items
    ? items
    : [{ items }];

  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 20, ...style }} {...rest}>
      {groups.map((g, gi) => (
        <div key={gi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {g.label && (
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", padding: "4px 16px 8px" }}>
              {g.label}
            </div>
          )}
          {g.items.map((it) => {
            const val = it.value ?? it.label;
            const active = value === val;
            return (
              <button
                key={val}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onSelect && onSelect(val, it)}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "start",
                  background: active ? "var(--color-surface-3)" : "transparent",
                  border: "none", cursor: "pointer",
                  padding: "12px 16px",
                  fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-bright-blue)" : "var(--on-surface-2)",
                  transition: "color var(--dur-link) var(--ease-smooth), background var(--dur-link) var(--ease-smooth)",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--hover-veil)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {active && <span style={{ position: "absolute", insetInlineStart: 0, top: 8, bottom: 8, width: 2, background: "var(--color-highlight-blue)" }} />}
                {it.icon && <span style={{ flex: "none", display: "inline-flex", color: active ? "var(--color-bright-blue)" : "var(--on-surface-muted)" }}><Icon name={it.icon} size={20} /></span>}
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.badge != null && (
                  <span style={{ flex: "none", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: "var(--color-bright-blue)" }}>{it.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
