import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Checkbox } from "../forms/Checkbox.jsx";
import s from "./DataGrid.module.css";

/**
 * DataGrid — interactive table: click-to-sort heads, optional row selection,
 * sticky head, real row :hover. One accent for active sort / selection.
 */
export function DataGrid({ columns = [], rows = [], rowKey = "id", selectable = false, selected, onSelectedChange, className, style, ...rest }) {
  const [sort, setSort] = React.useState(null);
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

  const toggleSort = (key) => setSort((st) => (st && st.key === key ? (st.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" }));
  const setRow = (id, on) => { const next = new Set(sel); on ? next.add(id) : next.delete(id); onSelectedChange && onSelectedChange(next); };
  const allOn = sorted.length > 0 && sorted.every((r) => sel.has(r[rowKey]));
  const toggleAll = () => { const next = allOn ? new Set() : new Set(sorted.map((r) => r[rowKey])); onSelectedChange && onSelectedChange(next); };

  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      <table className={s.table}>
        <thead>
          <tr className={s.headRow}>
            {selectable && <th className={s.selCol}><Checkbox checked={allOn} onChange={toggleAll} size={20} /></th>}
            {columns.map((c) => {
              const active = sort && sort.key === c.key;
              const sortable = c.sortable !== false;
              return (
                <th
                  key={c.key}
                  className={s.th}
                  data-align={c.align}
                  data-sortable={sortable ? "true" : undefined}
                  data-active={active ? "true" : undefined}
                  style={{ width: c.width }}
                  onClick={() => sortable && toggleSort(c.key)}
                >
                  <span className={s.thInner} data-align={c.align}>
                    {c.header}
                    {sortable && (
                      <span className={s.sortIcon}>
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
              <tr key={id} className={s.row} data-selected={on ? "true" : undefined}>
                {selectable && <td className={s.tdSel}><Checkbox checked={on} onChange={(v) => setRow(id, v)} size={20} /></td>}
                {columns.map((c) => (
                  <td key={c.key} className={s.td} data-align={c.align}>{c.render ? c.render(r) : r[c.key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
