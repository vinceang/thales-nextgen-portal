import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel, AlbumHero, MediaRail, MediaCard, MediaRow, GenrePill, FavoriteButton, FadeScroller, ViewToggle } from "../design-system/components";
import { getReadContent, type ReadBook } from "../content/read";
import { MediaDetailModal, type MediaDetail } from "../components/MediaDetailModal";
import { useI18n } from "../i18n";
import { useFavorites } from "../favorites";
import s from "./Read.module.css";

/* Read — library gallery: the Listen layout with portrait (2:3) book covers. The
   hero uses AlbumHero (portrait cover + blurred aura) via HeroCarousel's
   renderSlide; shelves use MediaCard (cover + title/author below). GenrePills
   filter; hearts save with kind="read" (→ Account → Favorites → Read). Data:
   content/read.ts seam. Book cards + hero CTA are non-interactive placeholders
   (reading comes later). */
export default function Read() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();
  const { hero, rows } = getReadContent(t);

  const [genre, setGenre] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const visible = genre === "all" ? rows : rows.filter((r) => r.key === genre);

  // Clicking a cover/row opens the detail modal for that book.
  const [detail, setDetail] = useState<ReadBook | null>(null);

  // Map a book into the generic media-detail shape (Overview | Details).
  const toDetail = (b: ReadBook): MediaDetail => ({
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
  });

  return (
    <div className={s.page}>
      <HeroCarousel
        slides={hero.slides}
        autoPlay={hero.autoPlay}
        intervalMs={hero.intervalMs}
        height={480}
        renderSlide={(b) => (
          <AlbumHero
            cover={b.cover}
            aspect="2 / 3"
            coverWidth="clamp(100px, 26%, 220px)"
            kicker={t("categories.read")}
            title={b.title}
            subtitle={b.author}
            ctaLabel={t("read.readNow")}
            onCta={() => navigate("/connect")}
            height="100%"
          />
        )}
      />

      <FadeScroller controls className={s.pills}>
        <GenrePill active={genre === "all"} onClick={() => setGenre("all")}>
          {t("read.all")}
        </GenrePill>
        {rows.map((r) => (
          <GenrePill key={r.key} active={genre === r.key} onClick={() => setGenre(r.key)}>
            {r.label}
          </GenrePill>
        ))}
      </FadeScroller>

      <div className={s.toolbar}>
        <ViewToggle value={view} onChange={setView} gridLabel={t("common.viewGrid")} listLabel={t("common.viewList")} />
      </div>

      <div className={s.rows}>
        {visible.map((r) =>
          view === "grid" ? (
            <MediaRail key={r.key} title={r.label}>
              {r.items.map((b) => {
                const fav = isFavorite(b.id);
                return (
                  <div key={b.id} className={s.book}>
                    <MediaCard image={b.cover} aspect="2 / 3" title={b.title} subtitle={b.author} onClick={() => setDetail(b)} />
                    <FavoriteButton
                      className={s.fav}
                      active={fav}
                      onChange={() => toggle({ id: b.id, kind: "read", title: b.title, image: b.cover })}
                      label={fav ? t("favorites.remove") : t("favorites.add")}
                    />
                  </div>
                );
              })}
            </MediaRail>
          ) : (
            <section key={r.key} className={s.listSection}>
              <h3 className={s.listTitle}>{r.label}</h3>
              <div className={s.list}>
                {r.items.map((b) => {
                  const fav = isFavorite(b.id);
                  return (
                    <MediaRow
                      key={b.id}
                      image={b.cover}
                      aspect="2 / 3"
                      title={b.title}
                      subtitle={b.author}
                      onClick={() => setDetail(b)}
                      trailing={
                        <FavoriteButton
                          active={fav}
                          onChange={() => toggle({ id: b.id, kind: "read", title: b.title, image: b.cover })}
                          label={fav ? t("favorites.remove") : t("favorites.add")}
                        />
                      }
                    />
                  );
                })}
              </div>
            </section>
          )
        )}
      </div>

      <MediaDetailModal
        open={!!detail}
        media={detail ? toDetail(detail) : null}
        onClose={() => setDetail(null)}
        isFavorite={detail ? isFavorite(detail.id) : false}
        onToggleFavorite={() =>
          detail && toggle({ id: detail.id, kind: "read", title: detail.title, image: detail.cover })
        }
        t={t}
      />
    </div>
  );
}
