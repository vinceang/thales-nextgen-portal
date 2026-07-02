// Showcase (bento hub) tile configuration.
//
// The Showcase is the configurable hub: one BentoGrid of curated tiles. Each tile
// declares what it IS and what it DOES via a typed `action` — a media tile opens
// the MediaDetailModal, everything else links to a view. This keeps the page
// layout (bento areas) separate from tile behaviour, so re-curating the hub is a
// data change here, never a layout edit. Non-localizable data (images, routes,
// detail metadata) lives here; titles/kickers are resolved per-locale in the page
// via t(). Detail payloads are placeholder stand-ins (same seam as watch/listen).
import type { TFunc } from "../i18n";
import type { MediaDetail, DetailCastMember, DetailTrack } from "../components/MediaDetailModal";

export type FavKind = "watch" | "listen" | "read";

/** What a tile does when activated. */
export type TileAction =
  | { kind: "modal"; favKind: FavKind; detail: MediaDetail }
  | { kind: "link"; to: string };

export interface ShowcaseTileConfig {
  id: string;
  /** Cover image URL. */
  img: string;
  /** Category key → kicker via t(`categories.${cat}`). */
  cat: string;
  action: TileAction;
}

// Invented cast pool — placeholder stand-ins (see content/watch.ts).
const ACTORS = ["Ava Sinclair", "Marcus Vell", "Nadia Okafor", "Elias Rho", "Priya Chandra", "Tomas Berg", "Lena Whitfield"];
function cast(characters: string[]): DetailCastMember[] {
  return characters.map((character, k) => ({ id: `sc-${k}`, name: ACTORS[k % ACTORS.length], character }));
}

// Invented tracklist for the featured album.
const REDMOON_TRACKS: DetailTrack[] = [
  ["in My Garden…", "1:38"], ["I Wish You Roses", "3:26"], ["Moonlight", "3:07"], ["Fantasy", "3:15"],
  ["Love Between…", "2:58"], ["All Mine", "2:44"], ["Endlessly", "3:33"], ["Deja Vu", "3:12"],
].map(([title, duration], k) => ({ id: `rm-${k}`, title, duration }));

// Image URLs are the same curated tiles rendered in the bento (landscape crops;
// the modal poster re-crops via object-fit).
const IMG = {
  "young-sheldon": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=700&q=80",
  billie: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80",
  squid: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=80",
  "red-moon": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=80",
  games: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&q=80",
  dining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
  epcot: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&q=80",
  england: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700&q=80",
  "duty-free": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80",
  "fall-guy": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700&q=80",
  ebooks: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&q=80",
} as const;

/**
 * Curated tile configs, keyed by id. `tr` resolves the modal's localized chrome
 * (action label, credit role) + the media title; verbatim facts stay inline.
 */
export function getShowcaseTiles(tr: TFunc): Record<string, ShowcaseTileConfig> {
  // Film/TV single → Overview | Cast modal.
  const film = (id: string, d: Omit<MediaDetail, "title" | "poster" | "primaryActionLabel" | "primaryActionIcon" | "credit"> & { director: string }): ShowcaseTileConfig => ({
    id,
    img: IMG[id as keyof typeof IMG],
    cat: "watch",
    action: {
      kind: "modal",
      favKind: "watch",
      detail: {
        ...d,
        title: tr(`showcase.tiles.${id}`),
        poster: IMG[id as keyof typeof IMG],
        posterAspect: "2 / 3",
        primaryActionLabel: tr("media.playTrailer"),
        primaryActionIcon: "play",
        credit: { name: d.director, role: tr("media.director") },
      },
    },
  });

  const link = (id: string, to: string): ShowcaseTileConfig => ({
    id,
    img: IMG[id as keyof typeof IMG],
    cat: byCat[id],
    action: { kind: "link", to },
  });

  return {
    "young-sheldon": film("young-sheldon", {
      year: 2017, certification: "TV-PG", facts: ["09/25/2017 (US)", "Comedy", "22m"], score: 77,
      tagline: "One genius, one family, a whole lot of questions.",
      overview: "A gifted nine-year-old with a mind built for physics — and no instinct for people — navigates school, church, and a loving, bewildered family in small-town Texas.",
      director: "Chuck Lorre",
      cast: cast(["Sheldon", "Mary", "George Sr.", "Meemaw", "Missy"]),
    }),
    squid: film("squid", {
      year: 2021, certification: "TV-MA", facts: ["09/17/2021 (US)", "Thriller, Drama", "1h"], score: 82,
      tagline: "456 players. One deadly game.",
      overview: "Hundreds of cash-strapped contestants accept a strange invitation to compete in children's games for a tempting prize — only to discover the stakes are lethal.",
      director: "Hwang Dong-hyuk",
      cast: cast(["Gi-hun", "Sang-woo", "Sae-byeok", "The Recruiter", "Il-nam"]),
    }),
    "fall-guy": film("fall-guy", {
      year: 2024, certification: "PG-13", facts: ["05/03/2024 (US)", "Action, Comedy", "2h 6m"], score: 74,
      tagline: "He does his own stunts.",
      overview: "A battle-scarred stuntman is lured back to set to track down a missing movie star — and finds himself tangled in a conspiracy far bigger than the film he signed on for.",
      director: "David Leitch",
      cast: cast(["Colt Seavers", "Jody", "Gail", "Tom Ryder", "Dan"]),
    }),
    // Featured album → Overview | Tracklist modal.
    "red-moon": {
      id: "red-moon",
      img: IMG["red-moon"],
      cat: "listen",
      action: {
        kind: "modal",
        favKind: "listen",
        detail: {
          title: tr("showcase.tiles.red-moon"),
          poster: IMG["red-moon"],
          posterAspect: "1 / 1",
          subtitle: "Vela Sky",
          year: 2023,
          facts: ["R&B, Pop", tr("media.trackCount", { n: REDMOON_TRACKS.length }), "48 min"],
          score: 85,
          primaryActionLabel: tr("listen.play"),
          primaryActionIcon: "play",
          overview: "A lush, genre-blurring record that drifts between velvet R&B and dream-pop, anchored by one of the year's most assured vocal performances.",
          credit: { name: "Lumen Records", role: tr("media.label") },
          tracks: REDMOON_TRACKS,
        },
      },
    },
    // Collections + non-media tiles → link to a view.
    billie: link("billie", "/listen"),
    ebooks: link("ebooks", "/read"),
    games: link("games", "/play"),
    dining: link("dining", "/destinations"),
    epcot: link("epcot", "/destinations/orlando-epcot"),
    england: link("england", "/travel/exploring-england"),
    "duty-free": link("duty-free", "/shop"),
  };
}

// Kicker category per link tile (matches the original bento).
const byCat: Record<string, string> = {
  billie: "listen",
  ebooks: "read",
  games: "play",
  dining: "destination",
  epcot: "destination",
  england: "travel",
  "duty-free": "shop",
};
