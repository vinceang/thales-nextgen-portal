import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";
import { FlightTracker } from "../domain/FlightTracker.jsx";

/**
 * Sidebar — the portal's configurable navigation surface, with the two
 * white-label treatments the IFE shipped:
 *
 *   variant="overlay" (A) — full-height slide-out drawer with large single-word
 *                           items, over a backdrop (the white-label default
 *                           skin). Themed (follows light/dark); uses
 *                           position:absolute, so it fills the nearest
 *                           positioned ancestor.
 *   variant="rail"    (B) — a persistent ICON rail pinned to the inline-start
 *                           edge. Expanding it WIDENS the rail in-flow and
 *                           pushes the content toward the inline-end (right in
 *                           LTR, left in RTL) — it does not overlay. Built from
 *                           logical properties so RTL works without extra code.
 *
 * The mini FlightTracker is a configurable item in either treatment — pass
 * `flight` to show it, omit to hide.
 */
function normalize(items) {
  return items.map((it) =>
    typeof it === "string"
      ? { key: it, label: it }
      : { key: it.key ?? it.value ?? it.label, label: it.label, icon: it.icon, badge: it.badge }
  );
}

const RAIL_COLLAPSED = 72;
const RAIL_EXPANDED = 264;

export function Sidebar({
  variant = "overlay",
  items = [],
  active,
  onSelect,
  flight,
  open = false,
  onOpen,
  onClose,
  onToggle,
  title,
  showToggle = true,
  style,
  ...rest
}) {
  const list = normalize(items);

  // ── B · icon rail that expands in-flow (pushes content) ────────────────────
  if (variant === "rail") {
    // Uncontrolled fallback: manage the expanded state internally if the caller
    // doesn't wire onToggle / onOpen / onClose.
    const [internalOpen, setInternalOpen] = React.useState(false);
    const controlled = onToggle != null || onOpen != null || onClose != null;
    const isOpen = controlled ? open : internalOpen;
    const toggle = controlled
      ? () => (onToggle ? onToggle() : isOpen ? onClose && onClose() : onOpen && onOpen())
      : () => setInternalOpen((o) => !o);

    const fade = { transition: "opacity 0.2s var(--ease-smooth)", whiteSpace: "nowrap" };

    return (
      <nav
        style={{
          flex: "0 0 auto", alignSelf: "stretch",
          width: isOpen ? RAIL_EXPANDED : RAIL_COLLAPSED,
          transition: "width 0.3s var(--ease-smooth)",
          overflow: "hidden", boxSizing: "border-box",
          borderInlineEnd: "var(--border-width) solid var(--border-hairline)",
          background: "var(--bg-page)",
          ...style,
        }}
        {...rest}
      >
        {/* Fixed-width inner track: the nav clips it as the width animates, so
            content is revealed/hidden rather than reflowing. */}
        <div style={{ width: RAIL_EXPANDED, boxSizing: "border-box", padding: "14px 0", display: "flex", flexDirection: "column", gap: 4 }}>
          {showToggle && (
            <div style={{ display: "flex", justifyContent: "center", width: RAIL_COLLAPSED }}>
              <IconButton label={isOpen ? "Collapse menu" : "Expand menu"} onClick={toggle}>
                <Icon name="menu" />
              </IconButton>
            </div>
          )}

          {flight && (
            <div style={{ position: "relative", minHeight: 48, marginBottom: 4, borderBottom: "var(--border-width) solid var(--border-hairline)" }}>
              {/* Collapsed: a single plane glyph centred in the icon column. */}
              <div style={{ position: "absolute", insetBlockStart: 0, insetInlineStart: 0, height: "100%", width: RAIL_COLLAPSED, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-emphasis)", opacity: isOpen ? 0 : 1, transition: "opacity 0.2s var(--ease-smooth)", pointerEvents: "none" }}>
                <span style={{ display: "flex", transform: "rotate(45deg)" }}><Icon name="plane" size={20} strokeWidth={1.75} /></span>
              </div>
              {/* Expanded: the full mini tracker. */}
              <div style={{ padding: "10px 16px 14px", opacity: isOpen ? 1 : 0, ...fade }}>
                <FlightTracker {...flight} tone="theme" />
              </div>
            </div>
          )}

          {title && (
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", padding: "8px 16px 6px", opacity: isOpen ? 1 : 0, ...fade }}>
              {title}
            </div>
          )}

          {list.map((it) => {
            const isActive = active === it.key;
            return (
              <button
                key={it.key}
                title={typeof it.label === "string" ? it.label : undefined}
                onClick={() => onSelect && onSelect(it.key)}
                style={{
                  position: "relative", width: RAIL_EXPANDED, height: 46, border: "none",
                  display: "flex", alignItems: "center", textAlign: "start",
                  paddingInlineStart: 14, paddingInlineEnd: 16,
                  background: isActive ? "var(--surface-input)" : "transparent",
                  color: isActive ? "var(--color-bright-blue)" : "var(--on-surface-muted)",
                  cursor: "pointer",
                  transition: "background 0.2s var(--ease-smooth), color 0.2s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--hover-veil)"; e.currentTarget.style.color = "var(--text-primary)"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--on-surface-muted)"; } }}
              >
                {isActive && <span style={{ position: "absolute", insetInlineStart: 0, top: 9, bottom: 9, width: 2, background: "var(--color-bright-blue)" }} />}
                <span style={{ flex: "0 0 auto", width: 44, display: "flex", justifyContent: "center" }}>
                  <Icon name={it.icon || "menu"} size={20} />
                </span>
                <span style={{ fontWeight: 600, fontSize: 15, opacity: isOpen ? 1 : 0, ...fade }}>{it.label}</span>
                {it.badge != null && (
                  <span style={{ marginInlineStart: "auto", fontSize: 12, fontWeight: 700, color: "var(--color-bright-blue)", opacity: isOpen ? 1 : 0, ...fade }}>{it.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // ── A · full-height black overlay drawer (white-label default) ─────────────
  return (
    <div
      aria-hidden={!open}
      style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: open ? "auto" : "none", ...style }}
      {...rest}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0, transition: "opacity 0.3s var(--ease-smooth)",
        }}
      />
      <nav
        style={{
          position: "absolute", insetBlock: 0, insetInlineStart: 0,
          width: "min(360px, 82vw)", background: "var(--bg-page)",
          borderInlineEnd: "var(--border-width) solid var(--border-hairline)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s var(--ease-smooth)",
          display: "flex", flexDirection: "column", padding: "16px 0", boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 20px 8px" }}>
          <IconButton label="Close" onClick={onClose}><Icon name="x" /></IconButton>
          {flight && (
            <div style={{ flex: 1 }}>
              <FlightTracker {...flight} tone="theme" />
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "24px 28px", gap: 2 }}>
          {list.map((it) => {
            const isActive = active === it.key;
            return (
              <a
                key={it.key}
                onClick={() => onSelect && onSelect(it.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  fontFamily: "var(--font-sans)", fontWeight: 700,
                  fontSize: "clamp(24px, calc(24px + 6 * (100vw - 480px) / 720), 30px)",
                  lineHeight: 1.55, cursor: "pointer",
                  color: isActive ? "var(--color-bright-blue)" : "var(--text-primary)",
                  transition: "color 0.3s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-secondary)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
              >
                {it.icon && <Icon name={it.icon} size={22} />}
                <span>{it.label}</span>
                {it.badge != null && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-bright-blue)" }}>{it.badge}</span>
                )}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
