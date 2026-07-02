// Showcase (bento hub) tile configuration.
//
// The Showcase is the configurable hub: one BentoGrid of curated tiles. Each tile
// declares what it IS and what it DOES via a typed `action` — a media tile opens
// the MediaDetailModal, everything else links to a view. This keeps the page
// layout (bento areas) separate from tile behaviour, so re-curating the hub is a
// data change here, never a layout edit.
//
// The six media tiles are NOT hand-authored: they come from the
// ShowcaseMediaTileManager (content/showcaseMedia.ts), which surfaces the first
// two hero picks of each gallery (Watch/Listen/Read) with real data + the same
// modal they open inside the gallery — kept in sync with the media snapshots. The
// remaining tiles (destinations, shop, play, weather) are curated links here.
import type { TFunc } from "../i18n";
import type { MediaDetail } from "../components/MediaDetailModal";
import { getShowcaseMediaTiles } from "./showcaseMedia";

export type FavKind = "watch" | "listen" | "read";

/** What a tile does when activated. */
export type TileAction =
  | { kind: "modal"; favKind: FavKind; /** Catalogue id, so favoriting matches the gallery. */ favId?: string; detail: MediaDetail }
  | { kind: "link"; to: string };

export interface ShowcaseTileConfig {
  id: string;
  /** Cover image URL. */
  img: string;
  /** Category key → kicker via t(`categories.${cat}`). */
  cat: string;
  /** Real media title (dynamic tiles). When absent, the page uses the i18n title. */
  title?: string;
  action: TileAction;
}

// Curated link tiles (non-media): image + route. Titles/kickers resolve per-locale
// in the page via t(). The media tiles are injected dynamically (see below).
const IMG = {
  games: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&q=80",
  dining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
  epcot: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&q=80",
  england: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700&q=80",
  "duty-free": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80",
} as const;

// Kicker category per link tile (matches the original bento).
const byCat: Record<string, string> = {
  games: "play",
  dining: "destination",
  epcot: "destination",
  england: "travel",
  "duty-free": "shop",
};

/**
 * Curated tile configs, keyed by id. The 6 media tiles (`feat-watch-1/2`,
 * `feat-listen-1/2`, `feat-read-1/2`) come from the ShowcaseMediaTileManager and
 * track the media snapshots; the rest are curated links resolved via `tr`.
 */
export function getShowcaseTiles(tr: TFunc): Record<string, ShowcaseTileConfig> {
  const link = (id: string, to: string): ShowcaseTileConfig => ({
    id,
    img: IMG[id as keyof typeof IMG],
    cat: byCat[id],
    action: { kind: "link", to },
  });

  const media = Object.fromEntries(getShowcaseMediaTiles(tr).map((tile) => [tile.id, tile]));

  return {
    ...media,
    // Collections + non-media tiles → link to a view.
    games: link("games", "/play"),
    dining: link("dining", "/destinations"),
    epcot: link("epcot", "/destinations/orlando-epcot"),
    england: link("england", "/travel/exploring-england"),
    "duty-free": link("duty-free", "/shop"),
  };
}
