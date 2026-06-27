import React from "react";
import { Icon } from "../core/Icon.jsx";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["S","M","T","W","T","F","S"];

function fmt(d) {
  if (!d) return "";
  return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * DatePicker — labelled trigger field that opens a sharp calendar panel.
 * Month nav (chevrons mirror under RTL), a 7-column day grid, highlight-blue
 * selected day, hairline today ring. Flat panel (no shadow), dark surfaces.
 */
export function DatePicker({ label, id, value = null, onChange, placeholder = "Select date", minYear, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(value || new Date());
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const today = new Date();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d));

  const shift = (n) => setView(new Date(y, m + n, 1));

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative", ...style }} {...rest}>
      {label && (
        <label htmlFor={id} style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--on-surface)" }}>{label}</label>
      )}
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          fontFamily: "var(--font-sans)", fontSize: 15, textAlign: "start",
          color: value ? "var(--color-white)" : "var(--color-grey)",
          background: "var(--color-surface-3)",
          border: `1px solid ${open ? "var(--color-highlight-blue)" : "transparent"}`,
          borderRadius: "var(--radius-control)", padding: "14px 16px", width: "100%",
          boxSizing: "border-box", cursor: "pointer", transition: "border-color 0.2s var(--ease-smooth)",
        }}
      >
        <span>{value ? fmt(value) : placeholder}</span>
        <Icon name="calendar" size={18} color="var(--on-surface-muted)" />
      </button>

      {open && (
        <div
          style={{
            position: "absolute", insetInlineStart: 0, top: "calc(100% + 8px)", zIndex: 50, width: 300,
            background: "var(--color-surface-2)", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)", padding: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <button type="button" aria-label="Previous month" onClick={() => shift(-1)} style={navBtn}>
              <Icon name="chevron-left" size={18} />
            </button>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
              {MONTHS[m]} {y}
            </span>
            <button type="button" aria-label="Next month" onClick={() => shift(1)} style={navBtn}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 6 }}>
            {DOW.map((d, i) => (
              <span key={i} style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "var(--text-secondary)" }}>{d}</span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const sel = sameDay(d, value);
              const isToday = sameDay(d, today);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { onChange && onChange(d); setOpen(false); }}
                  style={{
                    aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-sans)", fontSize: 14, fontVariantNumeric: "tabular-nums",
                    border: isToday && !sel ? "1px solid var(--color-border-strong)" : "1px solid transparent",
                    borderRadius: "var(--radius-control)", cursor: "pointer",
                    background: sel ? "var(--color-highlight-blue)" : "transparent",
                    color: sel ? "var(--color-white)" : "var(--on-surface)",
                    transition: "background 0.15s var(--ease-smooth)",
                  }}
                  onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "var(--color-surface-3)"; }}
                  onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, background: "transparent",
  border: "1px solid var(--color-border)", borderRadius: "var(--radius-control)",
  color: "var(--text-primary)", cursor: "pointer",
};
