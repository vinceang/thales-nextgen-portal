import React from "react";
import { Icon } from "../core/Icon.jsx";
import s from "./DatePicker.module.css";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["S","M","T","W","T","F","S"];

function fmt(d) {
  if (!d) return "";
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * DatePicker — labelled trigger field that opens a sharp calendar panel. Month
 * nav (chevrons mirror under RTL), a 7-column day grid, highlight-blue selected
 * day, hairline today ring, real :hover. Flat panel (no shadow).
 */
export function DatePicker({ label, id, value = null, onChange, placeholder = "Select date", className, style, ...rest }) {
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
    <div ref={ref} className={className ? `${s.wrap} ${className}` : s.wrap} style={style} {...rest}>
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      <button
        type="button"
        id={id}
        className={s.trigger}
        data-empty={value ? undefined : "true"}
        data-open={open || undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value ? fmt(value) : placeholder}</span>
        <Icon name="calendar" size={18} color="var(--on-surface-muted)" />
      </button>

      {open && (
        <div className={s.panel}>
          <div className={s.head}>
            <button type="button" aria-label="Previous month" className={s.nav} onClick={() => shift(-1)}>
              <Icon name="chevron-left" size={18} />
            </button>
            <span className={s.title}>{MONTHS[m]} {y}</span>
            <button type="button" aria-label="Next month" className={s.nav} onClick={() => shift(1)}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
          <div className={s.dow}>
            {DOW.map((d, i) => <span key={i} className={s.dowCell}>{d}</span>)}
          </div>
          <div className={s.grid}>
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              return (
                <button
                  key={i}
                  type="button"
                  className={s.day}
                  data-selected={sameDay(d, value) || undefined}
                  data-today={sameDay(d, today) || undefined}
                  onClick={() => { onChange && onChange(d); setOpen(false); }}
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
