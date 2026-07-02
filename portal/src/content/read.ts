// Read (library / e-books gallery) page content.
//
// The SEAM a future data source populates (ADR 0001) — mirrors content/listen.ts
// but for books. Static placeholder catalogue today (Unsplash portrait art); a real
// catalogue / OPDS feed would return this same shape (hero picks + category rows).
// Book/author names stay verbatim across locales; only chrome (kicker/CTA/row
// labels) is i18n.
import type { TFunc } from "../i18n";
import snapshotRaw from "./data/read.json";

export interface ReadBook {
  /** Stable id (React key + future catalogue id). */
  id: string;
  title: string;
  author: string;
  /** Portrait (2:3) cover art URL. */
  cover: string;
  // ── Detail metadata (populates the MediaDetailModal; catalogue/OPDS later) ──
  year: number;
  genre: string;
  pages: number;
  publisher: string;
  language: string;
  /** Reader score, 0–100. */
  score: number;
  /** Jacket synopsis. */
  synopsis: string;
}

export interface ReadRow {
  /** Category key — also the GenrePill filter value. */
  key: string;
  label: string;
  items: ReadBook[];
}

export interface ReadHero {
  slides: { id: string; cover: string; title: string; author: string }[];
  /** White-label: tenants can disable or retune the marquee rotation. */
  autoPlay: boolean;
  intervalMs: number;
}

export interface ReadContent {
  hero: ReadHero;
  rows: ReadRow[];
}

// Portrait cover art (Unsplash placeholder), 2:3.
const cover = (id: string) => `https://images.unsplash.com/photo-${id}?w=320&h=480&fit=crop&q=80`;

const IDS = [
  "1544947950-fa07a98d237f",
  "1512820790803-83ca734da794",
  "1481627834876-b7833e8f5570",
  "1543002588-bfa74002ed7e",
  "1476275466078-4007374efbbe",
  "1495446815901-a7297e633e8d",
  "1524995997946-a1c2e315a42f",
  "1553729459-efe14ef6055d",
  "1589998059171-988d887df646",
  "1512045482940-f37f5216f639",
  "1519682337058-a94d519337bc",
  "1497633762265-9d179a990aa6",
];

// Invented book / author names — placeholder stand-ins for a real catalogue.
const BOOKS = [
  { title: "The Salt Compass", author: "Marisol Vega" },
  { title: "Paper Cities", author: "Eli Ashwood" },
  { title: "Midnight Latitude", author: "Cassandra Locke" },
  { title: "The Gilded Hour", author: "Lena Cross" },
  { title: "Atlas of Small Fires", author: "Cole Rutherford" },
  { title: "Saltwater Saints", author: "June Harbor" },
  { title: "Afterlight", author: "Nova Reyes" },
  { title: "The Lowland Road", author: "Tomas Ridgeway" },
  { title: "Crimson Meridian", author: "Vela Sørensen" },
  { title: "The Quiet Machine", author: "Adrian Pike" },
  { title: "Echoes of Elm Park", author: "Priya Tessaly" },
  { title: "Northern Bloom", author: "Wilder Hale" },
];

// Per-book detail metadata, parallel to BOOKS (catalogue/OPDS replaces later).
interface BookDetail { year: number; genre: string; pages: number; publisher: string; language: string; score: number; synopsis: string; }
const DETAILS: BookDetail[] = [
  { year: 2024, genre: "Literary Fiction", pages: 342, publisher: "Harbor & Vale", language: "English", score: 86, synopsis: "A cartographer inherits her grandmother's unfinished atlas and, chart by chart, retraces a family's crossings — and the one secret it kept from every map." },
  { year: 2023, genre: "Science Fiction", pages: 408, publisher: "Ashwood Press", language: "English", score: 79, synopsis: "In a metropolis printed fresh each morning, an archivist discovers yesterday's city bleeding through — and with it, a version of himself he was never meant to meet." },
  { year: 2025, genre: "Mystery", pages: 296, publisher: "Locke & Sons", language: "English", score: 82, synopsis: "When a night-shift lighthouse keeper vanishes at a precise latitude, a burned-out detective follows a trail of tide charts toward an impossible confession." },
  { year: 2024, genre: "Historical", pages: 512, publisher: "Gilt House", language: "English", score: 88, synopsis: "Across one gilded, disastrous season, a clockmaker's daughter learns that the finest instruments in the city measure not time, but ambition." },
  { year: 2022, genre: "Essays", pages: 224, publisher: "Small Fires", language: "English", score: 75, synopsis: "A naturalist walks the edges of controlled burns and quiet grief in a slim, incandescent collection about the things that need to be lost to grow back." },
  { year: 2025, genre: "Literary Fiction", pages: 318, publisher: "June Harbor Books", language: "English", score: 80, synopsis: "Three generations of a fishing family gather for a funeral that refuses to stay solemn, in a novel as briny and stubborn as the coast it loves." },
  { year: 2026, genre: "Fantasy", pages: 456, publisher: "Nova Editions", language: "English", score: 84, synopsis: "In a country where the sun sets only once a year, two rival lamplighters must keep the last dusk from becoming permanent." },
  { year: 2023, genre: "Thriller", pages: 372, publisher: "Ridgeway", language: "English", score: 77, synopsis: "A haulage driver takes a route no map recommends and discovers the road itself is keeping a ledger of everyone who's ever tried to disappear." },
  { year: 2025, genre: "Science Fiction", pages: 430, publisher: "Meridian", language: "English", score: 81, synopsis: "A terraforming crew wakes from cryosleep to find their new world already inhabited — by the meticulous records of a colony that never arrived." },
  { year: 2024, genre: "Nonfiction", pages: 288, publisher: "Pike & Co.", language: "English", score: 78, synopsis: "A quietly radical history of the machines we built to be quiet, from the pneumatic tube to the noise-cancelled cabin." },
  { year: 2026, genre: "Mystery", pages: 334, publisher: "Elm Park", language: "English", score: 83, synopsis: "Forty years of neighbourhood gossip resurface when a demolished house gives up a diary, and a retired teacher decides some stories are worth finishing." },
  { year: 2025, genre: "Fiction", pages: 306, publisher: "Wilder House", language: "English", score: 76, synopsis: "A botanist returns to the valley of her childhood to catalogue a bloom that shouldn't exist — and the winter that keeps insisting it does." },
];

const POOL: ReadBook[] = BOOKS.map((b, i) => ({
  id: `b${i + 1}`,
  title: b.title,
  author: b.author,
  cover: cover(IDS[i]),
  ...DETAILS[i],
}));

const rotate = (n: number) => POOL.slice(n).concat(POOL.slice(0, n));

// The committed Open Library snapshot (scripts/openlibrary-snapshot.mjs). When
// populated it is the real catalogue; when empty (no snapshot yet) the page falls
// back to the placeholder catalogue above, so the app always builds. Row/hero
// chrome (labels) is localized here via `t()`; the snapshot holds data only.
interface ReadSnapshot {
  generatedAt: string | null;
  hero: { slides: { id: string; cover: string; title: string; author: string }[] };
  rows: { key: string; items: ReadBook[] }[];
}
const snapshot = snapshotRaw as unknown as ReadSnapshot;

export function getReadContent(t: TFunc): ReadContent {
  if (snapshot.rows.length > 0) {
    return {
      hero: { autoPlay: true, intervalMs: 6000, slides: snapshot.hero.slides },
      rows: snapshot.rows.map((r) => ({ key: r.key, label: t(`read.rows.${r.key}`), items: r.items })),
    };
  }

  // Fallback: placeholder catalogue (Unsplash art, invented books).
  return {
    hero: {
      autoPlay: true,
      intervalMs: 6000,
      slides: [
        { id: "rh1", cover: POOL[0].cover, title: POOL[0].title, author: POOL[0].author },
        { id: "rh2", cover: POOL[4].cover, title: POOL[4].title, author: POOL[4].author },
        { id: "rh3", cover: POOL[8].cover, title: POOL[8].title, author: POOL[8].author },
      ],
    },
    rows: [
      { key: "newReleases", label: t("read.rows.newReleases"), items: rotate(0).slice(0, 10) },
      { key: "bestsellers", label: t("read.rows.bestsellers"), items: rotate(3) },
      { key: "fiction", label: t("read.rows.fiction"), items: rotate(6) },
      { key: "nonfiction", label: t("read.rows.nonfiction"), items: rotate(9) },
      { key: "mystery", label: t("read.rows.mystery"), items: rotate(2) },
      { key: "kids", label: t("read.rows.kids"), items: rotate(5) },
    ],
  };
}
