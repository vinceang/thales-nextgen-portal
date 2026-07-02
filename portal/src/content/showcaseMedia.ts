// ShowcaseMediaTileManager — the Showcase's live media tiles.
//
// Takes the first two hero-carousel picks from each media gallery (Watch /
// Listen / Read) and turns them into Showcase tiles — 6 total (2 per gallery).
// It reads the SAME source the galleries do (getWatchContent / getListenContent /
// getReadContent, which resolve the committed snapshot or the placeholder
// fallback), so it is always in sync: when a snapshot is refreshed, the featured
// Showcase tiles change with it — no separate build step, no way to drift.
//
// Each tile opens the full MediaDetailModal (same modal as inside the gallery)
// and shares the gallery's favorite id/kind, so favoriting from the Showcase and
// from the gallery are the same action.
import type { TFunc } from "../i18n";
import type { ShowcaseTileConfig } from "./showcase";
import { getWatchContent } from "./watch";
import { getListenContent } from "./listen";
import { getReadContent } from "./read";
import { watchDetail, listenDetail, readDetail } from "./mediaDetail";

// Resolve a hero slide to its full catalogue record by title (works for both the
// real snapshot ids — which are prefixed — and the placeholder fallback).
function firstTwo<T extends { title: string }>(slides: { title: string }[], items: T[]): T[] {
  return slides
    .slice(0, 2)
    .map((sl) => items.find((it) => it.title === sl.title))
    .filter((x): x is T => Boolean(x));
}

/**
 * The 6 dynamic media tiles (`feat-watch-1/2`, `feat-listen-1/2`, `feat-read-1/2`),
 * built from the galleries' hero picks. Spread into getShowcaseTiles().
 */
export function getShowcaseMediaTiles(t: TFunc): ShowcaseTileConfig[] {
  const watch = getWatchContent(t);
  const listen = getListenContent(t);
  const read = getReadContent(t);

  const watchPicks = firstTwo(watch.hero.slides, watch.rows.flatMap((r) => r.items));
  const listenPicks = firstTwo(listen.hero.slides, listen.rows.flatMap((r) => r.items));
  const readPicks = firstTwo(read.hero.slides, read.rows.flatMap((r) => r.items));

  const tiles: ShowcaseTileConfig[] = [];

  watchPicks.forEach((m, i) =>
    tiles.push({
      id: `feat-watch-${i + 1}`,
      img: m.poster,
      cat: "watch",
      title: m.title,
      action: { kind: "modal", favKind: "watch", favId: m.id, detail: watchDetail(m, t) },
    }),
  );
  listenPicks.forEach((a, i) =>
    tiles.push({
      id: `feat-listen-${i + 1}`,
      img: a.cover,
      cat: "listen",
      title: a.title,
      action: { kind: "modal", favKind: "listen", favId: a.id, detail: listenDetail(a, t) },
    }),
  );
  readPicks.forEach((b, i) =>
    tiles.push({
      id: `feat-read-${i + 1}`,
      img: b.cover,
      cat: "read",
      title: b.title,
      action: { kind: "modal", favKind: "read", favId: b.id, detail: readDetail(b, t) },
    }),
  );

  return tiles;
}
