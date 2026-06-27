import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * AccuWeather condition-icon catalog. Each numeric code maps to a label, whether
 * it is a day and/or night glyph, a line-icon fallback (`fb`), and — for day
 * codes that have a distinct nocturnal variant — the equivalent `night` code.
 * The colored SVGs live in assets/icons/weather/<code>.svg.
 */
export const WEATHER_CODES = {
  1:  { label: "Sunny",                      day: true,  night: 33, fb: "sun" },
  2:  { label: "Mostly Sunny",               day: true,  night: 34, fb: "sun" },
  3:  { label: "Partly Sunny",               day: true,  night: 35, fb: "cloud-sun" },
  4:  { label: "Intermittent Clouds",        day: true,  night: 36, fb: "cloud-sun" },
  5:  { label: "Hazy Sunshine",              day: true,  night: 37, fb: "sun" },
  6:  { label: "Mostly Cloudy",              day: true,  night: 38, fb: "cloud" },
  7:  { label: "Cloudy",                     day: true,  both: true, fb: "cloud" },
  8:  { label: "Dreary (Overcast)",          day: true,  both: true, fb: "cloud" },
  11: { label: "Fog",                        day: true,  both: true, fb: "cloud" },
  12: { label: "Showers",                    day: true,  both: true, fb: "cloud-rain" },
  13: { label: "Mostly Cloudy w/ Showers",   day: true,  night: 40, fb: "cloud-rain" },
  14: { label: "Partly Sunny w/ Showers",    day: true,  night: 39, fb: "cloud-rain" },
  15: { label: "T-Storms",                   day: true,  both: true, fb: "cloud-rain" },
  16: { label: "Mostly Cloudy w/ T-Storms",  day: true,  night: 42, fb: "cloud-rain" },
  17: { label: "Partly Sunny w/ T-Storms",   day: true,  night: 41, fb: "cloud-rain" },
  18: { label: "Rain",                       day: true,  both: true, fb: "cloud-rain" },
  19: { label: "Flurries",                   day: true,  both: true, fb: "cloud" },
  20: { label: "Mostly Cloudy w/ Flurries",  day: true,  night: 43, fb: "cloud" },
  21: { label: "Partly Sunny w/ Flurries",   day: true,  night: 44, fb: "cloud" },
  22: { label: "Snow",                       day: true,  both: true, fb: "cloud" },
  23: { label: "Mostly Cloudy w/ Snow",      day: true,  night: 44, fb: "cloud" },
  24: { label: "Ice",                        day: true,  both: true, fb: "cloud" },
  25: { label: "Sleet",                      day: true,  both: true, fb: "cloud-rain" },
  26: { label: "Freezing Rain",              day: true,  both: true, fb: "cloud-rain" },
  29: { label: "Rain and Snow",              day: true,  both: true, fb: "cloud-rain" },
  30: { label: "Hot",                        day: true,  both: true, fb: "sun" },
  31: { label: "Cold",                       day: true,  both: true, fb: "cloud" },
  32: { label: "Windy",                      day: true,  both: true, fb: "wind" },
  33: { label: "Clear",                      night: true, fb: "moon" },
  34: { label: "Mostly Clear",               night: true, fb: "moon" },
  35: { label: "Partly Cloudy",              night: true, fb: "cloud-moon" },
  36: { label: "Intermittent Clouds",        night: true, fb: "cloud-moon" },
  37: { label: "Hazy Moonlight",             night: true, fb: "moon" },
  38: { label: "Mostly Cloudy",              night: true, fb: "cloud-moon" },
  39: { label: "Partly Cloudy w/ Showers",   night: true, fb: "cloud-rain" },
  40: { label: "Mostly Cloudy w/ Showers",   night: true, fb: "cloud-rain" },
  41: { label: "Partly Cloudy w/ T-Storms",  night: true, fb: "cloud-rain" },
  42: { label: "Mostly Cloudy w/ T-Storms",  night: true, fb: "cloud-rain" },
  43: { label: "Mostly Cloudy w/ Flurries",  night: true, fb: "cloud-moon" },
  44: { label: "Mostly Cloudy w/ Snow",      night: true, fb: "cloud-moon" },
};

/** Resolve a code to its night equivalent (or itself when there is no separate one). */
export function nightCode(code) {
  const e = WEATHER_CODES[code];
  return (e && e.night && typeof e.night === "number") ? e.night : code;
}

/**
 * WeatherGlyph — renders an AccuWeather condition icon by numeric `code`
 * (the colored SVGs in assets/icons/weather/). Pass `night` to swap a day code
 * for its nocturnal variant. Falls back to a Lucide line icon if the SVG is
 * missing — either the catalog `fb` or an explicit `fb` override. An explicit
 * `src` still wins for ad-hoc images.
 */
export function WeatherGlyph({
  code,
  night = false,
  base = "assets/icons/weather",
  ext = "svg",
  src,
  fb,
  size = 48,
  color = "var(--color-bright-blue)",
  alt = "",
  style,
}) {
  const [err, setErr] = React.useState(false);
  const resolved = night ? nightCode(code) : code;
  const entry = WEATHER_CODES[resolved];
  const url = src || (resolved != null ? `${base}/${resolved}.${ext}` : null);
  const fallback = fb || (entry && entry.fb) || "cloud-sun";

  if (url && !err) {
    return (
      <img
        src={url}
        alt={alt || (entry ? entry.label : "")}
        width={size}
        height={size}
        onError={() => setErr(true)}
        style={{ width: size, height: size, objectFit: "contain", display: "block", ...style }}
      />
    );
  }
  return <Icon name={fallback} size={size} strokeWidth={1.5} color={color} style={style} />;
}
