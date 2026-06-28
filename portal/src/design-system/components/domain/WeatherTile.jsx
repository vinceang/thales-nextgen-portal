import React from "react";
import { WeatherGlyph } from "./WeatherGlyph.jsx";
import s from "./WeatherTile.module.css";

/** WeatherTile — pure-black weather dashboard module: date, city, icon, temp, link. */
export function WeatherTile({
  date = "Tue, Jul 4", city = "Orlando", fb = "sun", code = 1, night = false,
  base = "assets/icons/weather", iconSrc, temp = "79.5°", unit = "F",
  condition = "Sunny", linkLabel = "5-Day Forecast", onLink, className, style, ...rest
}) {
  return (
    <div className={className ? `${s.tile} ${className}` : s.tile} style={style} {...rest}>
      <div className={s.date}>{date}</div>
      <div className={s.city}>{city}</div>
      <div className={s.glyph}>
        <WeatherGlyph src={iconSrc} code={code} night={night} base={base} fb={fb} size={52} />
      </div>
      <div className={s.temp}>{temp} {unit}</div>
      <div className={s.condition}>{condition}</div>
      {linkLabel && <a onClick={onLink} className={s.link}>{linkLabel}</a>}
    </div>
  );
}
