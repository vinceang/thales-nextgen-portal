import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * NavBar — sticky top bar: hamburger + logo on the left, centered view title,
 * status icons (search / Wi-Fi / profile) on the right. White on the dark base.
 */
export function NavBar({
  title,
  logo,
  onMenu,
  wifiActive = true,
  onSearch,
  onProfile,
  style,
  ...rest
}) {
  return (
    <header
      style={{
        position: "relative",
        height: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "var(--color-bg)",
        color: "var(--text-primary)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
        <IconButton label="Menu" onClick={onMenu}>
          <Icon name="menu" />
        </IconButton>
        {logo && <img src={logo} alt="" style={{ height: 18 }} />}
      </div>

      {title && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 4, zIndex: 1 }}>
        <IconButton label="Search" onClick={onSearch}><Icon name="search" /></IconButton>
        <IconButton label="Wi-Fi" active={wifiActive}><Icon name="wifi" /></IconButton>
        <IconButton label="Profile" onClick={onProfile}><Icon name="user" /></IconButton>
      </div>
    </header>
  );
}
