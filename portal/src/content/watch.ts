// Watch (media gallery) page content.
//
// The SEAM a future data source populates (ADR 0001). Today it returns a static
// placeholder catalogue from Unsplash; the planned **TMDB** integration will
// return this same shape (hero slides + genre rows of poster items) and the page
// won't change. Proper-noun titles stay verbatim across locales; only chrome
// (kickers, CTAs, row/genre labels) comes from the i18n dictionary via `t`.
import type { TFunc } from "../i18n";

export interface WatchMovie {
  /** Stable id (React key + future TMDB id). */
  id: string;
  title: string;
  /** Portrait (2:3) poster URL. */
  poster: string;
}

export interface WatchRow {
  /** Genre/category key — also the GenrePill filter value. */
  key: string;
  label: string;
  items: WatchMovie[];
}

export interface WatchHero {
  slides: { id: string; image: string; kicker: string; title: string; ctaLabel: string }[];
  /** White-label: tenants can disable or retune the marquee rotation. */
  autoPlay: boolean;
  intervalMs: number;
}

export interface WatchContent {
  hero: WatchHero;
  rows: WatchRow[];
}

// Placeholder art (Unsplash). Portrait crop for posters, wide crop for the hero.
const poster = (id: string) => `https://images.unsplash.com/photo-${id}?w=300&h=450&fit=crop&q=80`;
const backdrop = (id: string) => `https://images.unsplash.com/photo-${id}?w=1280&h=620&fit=crop&q=80`;

const IDS = [
  "1522869635100-9f4c5e86aa37",
  "1493225457124-a3eb161ffa5f",
  "1489599849927-2ee91cede3ba",
  "1470225620780-dba8ba36b745",
  "1511512578047-dfb367046420",
  "1414235077428-338989a2e8c0",
  "1597466599360-3b9775841aec",
  "1454496522488-7a8e488e8606",
  "1483985988355-763728e1935b",
  "1485846234645-a62644f84728",
  "1495020689067-958852a7765e",
  "1500530855697-b586d89ba3ee",
];

// Invented titles — placeholder stand-ins until TMDB provides the real catalogue.
const TITLES = [
  "Midnight Horizon",
  "Paper Tigers",
  "The Glass City",
  "Echoes of Tomorrow",
  "Northbound",
  "Saltwater",
  "Ember & Ash",
  "The Long Quiet",
  "Hollow Crown",
  "Vermilion",
  "Static Bloom",
  "Afterlight",
];

const POOL: WatchMovie[] = IDS.map((id, i) => ({ id: `m${i + 1}`, title: TITLES[i], poster: poster(id) }));

// Reuse the pool across rows in a different order so each shelf looks distinct.
const rotate = (n: number) => POOL.slice(n).concat(POOL.slice(0, n));

export function getWatchContent(t: TFunc): WatchContent {
  return {
    hero: {
      autoPlay: true,
      intervalMs: 6000,
      slides: [
        { id: "h1", image: backdrop("1489599849927-2ee91cede3ba"), kicker: t("watch.featured"), title: "Echoes of Tomorrow", ctaLabel: t("watch.play") },
        { id: "h2", image: backdrop("1470225620780-dba8ba36b745"), kicker: t("watch.featured"), title: "Northbound", ctaLabel: t("watch.play") },
        { id: "h3", image: backdrop("1500530855697-b586d89ba3ee"), kicker: t("watch.featured"), title: "Afterlight", ctaLabel: t("watch.play") },
      ],
    },
    rows: [
      { key: "trending", label: t("watch.rows.trending"), items: rotate(0).slice(0, 10) },
      { key: "newReleases", label: t("watch.rows.newReleases"), items: rotate(3) },
      { key: "action", label: t("watch.rows.action"), items: rotate(6) },
      { key: "comedy", label: t("watch.rows.comedy"), items: rotate(9) },
      { key: "scifi", label: t("watch.rows.scifi"), items: rotate(2) },
      { key: "drama", label: t("watch.rows.drama"), items: rotate(5) },
      { key: "documentary", label: t("watch.rows.documentary"), items: rotate(8) },
    ],
  };
}
