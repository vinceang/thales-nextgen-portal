// Listen (music gallery) page content.
//
// The SEAM a future data source populates (ADR 0001) — mirrors content/watch.ts
// but for music. Static placeholder catalogue today (Unsplash square art); a real
// music API would return this same shape (hero albums + genre rows). Album/artist
// names stay verbatim across locales; only chrome (kicker/CTA/row labels) is i18n.
import type { TFunc } from "../i18n";

export interface ListenAlbum {
  /** Stable id (React key + future catalogue id). */
  id: string;
  title: string;
  artist: string;
  /** Square (1:1) cover art URL. */
  cover: string;
}

export interface ListenRow {
  /** Genre/category key — also the GenrePill filter value. */
  key: string;
  label: string;
  items: ListenAlbum[];
}

export interface ListenHero {
  slides: { id: string; cover: string; title: string; artist: string }[];
  /** White-label: tenants can disable or retune the marquee rotation. */
  autoPlay: boolean;
  intervalMs: number;
}

export interface ListenContent {
  hero: ListenHero;
  rows: ListenRow[];
}

// Square cover art (Unsplash placeholder).
const cover = (id: string) => `https://images.unsplash.com/photo-${id}?w=320&h=320&fit=crop&q=80`;

const IDS = [
  "1493225457124-a3eb161ffa5f",
  "1470225620780-dba8ba36b745",
  "1511671782779-c97d3d27a1d4",
  "1458560871784-56d23406c091",
  "1465847899084-d164df4dedc6",
  "1514525253161-7a46d19cd819",
  "1419242902214-272b3f66ee7a",
  "1507838153414-b4b713384a76",
  "1484876065684-b683cf17d276",
  "1496293455970-f8581aae0e3b",
  "1459749411175-04bf5292ceea",
  "1511735111819-9a3f7709049c",
];

// Invented album / artist names — placeholder stand-ins for a real catalogue.
const ALBUMS = [
  { title: "Neon Tides", artist: "Marisol Vega" },
  { title: "Paper Skies", artist: "The Otherlights" },
  { title: "Midnight Avenue", artist: "Cassette Club" },
  { title: "Golden Static", artist: "Lena Cross" },
  { title: "Velvet Hours", artist: "Atlas & Cole" },
  { title: "Saltwater Hymns", artist: "June Harbor" },
  { title: "Afterglow", artist: "Novaa" },
  { title: "Lowlands", artist: "Ridgeway" },
  { title: "Crimson Era", artist: "Vela Sky" },
  { title: "Soft Machine", artist: "Pioneer 7" },
  { title: "Echo Park", artist: "The Tessellates" },
  { title: "Northern Bloom", artist: "Wilder" },
];

const POOL: ListenAlbum[] = ALBUMS.map((a, i) => ({ id: `a${i + 1}`, title: a.title, artist: a.artist, cover: cover(IDS[i]) }));

const rotate = (n: number) => POOL.slice(n).concat(POOL.slice(0, n));

export function getListenContent(t: TFunc): ListenContent {
  return {
    hero: {
      autoPlay: true,
      intervalMs: 6000,
      slides: [
        { id: "lh1", cover: POOL[0].cover, title: POOL[0].title, artist: POOL[0].artist },
        { id: "lh2", cover: POOL[4].cover, title: POOL[4].title, artist: POOL[4].artist },
        { id: "lh3", cover: POOL[8].cover, title: POOL[8].title, artist: POOL[8].artist },
      ],
    },
    rows: [
      { key: "newReleases", label: t("listen.rows.newReleases"), items: rotate(0).slice(0, 10) },
      { key: "topCharts", label: t("listen.rows.topCharts"), items: rotate(3) },
      { key: "pop", label: t("listen.rows.pop"), items: rotate(6) },
      { key: "hiphop", label: t("listen.rows.hiphop"), items: rotate(9) },
      { key: "rock", label: t("listen.rows.rock"), items: rotate(2) },
      { key: "chill", label: t("listen.rows.chill"), items: rotate(5) },
    ],
  };
}
