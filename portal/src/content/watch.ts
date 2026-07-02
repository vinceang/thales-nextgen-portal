// Watch (media gallery) page content.
//
// The SEAM a future data source populates (ADR 0001). Today it returns a static
// placeholder catalogue from Unsplash; the planned **TMDB** integration will
// return this same shape (hero slides + genre rows of poster items) and the page
// won't change. Proper-noun titles stay verbatim across locales; only chrome
// (kickers, CTAs, row/genre labels) comes from the i18n dictionary via `t`.
import type { TFunc } from "../i18n";

/** One billed cast member (photo optional — initials avatar until TMDB supplies profiles). */
export interface CastMember {
  id: string;
  name: string;
  character: string;
  photo?: string;
}

export interface WatchMovie {
  /** Stable id (React key + future TMDB id). */
  id: string;
  title: string;
  /** Portrait (2:3) poster URL. */
  poster: string;
  // ── Detail metadata (populates the MediaDetailModal; TMDB later) ──────────
  /** Release year. */
  year: number;
  /** Certification / content rating, e.g. "R", "PG-13". */
  certification: string;
  /** Localized release-date string, e.g. "05/15/2026 (US)". */
  releaseDate: string;
  /** Genre list, comma-joined (verbatim data, not i18n). */
  genres: string;
  /** Runtime, e.g. "1h 49m". */
  runtime: string;
  /** User score, 0–100. */
  score: number;
  /** One-line tagline. */
  tagline: string;
  /** Synopsis paragraph. */
  overview: string;
  /** Lead crew credit (director / writer). */
  director: string;
  /** Top billed cast. */
  cast: CastMember[];
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

// Invented crew/cast — placeholder stand-ins until TMDB provides real credits.
const ACTORS = [
  "Ava Sinclair", "Marcus Vell", "Nadia Okafor", "Elias Rho", "Priya Chandra", "Tomas Berg",
  "Lena Whitfield", "Kofi Mensah", "Sofia Marchetti", "Daniel Kwon", "Ines Delacroix", "Roman Petrov",
];
const CHARACTERS = [
  "Detective Ray Malone", "Dr. Helen Frost", "The Stranger", "Captain Ada Voss", "Eli Barnes",
  "Marguerite", "Sgt. Cole", "Dr. Yusuf Amari", "June Hollis", "The Warden", "Nico", "Clara Vane",
];

// Five billed cast, rotated from the pools so each film reads distinctly.
function makeCast(seed: number): CastMember[] {
  return Array.from({ length: 5 }, (_, k) => {
    const a = (seed + k) % ACTORS.length;
    const c = (seed * 2 + k) % CHARACTERS.length;
    return { id: `c${seed}-${k}`, name: ACTORS[a], character: CHARACTERS[c] };
  });
}

// Per-title detail metadata, parallel to TITLES. Plausible placeholder values a
// real TMDB response will replace (same WatchMovie shape).
interface MovieDetail {
  year: number; certification: string; releaseDate: string; genres: string;
  runtime: string; score: number; tagline: string; overview: string; director: string;
}
const DETAILS: MovieDetail[] = [
  { year: 2026, certification: "R", releaseDate: "05/15/2026 (US)", genres: "Horror, Thriller", runtime: "1h 49m", score: 81, tagline: "Be careful who you wish for…", overview: "After breaking the mysterious \"One Wish Willow\" to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for — but soon discovers that some desires come at a dark, sinister price.", director: "Curry Barker" },
  { year: 2025, certification: "PG-13", releaseDate: "11/07/2025 (US)", genres: "Drama, Mystery", runtime: "2h 04m", score: 74, tagline: "Everyone is bluffing.", overview: "Two rival negotiators are locked in a corporate standoff that unravels into a game of deception, each convinced the other is running a con — until the line between strategy and survival disappears.", director: "Marina Lowe" },
  { year: 2026, certification: "PG-13", releaseDate: "02/20/2026 (US)", genres: "Sci-Fi, Drama", runtime: "2h 18m", score: 88, tagline: "Nothing here is what it seems.", overview: "In a city built entirely of glass, an architect begins to notice that the reflections no longer match the world around her — and pulling on that thread threatens to shatter everything she believes is real.", director: "Idris Vale" },
  { year: 2024, certification: "PG", releaseDate: "08/09/2024 (US)", genres: "Adventure, Family", runtime: "1h 57m", score: 79, tagline: "The future is calling.", overview: "A young inventor discovers a device that receives messages from her own future, and must decide how much of tomorrow she is willing to change to save the people she loves today.", director: "Hana Fischer" },
  { year: 2025, certification: "R", releaseDate: "09/26/2025 (US)", genres: "Thriller, Action", runtime: "1h 52m", score: 71, tagline: "There's no road back.", overview: "A long-haul driver takes one last job across a frozen highway and realizes too late that the cargo — and the people hunting it — will follow him all the way north.", director: "Owen Marsh" },
  { year: 2026, certification: "PG-13", releaseDate: "06/12/2026 (US)", genres: "Romance, Drama", runtime: "2h 06m", score: 83, tagline: "Some tides never turn.", overview: "Returning to the coastal town she left as a teenager, a marine biologist reconnects with a first love and confronts the choice that carried her away all those summers ago.", director: "Celeste Aumont" },
  { year: 2025, certification: "R", releaseDate: "10/31/2025 (US)", genres: "Fantasy, Adventure", runtime: "2h 22m", score: 86, tagline: "From the ashes, a reckoning.", overview: "Twin heirs to a burning kingdom are forced onto opposite sides of a war neither wanted, as an ancient power stirs beneath the capital and demands a price in blood.", director: "Rowan Ashford" },
  { year: 2024, certification: "PG-13", releaseDate: "03/15/2024 (US)", genres: "Drama", runtime: "1h 44m", score: 77, tagline: "Grief has its own language.", overview: "After a sudden loss, a father and daughter spend a silent winter in a remote cabin, slowly learning to speak to each other again through the small rituals of an ordinary day.", director: "Naomi Estes" },
  { year: 2026, certification: "R", releaseDate: "04/03/2026 (US)", genres: "Drama, History", runtime: "2h 31m", score: 84, tagline: "Every crown is hollow.", overview: "A disgraced advisor is summoned back to court to serve a boy king, and must navigate a nest of ambition where loyalty is currency and the throne itself may be the deadliest seat in the realm.", director: "Sebastian Grey" },
  { year: 2025, certification: "R", releaseDate: "07/18/2025 (US)", genres: "Crime, Thriller", runtime: "1h 58m", score: 72, tagline: "The color of a secret.", overview: "A forensic painter who reconstructs crime scenes from memory becomes convinced that a series of unsolved cases are the work of one hand — and that the trail leads uncomfortably close to home.", director: "Vera Nilsson" },
  { year: 2026, certification: "PG-13", releaseDate: "01/23/2026 (US)", genres: "Sci-Fi, Mystery", runtime: "2h 09m", score: 80, tagline: "Listen closely.", overview: "When a botanist's experimental garden begins broadcasting a signal no instrument can explain, a small research team races to decode it before the phenomenon spreads beyond the lab.", director: "Amir Solano" },
  { year: 2024, certification: "PG-13", releaseDate: "12/06/2024 (US)", genres: "Drama, Romance", runtime: "1h 51m", score: 78, tagline: "Chasing the last of the light.", overview: "Over a single long day in a fading seaside resort, three strangers cross paths and quietly change the course of one another's lives before the season — and the summer — comes to an end.", director: "Lucia Fontaine" },
];

const POOL: WatchMovie[] = IDS.map((id, i) => ({
  id: `m${i + 1}`,
  title: TITLES[i],
  poster: poster(id),
  ...DETAILS[i],
  cast: makeCast(i),
}));

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
