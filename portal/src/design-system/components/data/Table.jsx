import React from "react";
import s from "./Table.module.css";

/**
 * Table — semantic data table. Uppercase heads, hairline dividers, numeric
 * columns right-aligned (align="end"), real row :hover. For sorting/selection
 * use DataGrid.
 */
export function Table({ columns = [], rows = [], rowKey, getCellValue, className, style, ...rest }) {
  return (
    <div className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      <table className={s.table}>
        <thead>
          <tr className={s.headRow}>
            {columns.map((c) => (
              <th key={c.key} className={s.th} data-align={c.align} style={{ width: c.width }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={rowKey ? r[rowKey] : ri} className={s.row}>
              {columns.map((c) => {
                const val = c.render ? c.render(r) : getCellValue ? getCellValue(r, c) : r[c.key];
                return <td key={c.key} className={s.td} data-align={c.align}>{val}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
