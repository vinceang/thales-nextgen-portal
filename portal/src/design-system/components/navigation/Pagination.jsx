import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Pagination — page selector. Sharp square cells; the current page is a
 * highlight-blue fill, others hairline-outlined. Prev/next chevrons mirror
 * under RTL. Collapses long ranges with ellipses around the current page.
 */
function range(current, total, sib = 1) {
  const pages = new Set([1, total]);
  for (let i = current - sib; i <= current + sib; i++) if (i >= 1 && i <= total) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) { if (p - prev > 1) out.push("…"); out.push(p); prev = p; }
  return out;
}

export function Pagination({ page = 1, total = 1, onChange, style, ...rest }) {
  const cells = range(page, total);
  const go = (p) => p >= 1 && p <= total && p !== page && onChange && onChange(p);
  const cellBase = {
    minWidth: 38, height: 38, display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--font-sans)", fontSize: 14, fontVariantNumeric: "tabular-nums",
    borderRadius: "var(--radius-control)", cursor: "pointer",
    transition: "all var(--dur-link) var(--ease-smooth)",
  };

  const arrow = (name, to, disabled) => (
    <button type="button" aria-label={name === "chevron-left" ? "Previous" : "Next"} disabled={disabled} onClick={() => go(to)}
      style={{ ...cellBase, background: "transparent", border: "1px solid var(--color-border)", color: "var(--text-primary)", opacity: disabled ? 0.35 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
      <Icon name={name} size={18} />
    </button>
  );

  return (
    <nav aria-label="Pagination" style={{ display: "flex", alignItems: "center", gap: 8, ...style }} {...rest}>
      {arrow("chevron-left", page - 1, page <= 1)}
      {cells.map((c, i) =>
        c === "…" ? (
          <span key={`e${i}`} style={{ ...cellBase, cursor: "default", color: "var(--text-secondary)" }}>…</span>
        ) : (
          <button key={c} type="button" aria-current={c === page ? "page" : undefined} onClick={() => go(c)}
            style={{
              ...cellBase,
              background: c === page ? "var(--color-highlight-blue)" : "transparent",
              border: c === page ? "1px solid var(--color-highlight-blue)" : "1px solid var(--color-border)",
              color: c === page ? "var(--color-white)" : "var(--text-primary)", fontWeight: c === page ? 700 : 400,
            }}>
            {c}
          </button>
        )
      )}
      {arrow("chevron-right", page + 1, page >= total)}
    </nav>
  );
}
