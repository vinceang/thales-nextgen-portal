import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";
import { FlightTracker } from "../domain/FlightTracker.jsx";

/**
 * SideDrawer — full-height black slide-out menu. Flight tracker at the top, large
 * single-word nav items below (active item = bright-blue), dimmed backdrop.
 */
export function SideDrawer({
  open = false,
  items = [],
  active,
  flight,
  onSelect,
  onClose,
  style,
  ...rest
}) {
  return (
    <div
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: open ? "auto" : "none",
        ...style,
      }}
      {...rest}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s var(--ease-smooth)",
        }}
      />
      {/* panel */}
      <nav
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(360px, 82vw)",
          background: "var(--color-black)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s var(--ease-smooth)",
          display: "flex",
          flexDirection: "column",
          padding: "16px 0",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 20px 8px" }}>
          <IconButton label="Close" onClick={onClose}><Icon name="x" /></IconButton>
          {flight && (
            <div style={{ flex: 1 }}>
              <FlightTracker {...flight} />
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "24px 28px", gap: 2 }}>
          {items.map((it) => {
            const key = typeof it === "string" ? it : it.key;
            const label = typeof it === "string" ? it : it.label;
            const isActive = active === key;
            return (
              <a
                key={key}
                onClick={() => onSelect && onSelect(key)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(24px, calc(24px + 6 * (100vw - 480px) / 720), 30px)",
                  letterSpacing: "0",
                  lineHeight: 1.55,
                  cursor: "pointer",
                  color: isActive ? "var(--color-bright-blue)" : "var(--color-white)",
                  transition: "color 0.3s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-white)"; }}
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
