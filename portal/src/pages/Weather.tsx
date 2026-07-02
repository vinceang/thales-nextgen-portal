import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WeatherGlyph, NewsItem, Icon } from "../design-system/components";
import { getWeatherContent, cToF, type WeatherContent, type WeatherCity, type ForecastDay } from "../content/weather";
import { useI18n } from "../i18n";
import s from "./Weather.module.css";

/* Weather — destination hero + city gallery (landing), with a 5-Day Forecast
   sub-view (5-day grid + Doppler radar + weather news) reached from the hero
   CTA. Data comes from the content/weather.ts seam (AccuWeather later). Cities
   and conditions are verbatim data; only chrome (CTA, headings) is i18n. */

// Colored AccuWeather glyphs + brand logo live under public/assets.
const ICON_BASE = "/assets/icons/weather";
const ACCU_LOGO = "/assets/logos/accuweather-light.svg";

type Unit = "C" | "F";

// Daily high / low rendered in the selected unit (data is authored in Celsius).
function tempPair(highC: number, lowC: number, unit: Unit): string {
  const hi = unit === "C" ? highC : cToF(highC);
  const lo = unit === "C" ? lowC : cToF(lowC);
  return `${hi}° / ${lo}° ${unit}`;
}

function UnitToggle({ unit, onChange }: { unit: Unit; onChange: (u: Unit) => void }) {
  return (
    <div className={s.unit} role="group" aria-label="Temperature unit">
      {(["F", "C"] as Unit[]).map((u) => (
        <button
          key={u}
          type="button"
          className={s.unitSeg}
          data-active={unit === u || undefined}
          aria-pressed={unit === u}
          onClick={() => onChange(u)}
        >
          °{u}
        </button>
      ))}
    </div>
  );
}

// ── Landing: hero + city gallery ──────────────────────────────────────────
function GalleryView({ w, unit, setUnit, onForecast }: {
  w: WeatherContent; unit: Unit; setUnit: (u: Unit) => void; onForecast: () => void;
}) {
  const { t } = useI18n();
  const { hero, cities } = w;
  return (
    <div className={s.page}>
      <section className={s.hero}>
        <img className={s.heroImg} src={hero.image} alt="" />
        <div className={s.heroInner}>
          <div>
            <h1 className={s.heroCity}>{hero.city}</h1>
            <img className={s.attribution} src={ACCU_LOGO} alt="AccuWeather" />
            <div className={s.heroReading}>
              <WeatherGlyph code={hero.code} base={ICON_BASE} size={88} />
              <div className={s.heroTemp}>
                {hero.tempC}° C / {cToF(hero.tempC)}° F
              </div>
            </div>
            <div className={s.heroCond}>{hero.condition}</div>
          </div>
          <button type="button" className={s.cta} onClick={onForecast}>
            {t("weather.forecastCta")}
          </button>
        </div>
      </section>

      <div className={s.wrap}>
        <div className={s.toolbar}>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>

        {/* Desktop / tablet: card grid. */}
        <div className={s.cards}>
          {cities.map((c) => <CityCard key={c.id} city={c} unit={unit} />)}
        </div>

        {/* Phone: row list (CSS toggles which of these is shown). */}
        <div className={s.list}>
          {cities.map((c) => <CityRow key={c.id} city={c} unit={unit} />)}
        </div>
      </div>
    </div>
  );
}

function CityCard({ city, unit }: { city: WeatherCity; unit: Unit }) {
  return (
    <article className={s.card}>
      <img className={s.cardImg} src={city.image} alt="" />
      <div className={s.cardName}>{city.name}</div>
      <WeatherGlyph className={s.cardGlyph} code={city.code} base={ICON_BASE} size={58} />
      <div className={s.cardTemp}>{tempPair(city.highC, city.lowC, unit)}</div>
      <div className={s.cardCond}>{city.condition}</div>
    </article>
  );
}

function CityRow({ city, unit }: { city: WeatherCity; unit: Unit }) {
  return (
    <div className={s.row}>
      <WeatherGlyph code={city.code} base={ICON_BASE} size={40} />
      <div className={s.rowText}>
        <div className={s.rowName}>{city.name}</div>
        <div className={s.rowCond}>{city.condition}</div>
      </div>
      <div className={s.rowTemp}>{tempPair(city.highC, city.lowC, unit)}</div>
    </div>
  );
}

// ── Sub-view: 5-Day Forecast ──────────────────────────────────────────────
function ForecastView({ w, unit, setUnit, onBack }: {
  w: WeatherContent; unit: Unit; setUnit: (u: Unit) => void; onBack: () => void;
}) {
  const { t } = useI18n();
  const { hero, forecast, news } = w;
  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <button type="button" className={s.back} onClick={onBack}>
          <Icon name="chevron-left" size={18} strokeWidth={2} color="currentColor" />
          {t("weather.back")}
        </button>
      </div>

      <div className={s.wrap}>
        <section className={s.fcHero}>
          <img className={s.heroImg} src={hero.image} alt="" />
          <div className={s.fcHeroText}>
            <div className={s.fcKicker}>{t("weather.forecastTitle")}</div>
            <h1 className={s.fcCity}>{hero.city}</h1>
          </div>
        </section>
      </div>

      <div className={s.wrap}>
        <div className={s.fcHead}>
          <h2 className={s.fcTitle}>{t("weather.forecastTitle")}</h2>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>
      </div>

      <div className={s.wrap}>
        <div className={s.forecast}>
          {forecast.map((f: ForecastDay) => (
            <div key={f.day} className={s.fcDay}>
              <div className={s.fcDayName}>{f.day}</div>
              <WeatherGlyph code={f.code} base={ICON_BASE} size={72} />
              <div className={s.fcDayTemp}>{tempPair(f.highC, f.lowC, unit)}</div>
              <div className={s.fcDayCond}>{f.condition}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.wrap}>
        <div className={s.newsGrid}>
          <div className={s.radar}>
            <img className={s.radarImg} src={w.radarImage} alt="" />
            <span className={s.radarLabel}>{t("weather.radar")}</span>
          </div>
          <div>
            <h2 className={s.newsTitle}>{t("weather.newsTitle", { city: hero.city })}</h2>
            <div className={s.newsList}>
              {news.map((n, i) => (
                <div key={n.id}>
                  <NewsItem image={n.image} headline={n.headline} timestamp={n.timeAgo} />
                  {i < news.length - 1 && <div className={s.newsDivider} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Weather() {
  const { t } = useI18n();
  const w = getWeatherContent(t);

  // Deep-link support: /weather?view=forecast opens the destination's 5-day
  // forecast directly (e.g. from the Showcase weather tile).
  const [params] = useSearchParams();
  const [view, setView] = useState<"gallery" | "forecast">(
    params.get("view") === "forecast" ? "forecast" : "gallery",
  );
  const [unit, setUnit] = useState<Unit>("F");

  return view === "forecast" ? (
    <ForecastView w={w} unit={unit} setUnit={setUnit} onBack={() => setView("gallery")} />
  ) : (
    <GalleryView w={w} unit={unit} setUnit={setUnit} onForecast={() => setView("forecast")} />
  );
}
