import { useEffect, useState } from "react";
import { Modal, Tabs, Button, FavoriteButton, Icon } from "../design-system/components";
import type { IconName } from "../design-system/components/core/Icon";
import type { TFunc } from "../i18n";
import s from "./MediaDetailModal.module.css";

/* MediaDetailModal — TMDB-style detail overlay for a media item. Composes the DS
   Modal (Esc / backdrop close, animated, tokens) with a poster + metadata column
   that splits two-up on desktop and stacks on mobile. A two-tab set keeps it
   compact: Overview + a type-specific second tab (Cast for film/TV, Tracklist
   for music, Details for books). Driven by a generic MediaDetail shape so all
   three galleries share one component; the page maps its own item into it. The
   primary action (Play Trailer / Play / Read Now) is a placeholder until real
   playback/reading wiring lands. */

export interface DetailCastMember {
  id: string;
  name: string;
  character: string;
  /** Profile photo (initials avatar shown until one exists). */
  photo?: string;
}

/** A track row for the music Tracklist tab. */
export interface DetailTrack {
  id: string;
  title: string;
  duration: string;
}

/** A label/value fact for the book Details tab. */
export interface DetailFact {
  label: string;
  value: string;
}

export interface MediaDetail {
  title: string;
  poster: string;
  /** Poster aspect: "2 / 3" (film/book) or "1 / 1" (album). Default "2 / 3". */
  posterAspect?: string;
  /** Artist / author line under the title (film/TV omit). */
  subtitle?: string;
  year?: number;
  /** Certification / content-rating box (film/TV). */
  certification?: string;
  /** Dot-separated facts line (release date, genres, runtime / label · length…). */
  facts?: string[];
  /** User score, 0–100. */
  score?: number;
  scoreLabel?: string;
  /** Primary action label — "Play Trailer" / "Play" / "Read Now". */
  primaryActionLabel: string;
  primaryActionIcon?: IconName;
  // ── Overview tab ─────────────────────────────────────────────────────────
  tagline?: string;
  overview?: string;
  /** Lead credit (director / label / publisher). */
  credit?: { name: string; role: string };
  // ── Second tab (exactly one drives it) ───────────────────────────────────
  cast?: DetailCastMember[];
  tracks?: DetailTrack[];
  details?: DetailFact[];
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

/** Circular user-score meter — single accent hue (never green/amber). */
function ScoreRing({ value }: { value: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <svg className={s.ring} viewBox="0 0 48 48" width={48} height={48} aria-hidden="true">
      <circle className={s.ringTrack} cx="24" cy="24" r={r} fill="none" strokeWidth="4" />
      <circle
        className={s.ringFill}
        cx="24"
        cy="24"
        r={r}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c}`}
        transform="rotate(-90 24 24)"
      />
      <text className={s.ringText} x="24" y="25" textAnchor="middle" dominantBaseline="middle">
        {Math.round(value)}
        <tspan className={s.ringPct} dy="-4">%</tspan>
      </text>
    </svg>
  );
}

export interface MediaDetailModalProps {
  open: boolean;
  media: MediaDetail | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  t: TFunc;
}

export function MediaDetailModal({ open, media, onClose, isFavorite = false, onToggleFavorite, t }: MediaDetailModalProps) {
  // The type-specific second tab, chosen by whichever detail data is present.
  const secondary = media?.cast?.length
    ? { value: "cast", label: t("media.cast") }
    : media?.tracks?.length
      ? { value: "tracks", label: t("media.tracklist") }
      : media?.details?.length
        ? { value: "details", label: t("media.details") }
        : null;

  const [tab, setTab] = useState("overview");

  // Reset to Overview whenever a different item opens.
  useEffect(() => {
    if (open) setTab("overview");
  }, [open, media?.title]);

  if (!media) return null;

  const facts = media.facts ?? [];

  return (
    <Modal open={open} onClose={onClose} width={820} className={s.dialog}>
      <div className={s.grid} style={{ ["--poster-aspect" as string]: media.posterAspect ?? "2 / 3" }}>
        <img className={s.poster} src={media.poster} alt="" />

        <div className={s.details}>
          <h2 className={s.title}>
            {media.title}
            {media.year != null && <span className={s.year}> ({media.year})</span>}
          </h2>
          {media.subtitle && <div className={s.subtitle}>{media.subtitle}</div>}

          {(media.certification || facts.length > 0) && (
            <div className={s.metaRow}>
              {media.certification && <span className={s.cert}>{media.certification}</span>}
              {facts.map((m, i) => (
                <span key={i} className={s.metaItem}>{m}</span>
              ))}
            </div>
          )}

          <div className={s.actions}>
            {media.score != null && (
              <div className={s.score}>
                <ScoreRing value={media.score} />
                <span className={s.scoreLabel}>{media.scoreLabel ?? t("media.userScore")}</span>
              </div>
            )}
            <Button className={s.trailer}>
              <Icon name={media.primaryActionIcon ?? "play"} size={16} /> {media.primaryActionLabel}
            </Button>
            {onToggleFavorite && (
              <FavoriteButton
                active={isFavorite}
                onChange={onToggleFavorite}
                label={isFavorite ? t("favorites.remove") : t("favorites.add")}
                size={18}
              />
            )}
          </div>

          <Tabs
            className={s.tabs}
            value={tab}
            onChange={setTab}
            tabs={[{ value: "overview", label: t("media.overview") }, ...(secondary ? [secondary] : [])]}
          />

          {tab === "overview" && (
            <div className={s.panel}>
              {media.tagline && <p className={s.tagline}>{media.tagline}</p>}
              {media.overview && <p className={s.overview}>{media.overview}</p>}
              {media.credit && (
                <div className={s.credit}>
                  <span className={s.creditName}>{media.credit.name}</span>
                  <span className={s.creditRole}>{media.credit.role}</span>
                </div>
              )}
            </div>
          )}

          {tab === "cast" && media.cast && (
            <div className={s.cast}>
              {media.cast.map((p) => (
                <div key={p.id} className={s.castMember}>
                  {p.photo ? (
                    <img className={s.castPhoto} src={p.photo} alt="" />
                  ) : (
                    <span className={s.castAvatar} aria-hidden="true">{initials(p.name)}</span>
                  )}
                  <div className={s.castText}>
                    <span className={s.castName}>{p.name}</span>
                    <span className={s.castChar}>{p.character}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "tracks" && media.tracks && (
            <ol className={s.tracks}>
              {media.tracks.map((tr, i) => (
                <li key={tr.id} className={s.track}>
                  <span className={s.trackNo}>{i + 1}</span>
                  <span className={s.trackTitle}>{tr.title}</span>
                  <span className={s.trackDur}>{tr.duration}</span>
                </li>
              ))}
            </ol>
          )}

          {tab === "details" && media.details && (
            <dl className={s.factsList}>
              {media.details.map((d, i) => (
                <div key={i} className={s.factRow}>
                  <dt className={s.factLabel}>{d.label}</dt>
                  <dd className={s.factValue}>{d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </Modal>
  );
}
