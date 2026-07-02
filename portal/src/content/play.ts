// Play (games gallery) page content.
//
// The SEAM a future data source populates (ADR 0001) — mirrors content/watch.ts
// but for web / HTML5 games. Static placeholder catalogue today (Unsplash art,
// invented titles); a real games service would return this same shape (a featured
// hero + category rows of games). Actual gameplay (launching the HTML5 bundle) is
// stubbed until titles are licensed — the detail modal's Play button is the seam.
// Game/developer names stay verbatim across locales; only chrome (kickers, CTAs,
// row labels) comes from the i18n dictionary via `t`.
import type { TFunc } from "../i18n";

export interface Game {
  /** Stable id (React key + future catalogue id). */
  id: string;
  title: string;
  /** Landscape (16:9) key art URL. */
  image: string;
  // ── Detail metadata (populates the MediaDetailModal; games service later) ──
  year: number;
  genre: string;
  /** e.g. "1 Player", "1–2 Players", "Multiplayer". */
  players: string;
  developer: string;
  /** e.g. "Touch", "Keyboard", "Touch & Keyboard". */
  controls: string;
  /** Player rating, 0–100. */
  score: number;
  tagline: string;
  about: string;
  /** Registry key of a real, playable game (src/games/registry.ts). When set,
   *  the detail modal's Play button launches it; otherwise it's "coming soon". */
  gameKey?: string;
}

export interface GameRow {
  /** Category key — also the GenrePill filter value. */
  key: string;
  label: string;
  items: Game[];
}

export interface GameHero {
  slides: { id: string; image: string; kicker: string; title: string; ctaLabel: string; gameId: string }[];
  autoPlay: boolean;
  intervalMs: number;
}

export interface PlayContent {
  hero: GameHero;
  rows: GameRow[];
}

// Landscape key art (Unsplash placeholder). Reuses ids already proven to load
// elsewhere in the app; a real service supplies its own art.
const art = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=450&fit=crop&q=80`;

// Invented catalogue — placeholder stand-ins for a real games service, EXCEPT
// entries with a `gameKey`, which are real playable games shipped in src/games/.
const CATALOGUE: Omit<Game, "image">[] = [
  { id: "2048", title: "2048", year: 2014, genre: "Puzzle", players: "1 Player", developer: "In-Flight Originals", controls: "Touch & Keyboard", score: 90, tagline: "Merge the tiles, reach 2048.", about: "The addictive sliding-tile puzzle. Swipe (or use the arrow keys) to combine matching numbers — every merge doubles the tile. Simple to pick up, endlessly replayable, and it plays fully offline.", gameKey: "2048" },
  { id: "neon-drift", title: "Neon Drift", year: 2025, genre: "Racing", players: "1–2 Players", developer: "Vaultline Studio", controls: "Touch & Keyboard", score: 84, tagline: "Chase the horizon at 200 mph.", about: "A synthwave arcade racer where every drift charges your boost. Weave through neon traffic across twelve floodlit circuits and shave milliseconds off the leaderboard." },
  { id: "block-cascade", title: "Block Cascade", year: 2024, genre: "Puzzle", players: "1 Player", developer: "Tiny Anvil", controls: "Touch", score: 88, tagline: "Clear the board. Beat the clock.", about: "A falling-block puzzler with a twist: chains cascade and multiply, so the deeper you plan, the bigger the payoff. Easy to learn, brutal to master." },
  { id: "star-raiders", title: "Star Raiders", year: 2026, genre: "Arcade", players: "1 Player", developer: "Halcyon Bit", controls: "Keyboard", score: 79, tagline: "The last pilot standing.", about: "A wave-based space shooter in glorious pixel art. Upgrade your hull between skirmishes and hold the line against escalating swarms." },
  { id: "turbo-karts", title: "Turbo Karts", year: 2025, genre: "Racing", players: "Multiplayer", developer: "Vaultline Studio", controls: "Touch & Keyboard", score: 81, tagline: "Grab a shell and hold on.", about: "Four-player couch-style kart mayhem in the cabin. Bright tracks, chaotic power-ups, and rubber-band comebacks that keep every seat in the race." },
  { id: "word-tumble", title: "Word Tumble", year: 2024, genre: "Puzzle", players: "1–2 Players", developer: "Tiny Anvil", controls: "Touch", score: 83, tagline: "Every letter counts.", about: "Spell your way out of a rising tide of tiles. A relaxed daily mode and a frantic versus mode for two players sharing a screen." },
  { id: "sky-hopper", title: "Sky Hopper", year: 2026, genre: "Arcade", players: "1 Player", developer: "Halcyon Bit", controls: "Touch", score: 76, tagline: "One tap. Don't fall.", about: "A deceptively simple one-touch platformer about timing and nerve. Bounce ever higher through drifting islands and beat your own best." },
  { id: "grand-strategy", title: "Kingdoms Ascend", year: 2025, genre: "Strategy", players: "1 Player", developer: "Meridian Games", controls: "Touch & Keyboard", score: 85, tagline: "Build. Trade. Conquer.", about: "A bite-sized 4X built for a single flight: settle, research, and outmaneuver rival realms across a procedurally generated map in under an hour." },
  { id: "solitaire-deluxe", title: "Solitaire Deluxe", year: 2023, genre: "Card", players: "1 Player", developer: "Deckhouse", controls: "Touch", score: 80, tagline: "The classic, refined.", about: "Klondike, Spider, and FreeCell with silky animations, daily challenges, and a clean, distraction-free table. Comfort gaming at altitude." },
  { id: "chess-master", title: "Chess Master", year: 2024, genre: "Strategy", players: "1–2 Players", developer: "Deckhouse", controls: "Touch", score: 87, tagline: "Ten levels. No mercy.", about: "Play the on-board engine across ten difficulty tiers or pass-and-play a friend. Includes puzzles, hints, and takebacks for learners." },
  { id: "bubble-pop", title: "Bubble Pop", year: 2025, genre: "Kids", players: "1 Player", developer: "Sunbeam Kids", controls: "Touch", score: 78, tagline: "Match three, pop away!", about: "A gentle, colourful match-and-pop game designed for little hands — no timers, no fails, just cheerful bubbles and friendly sounds." },
  { id: "memory-match", title: "Memory Match", year: 2024, genre: "Kids", players: "1–2 Players", developer: "Sunbeam Kids", controls: "Touch", score: 75, tagline: "Find every pair.", about: "Flip cards to match friendly animals across growing grids. A cooperative two-player mode makes it perfect for travelling families." },
  { id: "asteroid-belt", title: "Asteroid Belt", year: 2026, genre: "Arcade", players: "1 Player", developer: "Halcyon Bit", controls: "Keyboard", score: 82, tagline: "Thrust, spin, survive.", about: "A modern take on the vector-arcade classic. Momentum is everything as you drift through ever-denser fields of splitting rocks." },
];

// Proven-loading Unsplash ids (reused from other sections' pools). First entry
// is 2048's art; the rest keep their original games (order preserved).
const IMG_IDS = [
  "1550745165-9bc0b252726f",
  "1511512578047-dfb367046420", "1518770660439-4636190af475", "1489599849927-2ee91cede3ba",
  "1470225620780-dba8ba36b745", "1511671782779-c97d3d27a1d4", "1522869635100-9f4c5e86aa37",
  "1465847899084-d164df4dedc6", "1496293455970-f8581aae0e3b", "1500530855697-b586d89ba3ee",
  "1454496522488-7a8e488e8606", "1483985988355-763728e1935b", "1493225457124-a3eb161ffa5f",
];

const POOL: Game[] = CATALOGUE.map((g, i) => ({ ...g, image: art(IMG_IDS[i]) }));

const byId = Object.fromEntries(POOL.map((g) => [g.id, g]));
export function getGame(id: string): Game | undefined {
  return byId[id];
}

const rotate = (n: number) => POOL.slice(n).concat(POOL.slice(0, n));

export function getPlayContent(t: TFunc): PlayContent {
  // Feature the real playable game (2048) first; images come from the pool by id
  // so they never drift if the catalogue order changes.
  const heroSlide = (gameId: string, n: number) => {
    const g = byId[gameId];
    return { id: `ph${n}`, image: g.image, kicker: t("play.featured"), title: g.title, ctaLabel: t("play.playGame"), gameId };
  };
  return {
    hero: {
      autoPlay: true,
      intervalMs: 6000,
      slides: [heroSlide("2048", 1), heroSlide("grand-strategy", 2), heroSlide("neon-drift", 3)],
    },
    rows: [
      { key: "arcade", label: t("play.rows.arcade"), items: rotate(0) },
      { key: "puzzle", label: t("play.rows.puzzle"), items: rotate(3) },
      { key: "racing", label: t("play.rows.racing"), items: rotate(6) },
      { key: "strategy", label: t("play.rows.strategy"), items: rotate(9) },
      { key: "card", label: t("play.rows.card"), items: rotate(2) },
      { key: "kids", label: t("play.rows.kids"), items: rotate(5) },
    ],
  };
}
