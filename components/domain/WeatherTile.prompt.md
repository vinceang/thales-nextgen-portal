Pure-black weather module for the bento grid: date, city, condition icon, temperature, forecast link.

```jsx
<WeatherTile date="Tue, Jul 4" city="Orlando" icon="cloud-sun"
  temp="79.5°" unit="F" condition="Sunny" onLink={openForecast} />
```

- Sits on black `rgb(0,0,0)` — the only non-image tile in the bento. Icon and link are bright-blue.
