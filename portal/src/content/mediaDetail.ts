// Shared media → MediaDetail mappers.
//
// One place that turns a catalogue record (movie / album / book) into the generic
// MediaDetail the MediaDetailModal renders. The gallery pages (Watch/Listen/Read)
// AND the Showcase media-tile manager (content/showcaseMedia.ts) both use these,
// so a featured tile on the Showcase opens exactly the same modal it would inside
// its gallery. Localized chrome (action labels, credit roles, fact labels) comes
// from `t`; verbatim data stays on the record.
import type { TFunc } from "../i18n";
import type { MediaDetail } from "../components/MediaDetailModal";
import type { WatchMovie } from "./watch";
import type { ListenAlbum } from "./listen";
import type { ReadBook } from "./read";

export function watchDetail(m: WatchMovie, t: TFunc): MediaDetail {
  return {
    title: m.title,
    poster: m.poster,
    posterAspect: "2 / 3",
    year: m.year,
    certification: m.certification,
    facts: [m.releaseDate, m.genres, m.runtime],
    score: m.score,
    primaryActionLabel: t("media.playTrailer"),
    primaryActionIcon: "play",
    tagline: m.tagline,
    overview: m.overview,
    credit: { name: m.director, role: t("media.director") },
    cast: m.cast,
  };
}

export function listenDetail(a: ListenAlbum, t: TFunc): MediaDetail {
  return {
    title: a.title,
    poster: a.cover,
    posterAspect: "1 / 1",
    subtitle: a.artist,
    year: a.year,
    facts: [a.genre, t("media.trackCount", { n: a.tracks.length }), a.length],
    score: a.score,
    primaryActionLabel: t("listen.play"),
    primaryActionIcon: "play",
    overview: a.about,
    credit: { name: a.label, role: t("media.label") },
    tracks: a.tracks,
  };
}

export function readDetail(b: ReadBook, t: TFunc): MediaDetail {
  return {
    title: b.title,
    poster: b.cover,
    posterAspect: "2 / 3",
    subtitle: b.author,
    year: b.year,
    facts: [b.genre, t("media.pageCount", { n: b.pages })],
    score: b.score,
    primaryActionLabel: t("read.readNow"),
    primaryActionIcon: "eye",
    overview: b.synopsis,
    details: [
      { label: t("media.publisher"), value: b.publisher },
      { label: t("media.pages"), value: String(b.pages) },
      { label: t("media.language"), value: b.language },
    ],
  };
}
