import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Checkbox } from "../forms/Checkbox.jsx";

/**
 * DataGrid — interactive table: click-to-sort column heads (a chevron marks the
 * direction), optional row selection via Checkbox, sticky header, hover rows.
 * Same flat sharp treatment as Table; one accent for the active sort / selection.
 * Sorting is internal unless you control `sort` + `onSortChange`.
 */
export function DataGrid({ columns = [], rows = [], rowKey = "id", selectable = false, selected, onSelectedChange, style, ...rest }) {
  const [sort, setSort] = React.useState(null); // { key, dir }
  const sel = selected instanceof Set ? selected : new Set(selected || []);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const val = (r) => (col && col.sortValue ? col.sortValue(r) : r[sort.key]);
    return [...rows].sort((a, b) => {
      const x = val(a), y = val(b);
      if (x == null) return 1; if (y == null) return -1;
      const r = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "desc" ? -r : r;
    });
  }, [rows, sort, columns]);

  const toggleSort = (key) => setSort((s) => s && s.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" });

  const setRow = (id, on) => {
    const next = new Set(sel); on ? next.add(id) : next.delete(id);
    onSelectedChange && onSelectedChange(next);
  };
  const allOn = sorted.length > 0 && sorted.every((r) => sel.has(r[rowKey]));
  const toggleAll = () => { const next = allOn ? new Set() : new Set(sorted.map((r) => r[rowKey])); onSelectedChange && onSelectedChange(next); };

  const cell = (align) => ({ padding: "14px 16px", textAlign: align === "end" ? "end" : align === "center" ? "center" : "start", fontVariantNumeric: align === "end" ? "tabular-nums" : "normal" });

  return (
    <div style={{ width: "100%", overflow: "auto", maxHeight: "100%", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border-strong)" }}>
            {selectable && (
              <th style={{ ...cell("center"), position: "sticky", top: 0, background: "var(--color-bg)", width: 48 }}>
                <Checkbox checked={allOn} onChange={toggleAll} size={20} />
              </th>
            )}
            {columns.map((c) => {
              const active = sort && sort.key === c.key;
              return (
                <th key={c.key} onClick={() => c.sortable !== false && toggleSort(c.key)}
                  style={{ ...cell(c.align), position: "sticky", top: 0, background: "var(--color-bg)", zIndex: 1,
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                    color: active ? "var(--color-bright-blue)" : "var(--text-secondary)", whiteSpace: "nowrap",
                    cursor: c.sortable === false ? "default" : "pointer", userSelect: "none", width: c.width }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexDirection: c.align === "end" ? "row-reverse" : "row" }}>
                    {c.header}
                    {c.sortable !== false && (
                      <span style={{ display: "inline-flex", opacity: active ? 1 : 0.3 }}>
                        <Icon name={active && sort.dir === "desc" ? "arrow-down" : "arrow-up"} size={13} strokeWidth={2.2} />
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => {
            const id = r[rowKey];
            const on = sel.has(id);
            return (
              <tr key={id}
                style={{ borderBottom: "1px solid var(--color-border)", background: on ? "var(--color-surface-2)" : "transparent", transition: "background var(--dur-link) var(--ease-smooth)" }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--color-surface-2)"; }}
                onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}>
                {selectable && (
                  <td style={{ ...cell("center") }}><Checkbox checked={on} onChange={(v) => setRow(id, v)} size={20} /></td>
                )}
                {columns.map((c) => (
                  <td key={c.key} style={{ ...cell(c.align), fontSize: 14, color: "var(--on-surface)" }}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
