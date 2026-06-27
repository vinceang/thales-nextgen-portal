import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroBanner,
  CarouselDots,
  GenrePill,
  TileGrid,
  ShowcaseTile,
  Skeleton,
  EmptyState,
} from "../design-system/components";

/* ── Sample data (no backend) ──────────────────────────────────────────── */

const IMG = {
  hero: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80",
  heroFilm: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
  heroMusic: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
  heroDest: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  ys: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=700&q=80",
  billie: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80",
  news: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&q=80",
  epcot: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&q=80",
  dining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  england: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
};

interface Promo {
  image: string;
  kicker: string;
  title: string;
}

const PROMOS: Promo[] = [
  { image: IMG.hero, kicker: "Connect", title: "High-Speed Wi-Fi for the Whole Flight" },
  { image: IMG.heroFilm, kicker: "Watch", title: "New Releases, Streaming at 35,000 ft" },
  { image: IMG.heroMusic, kicker: "Listen", title: "Curated Playlists for Every Mile" },
  { image: IMG.heroDest, kicker: "Destination", title: "Plan Your Landing in Orlando" },
];

// CTA destination + label derived from the promo's kicker, so each hero sends the
// passenger to the matching section (Watch → /watch, Listen → /listen, …).
const KICKER_CTA: Record<string, { path: string; label: string }> = {
  Connect: { path: "/connect", label: "View Plans" },
  Watch: { path: "/watch", label: "Watch" },
  Listen: { path: "/listen", label: "Listen" },
  Read: { path: "/news", label: "Read" },
  News: { path: "/news", label: "Read" },
  Destination: { path: "/weather", label: "Forecast" },
  Travel: { path: "/weather", label: "Forecast" },
};
const CTA_FALLBACK = { path: "/connect", label: "Explore" };

const CATS = ["All", "Movies", "TV", "Music", "Destinations", "News"];

interface Tile {
  key: string;
  image: string;
  kicker: string;
  title: string;
  cats: string[];
}

const FEATURED: Tile[] = [
  { key: "ys", image: IMG.ys, kicker: "Watch", title: "Young Sheldon", cats: ["TV"] },
  { key: "billie", image: IMG.billie, kicker: "Listen", title: "Billie Eilish — Live", cats: ["Music"] },
  { key: "news", image: IMG.news, kicker: "Read", title: "Today's Headlines", cats: ["News"] },
];

const DESTINATIONS: Tile[] = [
  { key: "epcot", image: IMG.epcot, kicker: "Destination", title: "Orlando", cats: ["Destinations"] },
  { key: "dining", image: IMG.dining, kicker: "Destination", title: "Dining", cats: ["Destinations"] },
  { key: "england", image: IMG.england, kicker: "Travel", title: "England", cats: ["Destinations"] },
  { key: "beach", image: IMG.beach, kicker: "Destination", title: "Beaches", cats: ["Destinations"] },
];

const AUTO_ADVANCE_MS = 6000;

/* ── Building blocks ───────────────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "var(--fs-h2)",
        color: "var(--color-white)",
        margin: "0 0 16px",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function matches(tile: Tile, cat: string) {
  return cat === "All" || tile.cats.includes(cat);
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function Showcase() {
  const navigate = useNavigate();
  const [cat, setCat] = useState("All");
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate the catalogue service loading so Skeletons get exercised.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Auto-advance the hero promos (~6s), paused on hover.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % PROMOS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const promo = PROMOS[slide];
  const cta = KICKER_CTA[promo.kicker] ?? CTA_FALLBACK;
  const featured = FEATURED.filter((t) => matches(t, cat));
  const destinations = DESTINATIONS.filter((t) => matches(t, cat));

  return (
    <div style={{ minHeight: 900 }}>
      {/* 2 — hero with rotating promos */}
      <section
        style={{ padding: "var(--space-lg) var(--space-lg) 0" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <HeroBanner
          image={promo.image}
          kicker={promo.kicker}
          title={promo.title}
          ctaLabel={cta.label}
          ctaArrow
          height={360}
          onCta={() => navigate(cta.path)}
        />
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 0" }}>
          <CarouselDots count={PROMOS.length} active={slide} onSelect={setSlide} />
        </div>
      </section>

      {/* 3 — category filter pills (one active at a time) */}
      <section style={{ padding: "var(--space-lg) var(--space-lg) var(--space-md)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            overflowX: "auto",
            paddingBlockStart: 8,
            scrollbarWidth: "none",
          }}
        >
          {CATS.map((c) => (
            <GenrePill key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </GenrePill>
          ))}
        </div>
      </section>

      {/* 4 — Featured Now: 3-up */}
      <section style={{ padding: "0 var(--space-lg) var(--space-xl)" }}>
        <SectionTitle>Featured Now</SectionTitle>
        {loading ? (
          <TileGrid columns={3} tablet={2} phone={1} gap={16}>
            {FEATURED.map((t) => (
              <Skeleton key={t.key} variant="block" width="100%" height={220} />
            ))}
          </TileGrid>
        ) : featured.length ? (
          <TileGrid columns={3} tablet={2} phone={1} gap={16}>
            {featured.map((t) => (
              <ShowcaseTile
                key={t.key}
                image={t.image}
                kicker={t.kicker}
                title={t.title}
                titleSize={26}
                height={220}
                onClick={() => {}}
              />
            ))}
          </TileGrid>
        ) : (
          <EmptyState title="Nothing featured here" message={`No featured items in “${cat}”.`} />
        )}
      </section>

      {/* 5 — Destinations: 4-up, smaller tiles */}
      <section style={{ padding: "0 var(--space-lg) var(--space-2xl)" }}>
        <SectionTitle>Destinations</SectionTitle>
        {loading ? (
          <TileGrid columns={4} tablet={2} phone={1} gap={16}>
            {DESTINATIONS.map((t) => (
              <Skeleton key={t.key} variant="block" width="100%" height={170} />
            ))}
          </TileGrid>
        ) : destinations.length ? (
          <TileGrid columns={4} tablet={2} phone={1} gap={16}>
            {destinations.map((t) => (
              <ShowcaseTile
                key={t.key}
                image={t.image}
                kicker={t.kicker}
                title={t.title}
                titleSize={20}
                height={170}
                onClick={() => {}}
              />
            ))}
          </TileGrid>
        ) : (
          <EmptyState title="No destinations" message={`No destinations in “${cat}”.`} />
        )}
      </section>
    </div>
  );
}
