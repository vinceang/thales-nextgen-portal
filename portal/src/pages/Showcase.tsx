import { useNavigate } from "react-router-dom";
import {
  HeroBanner,
  ShowcaseTile,
  WeatherTile,
  BentoGrid,
} from "../design-system/components";
import { useI18n, type TFunc } from "../i18n";
import s from "./Showcase.module.css";

/* ── Sample data (no backend) ──────────────────────────────────────────────
   The Showcase is the configurable bento hub — one BentoGrid of named regions.
   Non-localizable data (images, category key) lives here; titles and kickers are
   resolved per-locale via t() (keys: showcase.tiles.<id>, categories.<cat>). */

interface TileData {
  id: string;
  img: string;
  /** Category key → kicker via t(`categories.${cat}`). */
  cat: string;
}

const HERO_IMG = "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80";

const TILES: TileData[] = [
  { id: "young-sheldon", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=700&q=80", cat: "watch" },
  { id: "billie", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80", cat: "listen" },
  { id: "squid", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=80", cat: "watch" },
  { id: "red-moon", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=80", cat: "listen" },
  { id: "games", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&q=80", cat: "play" },
  { id: "dining", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", cat: "destination" },
  { id: "epcot", img: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&q=80", cat: "destination" },
  { id: "england", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700&q=80", cat: "travel" },
  { id: "duty-free", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80", cat: "shop" },
  { id: "fall-guy", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700&q=80", cat: "watch" },
  { id: "ebooks", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&q=80", cat: "read" },
];

const WEATHER_CODE = 3;

const byId = Object.fromEntries(TILES.map((t) => [t.id, t]));

/* ── Page ──────────────────────────────────────────────────────────────── */

// A 2:1 media tile — BentoGrid controls the cell width, aspect-ratio sets height.
function Tile({ t, tr, titleSize = 24 }: { t: TileData; tr: TFunc; titleSize?: number }) {
  return (
    <div className={s.tile21}>
      <ShowcaseTile
        image={t.img}
        kicker={tr(`categories.${t.cat}`)}
        title={tr(`showcase.tiles.${t.id}`)}
        titleSize={titleSize}
        height="100%"
      />
    </div>
  );
}

export default function Showcase() {
  const navigate = useNavigate();
  const { t: tr } = useI18n();

  const items = {
    // Row 1 — big hero (spans) + two promo cells (r1/r2)
    hero: (
      <div className={s.heroCell}>
        <HeroBanner
          image={HERO_IMG}
          kicker={tr("categories.connect")}
          title={tr("showcase.hero.title")}
          ctaLabel={tr("showcase.hero.cta")}
          ctaArrow
          height="100%"
          onCta={() => navigate("/connect")}
        />
      </div>
    ),
    r1: <Tile t={byId["young-sheldon"]} tr={tr} titleSize={22} />,
    r2: <Tile t={byId["billie"]} tr={tr} titleSize={22} />,
    // Row 2 — four 2:1 tiles
    sq: <Tile t={byId["squid"]} tr={tr} />,
    rm: <Tile t={byId["red-moon"]} tr={tr} />,
    gm: <Tile t={byId["games"]} tr={tr} />,
    dn: <Tile t={byId["dining"]} tr={tr} titleSize={22} />,
    // Row 3 — feature destination (spans) + weather panel
    ep: (
      <div className={s.tile21}>
        <ShowcaseTile
          image={byId["epcot"].img}
          kicker={tr(`categories.${byId["epcot"].cat}`)}
          title={tr("showcase.tiles.epcot")}
          titleSize={44}
          height="100%"
        />
      </div>
    ),
    wx: (
      <div className={s.weatherCell}>
        <WeatherTile
          code={WEATHER_CODE}
          date={tr("showcase.weather.date")}
          city={tr("showcase.weather.city")}
          temp="79.5°"
          unit="F"
          condition={tr("showcase.weather.condition")}
          linkLabel={tr("showcase.weather.linkLabel")}
          iconSrc={`/assets/icons/weather/${WEATHER_CODE}.svg`}
          onLink={() => navigate("/weather")}
        />
      </div>
    ),
    // Row 4 — four 2:1 tiles
    en: <Tile t={byId["england"]} tr={tr} titleSize={22} />,
    df: <Tile t={byId["duty-free"]} tr={tr} titleSize={22} />,
    fg: <Tile t={byId["fall-guy"]} tr={tr} />,
    eb: <Tile t={byId["ebooks"]} tr={tr} titleSize={22} />,
  };

  return (
    <div className={s.page}>
      <BentoGrid
        gap={16}
        items={items}
        phone={{
          columns: "1fr",
          areas: ["hero", "r1", "r2", "sq", "rm", "gm", "dn", "ep", "wx", "en", "df", "fg", "eb"],
        }}
        tablet={{
          columns: "1fr 1fr",
          areas: ["hero hero", "r1 r2", "sq rm", "gm dn", "ep ep", "wx wx", "en df", "fg eb"],
        }}
        desktop={{
          columns: "repeat(12, 1fr)",
          areas: [
            "hero hero hero hero hero hero hero hero r1 r1 r1 r1",
            "hero hero hero hero hero hero hero hero r2 r2 r2 r2",
            "sq sq sq rm rm rm gm gm gm dn dn dn",
            "ep ep ep ep ep ep ep ep wx wx wx wx",
            "en en en df df df fg fg fg eb eb eb",
          ],
        }}
      />
    </div>
  );
}
