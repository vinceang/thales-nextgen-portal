import React from "react";

/**
 * Table — semantic data table. UPPERCASE Montserrat column heads on a hairline
 * baseline, hairline row dividers, numeric columns right-aligned (align="end").
 * Flat — no zebra fill, no shadow; hover lifts the row with a faint surface.
 * For sorting / selection / large sets use DataGrid.
 */
export function Table({ columns = [], rows = [], rowKey, getCellValue, style, ...rest }) {
  const cell = (align) => ({
    padding: "14px 16px",
    textAlign: align === "end" ? "end" : align === "center" ? "center" : "start",
    fontVariantNumeric: align === "end" ? "tabular-nums" : "normal",
  });

  return (
    <div style={{ width: "100%", overflowX: "auto", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border-strong)" }}>
            {columns.map((c) => (
              <th key={c.key} style={{ ...cell(c.align), fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", whiteSpace: "nowrap", width: c.width }}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={rowKey ? r[rowKey] : ri}
              style={{ borderBottom: "1px solid var(--color-border)", transition: "background var(--dur-link) var(--ease-smooth)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              {columns.map((c) => {
                const val = c.render ? c.render(r) : getCellValue ? getCellValue(r, c) : r[c.key];
                return (
                  <td key={c.key} style={{ ...cell(c.align), fontSize: 14, color: "var(--on-surface)" }}>
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
