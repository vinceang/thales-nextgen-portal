import { useEffect, useState } from "react";
import { Modal, Tabs, Button, FavoriteButton, Icon } from "../design-system/components";
import type { TFunc } from "../i18n";
import s from "./MediaDetailModal.module.css";

/* MediaDetailModal — TMDB-style detail overlay for a media item. Composes the DS
   Modal (Esc / backdrop close, tokens) with a poster + metadata column that
   splits two-up on desktop and stacks on mobile. An Overview | Cast tab set
   keeps it compact. Built on a generic MediaDetail shape so the Listen / Read
   pages can reuse it later (music/books omit movie-only fields and add their
   own). Playback (Play Trailer) is a placeholder until TMDB wiring lands. */

export interface DetailCastMember {
  id: string;
  name: string;
  character: string;
  /** Profile photo (initials avatar shown until one exists). */
  photo?: string;
}

export interface MediaDetail {
  title: string;
  poster: string;
  year?: number;
  certification?: string;
  releaseDate?: string;
  genres?: string;
  runtime?: string;
  /** User score, 0–100. */
  score?: number;
  tagline?: string;
  overview?: string;
  director?: string;
  cast?: DetailCastMember[];
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
  const [tab, setTab] = useState("overview");

  // Reset to Overview whenever a different item opens.
  useEffect(() => {
    if (open) setTab("overview");
  }, [open, media?.title]);

  if (!media) return null;

  const meta = [media.releaseDate, media.genres, media.runtime].filter(Boolean) as string[];
  const hasCast = !!media.cast && media.cast.length > 0;

  return (
    <Modal open={open} onClose={onClose} width={820} className={s.dialog}>
      <div className={s.grid}>
        <img className={s.poster} src={media.poster} alt="" />

        <div className={s.details}>
          <h2 className={s.title}>
            {media.title}
            {media.year != null && <span className={s.year}> ({media.year})</span>}
          </h2>

          <div className={s.metaRow}>
            {media.certification && <span className={s.cert}>{media.certification}</span>}
            {meta.map((m, i) => (
              <span key={i} className={s.metaItem}>{m}</span>
            ))}
          </div>

          <div className={s.actions}>
            {media.score != null && (
              <div className={s.score}>
                <ScoreRing value={media.score} />
                <span className={s.scoreLabel}>{t("media.userScore")}</span>
              </div>
            )}
            <Button className={s.trailer}>
              <Icon name="play" size={16} /> {t("media.playTrailer")}
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
            tabs={[
              { value: "overview", label: t("media.overview") },
              ...(hasCast ? [{ value: "cast", label: t("media.cast") }] : []),
            ]}
          />

          {tab === "overview" && (
            <div className={s.panel}>
              {media.tagline && <p className={s.tagline}>{media.tagline}</p>}
              {media.overview && <p className={s.overview}>{media.overview}</p>}
              {media.director && (
                <div className={s.credit}>
                  <span className={s.creditName}>{media.director}</span>
                  <span className={s.creditRole}>{t("media.director")}</span>
                </div>
              )}
            </div>
          )}

          {tab === "cast" && hasCast && (
            <div className={s.cast}>
              {media.cast!.map((p) => (
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
        </div>
      </div>
    </Modal>
  );
}
