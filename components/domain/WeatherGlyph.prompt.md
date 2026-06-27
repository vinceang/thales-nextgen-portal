AccuWeather colored condition icon, resolved by numeric `code`, with a Lucide line-icon fallback.

```jsx
<WeatherGlyph code={1} size={52} />          {/* Sunny */}
<WeatherGlyph code={1} night size={52} />     {/* → 33 Clear */}
<WeatherGlyph code={15} size={52} />          {/* T-Storms */}
```

- The 40 colored SVGs live in `assets/icons/weather/<code>.svg`. Pass `code`; set `base` if your page sits at a different depth (e.g. `../../assets/icons/weather`).
- Codes follow AccuWeather: **day** 1–32 (1 Sunny, 3 Partly Sunny, 6 Mostly Cloudy, 7 Cloudy, 12 Showers, 15 T-Storms, 18 Rain, 22 Snow, 32 Windy…), **night** 33–44 (33 Clear, 35 Partly Cloudy, 38 Mostly Cloudy…).
- `night` swaps a day code for its nocturnal twin (1→33, 3→35, 6→38…); codes that are identical day & night (7, 12, 15, 18, 22…) stay put.
- `WEATHER_CODES` (exported) carries each code's `label` + `fb`; `nightCode(code)` returns the night equivalent.
- These are the **one colored exception** to the white line-icon system — the licensed AccuWeather set. Don't recolor them.
