// Listen (music gallery) page content.
//
// The SEAM a future data source populates (ADR 0001) — mirrors content/watch.ts
// but for music. Static placeholder catalogue today (Unsplash square art); a real
// music API would return this same shape (hero albums + genre rows). Album/artist
// names stay verbatim across locales; only chrome (kicker/CTA/row labels) is i18n.
import type { TFunc } from "../i18n";

/** One track on an album (Tracklist tab). */
export interface Track {
  id: string;
  title: string;
  duration: string;
}

export interface ListenAlbum {
  /** Stable id (React key + future catalogue id). */
  id: string;
  title: string;
  artist: string;
  /** Square (1:1) cover art URL. */
  cover: string;
  // ── Detail metadata (populates the MediaDetailModal; catalogue API later) ──
  year: number;
  genre: string;
  label: string;
  /** Total album length, e.g. "42 min". */
  length: string;
  /** Listener score, 0–100. */
  score: number;
  /** Short about/blurb. */
  about: string;
  tracks: Track[];
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

// Invented track titles — placeholder stand-ins for a real catalogue.
const SONGS = [
  "Overture", "Neon Tide", "Paper Skies", "Slow Weather", "Golden Static", "Midnight Avenue",
  "Velvet Hours", "Saltwater", "Afterglow", "Lowlands", "Crimson", "Soft Machine",
  "Echo Park", "Northern Bloom", "Cassette", "Last Light",
];

// 8–11 tracks per album, rotated from the pool with deterministic durations.
function makeTracks(seed: number): Track[] {
  const n = 8 + (seed % 4);
  return Array.from({ length: n }, (_, k) => {
    const idx = (seed * 3 + k) % SONGS.length;
    const secs = 12 + ((seed * 7 + k * 13) % 48);
    const mins = 2 + ((seed + k) % 4);
    return { id: `t${seed}-${k}`, title: SONGS[idx], duration: `${mins}:${String(secs).padStart(2, "0")}` };
  });
}

// Per-album detail metadata, parallel to ALBUMS (catalogue API replaces later).
interface AlbumDetail { year: number; genre: string; label: string; length: string; score: number; about: string; }
const DETAILS: AlbumDetail[] = [
  { year: 2025, genre: "Synth-pop", label: "Lumen Records", length: "41 min", score: 84, about: "A neon-lit debut that trades in shimmering synths and late-night hooks, recorded over a single restless summer in the city." },
  { year: 2024, genre: "Indie Rock", label: "Otherlight Co.", length: "45 min", score: 78, about: "Widescreen guitars and open-road choruses from a band that has quietly become a festival mainstay." },
  { year: 2026, genre: "Electronic", label: "Cassette Club", length: "38 min", score: 81, about: "A warm, tape-saturated set of downtempo grooves built for the small hours." },
  { year: 2025, genre: "Alt-Pop", label: "Crosswire", length: "43 min", score: 76, about: "Glossy production meets confessional songwriting on a record about starting over." },
  { year: 2024, genre: "Dream Pop", label: "Atlas Sound", length: "47 min", score: 88, about: "Lush, reverb-drenched textures that unfold slowly across eleven interlocking tracks." },
  { year: 2026, genre: "Folk", label: "June Harbor", length: "39 min", score: 82, about: "Spare, salt-worn ballads written on the coast and recorded almost entirely live." },
  { year: 2025, genre: "R&B", label: "Novaa", length: "40 min", score: 85, about: "Silk-smooth vocals and midnight production on a breakout sophomore album." },
  { year: 2024, genre: "Americana", label: "Ridgeway", length: "44 min", score: 74, about: "Dust and denim storytelling from a songwriter's songwriter." },
  { year: 2026, genre: "Art Pop", label: "Vela Sky", length: "46 min", score: 80, about: "Ambitious, string-laden pop that swings from whisper to anthem." },
  { year: 2025, genre: "House", label: "Pioneer 7", length: "52 min", score: 79, about: "A relentless, club-ready run of four-to-the-floor cuts." },
  { year: 2024, genre: "Shoegaze", label: "Tessellate", length: "48 min", score: 83, about: "Walls of guitar and buried melodies for headphones turned all the way up." },
  { year: 2026, genre: "Chamber Pop", label: "Wilder", length: "42 min", score: 77, about: "Delicate, orchestral arrangements framing some of the year's most tender writing." },
];

const POOL: ListenAlbum[] = ALBUMS.map((a, i) => ({
  id: `a${i + 1}`,
  title: a.title,
  artist: a.artist,
  cover: cover(IDS[i]),
  ...DETAILS[i],
  tracks: makeTracks(i),
}));

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
