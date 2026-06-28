import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./Pagination.module.css";

function range(current, total, sib = 1) {
  const pages = new Set([1, total]);
  for (let i = current - sib; i <= current + sib; i++) if (i >= 1 && i <= total) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) { if (p - prev > 1) out.push("…"); out.push(p); prev = p; }
  return out;
}

/**
 * Pagination — sharp square cells, highlight-blue current page, mirroring
 * prev/next chevrons. Long ranges collapse with ellipses.
 */
export function Pagination({ page = 1, total = 1, onChange, className, style, ...rest }) {
  const cells = range(page, total);
  const go = (p) => p >= 1 && p <= total && p !== page && onChange && onChange(p);

  return (
    <nav aria-label="Pagination" className={className ? `${s.nav} ${className}` : s.nav} style={style} {...rest}>
      <button type="button" aria-label="Previous" className={s.cell} disabled={page <= 1} onClick={() => go(page - 1)}>
        <Icon name="chevron-left" size={18} />
      </button>
      {cells.map((c, i) =>
        c === "…" ? (
          <span key={`e${i}`} className={s.ellipsis}>…</span>
        ) : (
          <button key={c} type="button" aria-current={c === page ? "page" : undefined} className={s.cell} data-current={c === page ? "true" : undefined} onClick={() => go(c)}>
            {c}
          </button>
        )
      )}
      <button type="button" aria-label="Next" className={s.cell} disabled={page >= total} onClick={() => go(page + 1)}>
        <Icon name="chevron-right" size={18} />
      </button>
    </nav>
  );
}
