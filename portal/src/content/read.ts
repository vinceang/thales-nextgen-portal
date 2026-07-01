// Read (library / e-books gallery) page content.
//
// The SEAM a future data source populates (ADR 0001) — mirrors content/listen.ts
// but for books. Static placeholder catalogue today (Unsplash portrait art); a real
// catalogue / OPDS feed would return this same shape (hero picks + category rows).
// Book/author names stay verbatim across locales; only chrome (kicker/CTA/row
// labels) is i18n.
import type { TFunc } from "../i18n";

export interface ReadBook {
  /** Stable id (React key + future catalogue id). */
  id: string;
  title: string;
  author: string;
  /** Portrait (2:3) cover art URL. */
  cover: string;
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

const POOL: ReadBook[] = BOOKS.map((b, i) => ({ id: `b${i + 1}`, title: b.title, author: b.author, cover: cover(IDS[i]) }));

const rotate = (n: number) => POOL.slice(n).concat(POOL.slice(0, n));

export function getReadContent(t: TFunc): ReadContent {
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
