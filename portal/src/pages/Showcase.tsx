import { useNavigate } from "react-router-dom";
import {
  HeroBanner,
  ShowcaseTile,
  WeatherTile,
  BentoGrid,
} from "../design-system/components";
import s from "./Showcase.module.css";

/* ── Sample data (no backend) ──────────────────────────────────────────────
   The Showcase is the configurable bento hub — one BentoGrid of named regions.
   See ui_kits/portal/ShowcaseScreen.jsx for the reference composition. */

interface TileData {
  id: string;
  img: string;
  kicker: string;
  title: string;
}

const HERO = {
  img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80",
  kicker: "Connect",
  title: "High-Speed Wi-Fi for the Whole Flight",
  cta: "View Plans",
};

const TILES: TileData[] = [
  { id: "young-sheldon", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=700&q=80", kicker: "Watch", title: "Young Sheldon" },
  { id: "billie", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80", kicker: "Listen", title: "Billie Eilish" },
  { id: "squid", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=80", kicker: "Watch", title: "Squid Game" },
  { id: "red-moon", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=80", kicker: "Listen", title: "Red Moon In Venus" },
  { id: "games", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&q=80", kicker: "Play", title: "Arcade Classics" },
  { id: "dining", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", kicker: "Destination", title: "Top 10 Dining" },
  { id: "epcot", img: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&q=80", kicker: "Destination", title: "Orlando's Best: Epcot" },
  { id: "england", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700&q=80", kicker: "Travel", title: "Explore England" },
  { id: "duty-free", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80", kicker: "Shop", title: "Duty-Free Picks" },
  { id: "fall-guy", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700&q=80", kicker: "Watch", title: "The Fall Guy" },
  { id: "ebooks", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&q=80", kicker: "Read", title: "Bestselling eBooks" },
];

const WEATHER = {
  code: 3,
  date: "Tue, Jul 4",
  city: "Orlando",
  temp: "79.5°",
  unit: "F",
  condition: "Partly Sunny",
  linkLabel: "5-Day Forecast",
};

const byId = Object.fromEntries(TILES.map((t) => [t.id, t]));

/* ── Page ──────────────────────────────────────────────────────────────── */

// A 2:1 media tile — BentoGrid controls the cell width, aspect-ratio sets height.
function Tile({ t, titleSize = 24 }: { t: TileData; titleSize?: number }) {
  return (
    <div className={s.tile21}>
      <ShowcaseTile image={t.img} kicker={t.kicker} title={t.title} titleSize={titleSize} height="100%" />
    </div>
  );
}

export default function Showcase() {
  const navigate = useNavigate();

  const items = {
    // Row 1 — big hero (spans) + two promo cells (r1/r2)
    hero: (
      <div className={s.heroCell}>
        <HeroBanner
          image={HERO.img}
          kicker={HERO.kicker}
          title={HERO.title}
          ctaLabel={HERO.cta}
          ctaArrow
          height="100%"
          onCta={() => navigate("/connect")}
        />
      </div>
    ),
    r1: <Tile t={byId["young-sheldon"]} titleSize={22} />,
    r2: <Tile t={byId["billie"]} titleSize={22} />,
    // Row 2 — four 2:1 tiles
    sq: <Tile t={byId["squid"]} />,
    rm: <Tile t={byId["red-moon"]} />,
    gm: <Tile t={byId["games"]} />,
    dn: <Tile t={byId["dining"]} titleSize={22} />,
    // Row 3 — feature destination (spans) + weather panel
    ep: (
      <div className={s.tile21}>
        <ShowcaseTile image={byId["epcot"].img} kicker={byId["epcot"].kicker} title={byId["epcot"].title} titleSize={44} height="100%" />
      </div>
    ),
    wx: (
      <div className={s.weatherCell}>
        <WeatherTile {...WEATHER} iconSrc={`/assets/icons/weather/${WEATHER.code}.svg`} onLink={() => navigate("/weather")} />
      </div>
    ),
    // Row 4 — four 2:1 tiles
    en: <Tile t={byId["england"]} titleSize={22} />,
    df: <Tile t={byId["duty-free"]} titleSize={22} />,
    fg: <Tile t={byId["fall-guy"]} />,
    eb: <Tile t={byId["ebooks"]} titleSize={22} />,
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
