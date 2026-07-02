// Weather page content.
//
// The SEAM a future data source populates (ADR 0001). Today it returns a static
// placeholder forecast (AccuWeather-coded conditions + Unsplash imagery); the
// planned **AccuWeather** integration will return this same shape (hero city +
// gallery of cities + 5-day forecast + weather news) and the page won't change.
// City names + condition strings stay verbatim across locales; only chrome
// (buttons, headings) comes from the i18n dictionary via `t`.
//
// Temperatures are authored once in Celsius; the page renders °C or °F from the
// unit toggle (see cToF). This keeps the data source-of-truth unit-agnostic.
import type { TFunc } from "../i18n";

/** Celsius → Fahrenheit, rounded to one decimal (matches the comps, e.g. 38.5→101.3). */
export function cToF(c: number): number {
  return Math.round(((c * 9) / 5 + 32) * 10) / 10;
}

export interface WeatherHero {
  city: string;
  /** Wide destination backdrop (16:9). */
  image: string;
  /** AccuWeather condition code (drives WeatherGlyph). */
  code: number;
  condition: string;
  /** Current temperature, Celsius. */
  tempC: number;
}

export interface WeatherCity {
  /** Stable id (React key + future AccuWeather location key). */
  id: string;
  name: string;
  /** Portrait city backdrop (3:4). */
  image: string;
  code: number;
  condition: string;
  /** Daily high / low, Celsius. */
  highC: number;
  lowC: number;
}

export interface ForecastDay {
  /** Short weekday label (localized by the real service later). */
  day: string;
  code: number;
  condition: string;
  highC: number;
  lowC: number;
}

export interface WeatherNews {
  id: string;
  image: string;
  headline: string;
  /** Relative timestamp (localized by the real service later). */
  timeAgo: string;
}

export interface WeatherContent {
  hero: WeatherHero;
  cities: WeatherCity[];
  forecast: ForecastDay[];
  news: WeatherNews[];
  /** Doppler-radar still (a live tile later). */
  radarImage: string;
}

// Placeholder imagery (Unsplash) — reuses IDs already proven to load elsewhere in
// the app. A real AccuWeather integration would supply its own destination art.
const wide = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&h=760&fit=crop&q=80`;
const tall = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=800&fit=crop&q=80`;
const news = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&h=300&fit=crop&q=80`;

// Condition strings mirror the AccuWeather code labels (see WeatherGlyph
// WEATHER_CODES). Kept explicit here so copy can be tuned without touching codes.
const CITIES: WeatherCity[] = [
  { id: "melbourne", name: "Melbourne", image: tall("1514395462725-fb4566210144"), code: 14, condition: "Partly Sunny w/ Showers", highC: 19.5, lowC: 10.5 },
  { id: "delhi", name: "Delhi", image: tall("1587474260584-136574528ed5"), code: 2, condition: "Mostly Sunny", highC: 33.5, lowC: 24.5 },
  { id: "shanghai", name: "Shanghai", image: tall("1474181487882-5abf3f0ba6c2"), code: 3, condition: "Partly Sunny", highC: 27.5, lowC: 19.5 },
  { id: "sao-paulo", name: "Sao Paulo", image: tall("1543059080-f9b1272213d5"), code: 4, condition: "Intermittent Clouds", highC: 22.5, lowC: 14.5 },
  { id: "mexico-city", name: "Mexico City", image: tall("1518105779142-d975f22f1b0a"), code: 5, condition: "Hazy Sunshine", highC: 24.5, lowC: 12.5 },
  { id: "cairo", name: "Cairo", image: tall("1572252009286-268acec5ca0a"), code: 1, condition: "Sunny", highC: 35.5, lowC: 22.5 },
  { id: "dhaka", name: "Dhaka", image: tall("1583422409516-2895a77efded"), code: 6, condition: "Mostly Cloudy", highC: 31.5, lowC: 25.5 },
  { id: "mumbai", name: "Mumbai", image: tall("1529253355930-ddbe423a2ac7"), code: 12, condition: "Showers", highC: 29.5, lowC: 26.5 },
  { id: "beijing", name: "Beijing", image: tall("1508804185872-d7badad00f7d"), code: 11, condition: "Fog", highC: 21.5, lowC: 11.5 },
  { id: "osaka", name: "Osaka", image: tall("1590559899731-a382839e5549"), code: 15, condition: "T-Storms", highC: 26.5, lowC: 20.5 },
  { id: "karachi", name: "Karachi", image: tall("1567606404787-9f5d29fbb1f5"), code: 1, condition: "Sunny", highC: 34.5, lowC: 27.5 },
  { id: "chongqing", name: "Chongqing", image: tall("1513415277900-a62401e19be4"), code: 7, condition: "Cloudy", highC: 25.5, lowC: 18.5 },
  { id: "buenos-aires", name: "Buenos Aires", image: tall("1612294037637-ec328d0e075e"), code: 18, condition: "Rain", highC: 16.5, lowC: 9.5 },
  { id: "istanbul", name: "Istanbul", image: tall("1524231757912-21f4fe3a7200"), code: 16, condition: "Mostly Cloudy w/ T-Storms", highC: 20.5, lowC: 13.5 },
  { id: "kolkata", name: "Kolkata", image: tall("1558431382-27e303142255"), code: 17, condition: "Partly Sunny w/ T-Storms", highC: 30.5, lowC: 24.5 },
];

// Orlando in summer — warm, with the daily afternoon-thunderstorm pattern.
const FORECAST: ForecastDay[] = [
  { day: "Today", code: 3, condition: "Partly Sunny", highC: 33.5, lowC: 24.5 },
  { day: "Wed", code: 16, condition: "Mostly Cloudy w/ T-Storms", highC: 32.5, lowC: 24.5 },
  { day: "Thu", code: 15, condition: "T-Storms", highC: 31.5, lowC: 23.5 },
  { day: "Fri", code: 4, condition: "Intermittent Clouds", highC: 33.5, lowC: 24.5 },
  { day: "Sat", code: 1, condition: "Sunny", highC: 34.5, lowC: 25.5 },
];

const NEWS: WeatherNews[] = [
  { id: "wx1", image: news("1428592953211-077101b2021b"), headline: "Afternoon storms return to Central Florida through the weekend", timeAgo: "12 minutes ago" },
  { id: "wx2", image: news("1561553543-e4c7b608b98d"), headline: "Heat advisory in effect across the I-4 corridor", timeAgo: "48 minutes ago" },
  { id: "wx3", image: news("1500674425229-f692875b0ab7"), headline: "Tropical moisture to raise humidity across the peninsula", timeAgo: "2 hours ago" },
];

export function getWeatherContent(_t: TFunc): WeatherContent {
  return {
    hero: {
      // Destination — matches the flight tracker / Showcase (Orlando, FL).
      city: "Orlando",
      image: wide("1597466599360-3b9775841aec"),
      code: 3,
      condition: "Partly Sunny",
      tempC: 26.4, // → 79.5° F, matching the Showcase weather tile
    },
    cities: CITIES,
    forecast: FORECAST,
    news: NEWS,
    radarImage: news("1561553543-e4c7b608b98d"),
  };
}
