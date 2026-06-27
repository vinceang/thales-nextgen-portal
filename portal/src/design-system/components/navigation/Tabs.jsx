import React from "react";

/**
 * Tabs — horizontal view switcher. Montserrat labels; the active tab is
 * bright-blue with a 2px highlight-blue underline that rides under it. Hairline
 * baseline. Data-driven; horizontally scrollable when it overflows. RTL flows
 * along the inline axis automatically.
 */
export function Tabs({ tabs = [], value, onChange, style, ...rest }) {
  return (
    <div
      role="tablist"
      style={{
        display: "flex", gap: 28, alignItems: "stretch",
        borderBottom: "1px solid var(--color-border)",
        overflowX: "auto", scrollbarWidth: "none",
        ...style,
      }}
      {...rest}
    >
      {tabs.map((t) => {
        const val = typeof t === "string" ? t : t.value;
        const lbl = typeof t === "string" ? t : t.label;
        const active = value === val;
        return (
          <button
            key={val}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(val)}
            style={{
              position: "relative",
              background: "none", border: "none", cursor: "pointer",
              padding: "0 0 14px", whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)", fontWeight: active ? 700 : 500, fontSize: 15,
              color: active ? "var(--color-bright-blue)" : "var(--on-surface-muted)",
              transition: "color var(--dur-link) var(--ease-smooth)",
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--color-white)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--on-surface-muted)"; }}
          >
            {lbl}
            <span style={{
              position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, bottom: -1, height: 2,
              background: active ? "var(--color-highlight-blue)" : "transparent",
              transition: "background var(--dur-link) var(--ease-smooth)",
            }} />
          </button>
        );
      })}
    </div>
  );
}
