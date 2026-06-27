import React from "react";
import { WeatherGlyph } from "./WeatherGlyph.jsx";

/**
 * WeatherTile — the pure-black dashboard module: date, city, condition icon,
 * temperature, condition word, and a forecast link.
 */
export function WeatherTile({
  date = "Tue, Jul 4",
  city = "Orlando",
  fb = "sun",
  code = 1,
  night = false,
  base = "assets/icons/weather",
  iconSrc,
  temp = "79.5°",
  unit = "F",
  condition = "Sunny",
  linkLabel = "5-Day Forecast",
  onLink,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        background: "var(--color-black)",
        color: "var(--color-white)",
        minHeight: "100%",
        borderRadius: "var(--radius-card)",
        boxSizing: "border-box",
        padding: "var(--space-sm, 16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 10,
        ...style,
      }}
      {...rest}
    >
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{date}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{city}</div>
      <div style={{ margin: "4px 0" }}>
        <WeatherGlyph src={iconSrc} code={code} night={night} base={base} fb={fb} size={52} />
      </div>
      <div style={{ fontSize: 34, fontWeight: 300, fontVariantNumeric: "tabular-nums" }}>
        {temp} {unit}
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{condition}</div>
      {linkLabel && (
        <a
          onClick={onLink}
          style={{
            marginTop: 6,
            color: "var(--color-bright-blue)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            cursor: "pointer",
          }}
        >
          {linkLabel}
        </a>
      )}
    </div>
  );
}
