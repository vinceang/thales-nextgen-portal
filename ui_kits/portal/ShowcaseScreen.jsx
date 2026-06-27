// ShowcaseScreen — the configurable bento hub, expressed as ONE BentoGrid (named
// grid-template-areas). Mobile-first: a single-column stack on phone re-places the
// same named regions into the asymmetric desktop composition. Tiles are primarily 2:1.
(function () {
  const DS = window.ThalesNextGenPortalDesignSystem_87a801;
  const { HeroBanner, ShowcaseTile, WeatherTile, BentoGrid } = DS;

  // A 2:1 media tile.
  function Tile({ t, titleSize }) {
    return (
      <div style={{ aspectRatio: "2 / 1" }}>
        <ShowcaseTile image={t.img} kicker={t.kicker} title={t.title} titleSize={titleSize || 24} height="100%" />
      </div>
    );
  }

  function ShowcaseScreen({ data, onOpenPlans }) {
    const s = data.showcase;
    const byId = Object.fromEntries(s.tiles.map((t) => [t.id, t]));

    const items = {
      // Row 1 — big hero (spans) + a stacked promo rail
      hero: (
        <div style={{ aspectRatio: "2 / 1" }}>
          <HeroBanner image={s.hero.img} kicker={s.hero.kicker} title={s.hero.title} ctaLabel={s.hero.cta} onCta={onOpenPlans} height="100%" />
        </div>
      ),
      rail: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
          <div style={{ flex: 1, minHeight: 120 }}><ShowcaseTile image={byId["young-sheldon"].img} kicker="Watch" title="Young Sheldon" titleSize={22} height="100%" /></div>
          <div style={{ flex: 1, minHeight: 120 }}><ShowcaseTile image={byId["billie"].img} kicker="Listen" title="Billie Eilish" titleSize={22} height="100%" /></div>
        </div>
      ),
      // Row 2 — four 2:1 tiles
      sq: <Tile t={byId["squid"]} />,
      rm: <Tile t={byId["red-moon"]} />,
      gm: <Tile t={byId["games"]} />,
      dn: <Tile t={byId["dining"]} titleSize={22} />,
      // Row 3 — feature destination (spans) + weather panel
      ep: (
        <div style={{ aspectRatio: "2 / 1" }}>
          <ShowcaseTile image={byId["epcot"].img} kicker={byId["epcot"].kicker} title={byId["epcot"].title} titleSize={44} height="100%" />
        </div>
      ),
      wx: (
        <div style={{ background: "var(--color-black)", height: "100%", minHeight: 220 }}>
          <WeatherTile {...data.weather} iconSrc={`../../assets/icons/weather/${data.weather.code}.svg`} onLink={() => {}} />
        </div>
      ),
      // Row 4 — four 2:1 tiles
      en: <Tile t={byId["england"]} titleSize={22} />,
      df: <Tile t={byId["duty-free"]} titleSize={22} />,
      fg: <Tile t={byId["fall-guy"]} />,
      eb: <Tile t={byId["ebooks"]} titleSize={22} />,
    };

    return (
      <div style={{ padding: 16, maxWidth: 1320, margin: "0 auto" }}>
        <BentoGrid
          gap={16}
          items={items}
          phone={{
            columns: "1fr",
            areas: ["hero", "rail", "sq", "rm", "gm", "dn", "ep", "wx", "en", "df", "fg", "eb"],
          }}
          tablet={{
            columns: "1fr 1fr",
            areas: [
              "hero hero",
              "rail rail",
              "sq rm",
              "gm dn",
              "ep ep",
              "wx wx",
              "en df",
              "fg eb",
            ],
          }}
          desktop={{
            columns: "repeat(12, 1fr)",
            areas: [
              "hero hero hero hero hero hero hero hero rail rail rail rail",
              "sq sq sq rm rm rm gm gm gm dn dn dn",
              "ep ep ep ep ep ep ep ep wx wx wx wx",
              "en en en df df df fg fg fg eb eb eb",
            ],
          }}
        />
      </div>
    );
  }

  window.ShowcaseScreen = ShowcaseScreen;
})();
