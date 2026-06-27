// WeatherScreen — Weather LANDING page: destination hero + city gallery, with the
// 5-Day Forecast as a sub-view reached from the hero button.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { WeatherGlyph, NewsItem } = DS;
  const ICON_BASE = "../../assets/icons/weather";

  function useIsPhone() {
    const q = "(max-width: 560px)";
    const [m, setM] = React.useState(() => window.matchMedia(q).matches);
    React.useEffect(() => {
      const mq = window.matchMedia(q);
      const fn = (e) => setM(e.matches);
      mq.addEventListener("change", fn);
      return () => mq.removeEventListener("change", fn);
    }, []);
    return m;
  }

  // ── Unit toggle (°F / °C) ───────────────────────────────────────────────
  function UnitToggle({ unit, setUnit }) {
    return (
      <div style={{ display: "flex" }}>
        {["F", "C"].map((u) => (
          <button key={u} onClick={() => setUnit(u)} style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, padding: "9px 18px",
            cursor: "pointer", border: "none",
            background: unit === u ? "var(--color-highlight-blue)" : "var(--color-black)",
            color: "#fff", transition: "background 0.25s cubic-bezier(0.44,0,0.56,1)",
          }}>°{u}</button>
        ))}
      </div>
    );
  }

  // ── Landing hero — destination city ─────────────────────────────────────
  function Hero({ hero, onForecast }) {
    return (
      <div style={{ position: "relative", minHeight: 440, overflow: "hidden", background: "var(--color-surface-2)" }}>
        <img src={hero.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,15,19,0.55) 0%, rgba(12,15,19,0.15) 35%, rgba(12,15,19,0.25) 100%)" }} />
        <div className="wxh-inner" style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "56px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 64, letterSpacing: "-0.03em", color: "#fff", lineHeight: 0.98, margin: 0, textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}>
              {hero.city}
            </h1>
            <img src="../../assets/logos/accuweather-light.svg" alt="AccuWeather" style={{ height: 17, display: "block", margin: "14px 0 26px", opacity: 0.92 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <WeatherGlyph code={hero.code} base={ICON_BASE} fb={hero.fb} size={88} />
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 40, color: "#fff", letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
                {hero.tempC} C/{hero.tempF}F
              </div>
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.92)", marginTop: 14, fontWeight: 500, textShadow: "0 1px 16px rgba(0,0,0,0.5)" }}>
              {hero.condition}
            </div>
          </div>
          <button onClick={onForecast} className="wxh-cta" style={{
            flex: "none", marginTop: 8, background: "var(--color-highlight-blue)", color: "#fff",
            border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", padding: "16px 26px",
            transition: "background 0.25s cubic-bezier(0.44,0,0.56,1)",
          }}>5 Day Forecast</button>
        </div>
      </div>
    );
  }

  // ── City gallery card (desktop / tablet) ────────────────────────────────
  function CityCard({ city, unit }) {
    return (
      <div style={{ position: "relative", overflow: "hidden", background: "var(--color-black)", aspectRatio: "3 / 4", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 12px 18px", gap: 10 }}>
        <img src={city.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,10,13,0.35) 0%, rgba(8,10,13,0.78) 100%)" }} />
        <div style={{ position: "relative", fontWeight: 700, fontSize: 14, letterSpacing: "0.05em", textTransform: "uppercase", color: "#fff" }}>{city.name}</div>
        <div style={{ position: "relative", margin: "auto 0" }}>
          <WeatherGlyph code={city.code} base={ICON_BASE} fb={city.fb} size={58} />
        </div>
        <div style={{ position: "relative", fontSize: 15, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
          {unit === "C" ? `${city.c} C` : `${city.f} F`}
        </div>
        <div style={{ position: "relative", fontSize: 12.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.3, textWrap: "balance" }}>{city.cond}</div>
      </div>
    );
  }

  // ── City gallery row (phone list) ───────────────────────────────────────
  function CityRow({ city, unit, last }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 4px", borderBottom: last ? "none" : "1px solid var(--color-border)" }}>
        <WeatherGlyph code={city.code} base={ICON_BASE} fb={city.fb} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff" }}>{city.name}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.66)", marginTop: 2 }}>{city.cond}</div>
        </div>
        <div style={{ flex: "none", fontSize: 14, color: "rgba(255,255,255,0.92)", fontVariantNumeric: "tabular-nums" }}>
          {unit === "C" ? `${city.c} C` : `${city.f} F`}
        </div>
      </div>
    );
  }

  // ── Landing view ────────────────────────────────────────────────────────
  function GalleryView({ w, unit, setUnit, onForecast, isPhone }) {
    return (
      <div>
        <Hero hero={w.hero} onForecast={onForecast} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "22px 0" }}>
            <UnitToggle unit={unit} setUnit={setUnit} />
          </div>
          {isPhone ? (
            <div style={{ marginBottom: 16 }}>
              {w.cities.map((c, i) => (
                <CityRow key={c.name} city={c} unit={unit} last={i === w.cities.length - 1} />
              ))}
            </div>
          ) : (
            <div className="wxg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 16 }}>
              {w.cities.map((c) => <CityCard key={c.name} city={c} unit={unit} />)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── 5-Day Forecast sub-view ─────────────────────────────────────────────
  function ForecastView({ w, unit, setUnit, onBack }) {
    return (
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: 16 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "var(--color-bright-blue)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, padding: "8px 0", marginBottom: 8 }}>
          <DS.Icon name="chevron-left" size={18} strokeWidth={2} color="currentColor" /> Weather
        </button>

        <div style={{ position: "relative", minHeight: 240, overflow: "hidden", background: "var(--color-surface-2)" }}>
          <img src={w.hero.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,15,19,0.5), rgba(12,15,19,0.2))" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.12em", color: "var(--color-bright-blue)", textTransform: "uppercase" }}>5-Day Forecast</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 52, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.05, textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
              {w.hero.city}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "28px 0 20px" }}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 26, color: "#fff", margin: 0 }}>5-Day Forecast</h2>
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>

        <div className="wxg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {w.forecast.map((f) => (
            <div key={f.day} style={{ background: "var(--color-black)", padding: "26px 12px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.78)" }}>{f.day}</div>
              <WeatherGlyph code={f.code} base={ICON_BASE} fb={f.fb} size={72} />
              <div style={{ fontSize: 26, fontWeight: 300, fontVariantNumeric: "tabular-nums", color: "#fff" }}>
                {unit === "F" ? f.temp : toC(f.temp)}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{f.cond}</div>
            </div>
          ))}
        </div>

        <div className="wx-news" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 40, marginTop: 40, alignItems: "start" }}>
          <div>
            <div style={{ aspectRatio: "4 / 3", background: "linear-gradient(135deg,#1b2a3a,#244b6e)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1561553543-e4c7b608b98d?w=700&q=80&auto=format&fit=crop" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
              <span style={{ position: "relative", fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>Live Doppler Radar</span>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "#fff", margin: "0 0 20px" }}>
              Weather News for {w.hero.city}
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {w.news.map((it, i) => (
                <React.Fragment key={i}>
                  <NewsItem image={it.img} headline={it.headline} timestamp={it.time} />
                  {i < w.news.length - 1 && <div style={{ height: 1, background: "var(--color-border)", margin: "16px 0" }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function WeatherScreen({ data }) {
    const w = data.weather;
    const [view, setView] = React.useState("gallery");
    const [unit, setUnit] = React.useState("F");
    const isPhone = useIsPhone();

    return view === "forecast"
      ? <ForecastView w={w} unit={unit} setUnit={setUnit} onBack={() => setView("gallery")} />
      : <GalleryView w={w} unit={unit} setUnit={setUnit} onForecast={() => setView("forecast")} isPhone={isPhone} />;
  }

  function toC(fStr) {
    const m = parseFloat(String(fStr).replace(/[^\d.-]/g, ""));
    if (isNaN(m)) return fStr;
    return `${Math.round(((m - 32) * 5) / 9 * 10) / 10}° C`;
  }

  window.WeatherScreen = WeatherScreen;
})();
