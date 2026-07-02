import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";
import s from "./NavBar.module.css";

/**
 * NavBar — sticky top bar: hamburger + home (+ optional logo) on the left,
 * centered view title, status icons (search / Wi-Fi / profile) on the right.
 * The home button is a standard nav affordance; wire it up with `onHome`. The
 * Wi-Fi status icon reflects `wifiActive`; give it `onWifi` to make it actionable
 * (e.g. link to the plans page while disconnected).
 */
export function NavBar({ title, logo, onMenu, onHome, wifiActive = true, onWifi, onSearch, onProfile, className, style, ...rest }) {
  return (
    <header className={className ? `${s.bar} ${className}` : s.bar} style={style} {...rest}>
      <div className={s.left}>
        <IconButton label="Menu" onClick={onMenu}><Icon name="menu" /></IconButton>
        <IconButton label="Home" onClick={onHome}><Icon name="home" /></IconButton>
        {logo && <img src={logo} alt="" className={s.logo} />}
      </div>

      {title && <div className={s.title}>{title}</div>}

      <div className={s.right}>
        <IconButton label="Search" onClick={onSearch}><Icon name="search" /></IconButton>
        <IconButton label="Wi-Fi" active={wifiActive} onClick={onWifi}><Icon name="wifi" /></IconButton>
        <IconButton label="Profile" onClick={onProfile}><Icon name="user" /></IconButton>
      </div>
    </header>
  );
}
