import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel, AlbumHero, MediaRail, MediaCard, MediaRow, GenrePill, FavoriteButton, FadeScroller, ViewToggle } from "../design-system/components";
import { getListenContent, type ListenAlbum } from "../content/listen";
import { MediaDetailModal } from "../components/MediaDetailModal";
import { listenDetail } from "../content/mediaDetail";
import { useI18n } from "../i18n";
import { useFavorites } from "../favorites";
import s from "./Listen.module.css";

/* Listen — music gallery: the Watch layout with square album art. The hero uses
   AlbumHero (1:1 cover + blurred aura) via HeroCarousel's renderSlide; shelves use
   MediaCard (cover + title/artist below). GenrePills filter; hearts save with
   kind="listen" (→ Account → Favorites → Listen). Data: content/listen.ts seam.
   Album cards + hero CTA are non-interactive placeholders (playback comes later). */
export default function Listen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();
  const { hero, rows } = getListenContent(t);

  const [genre, setGenre] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const visible = genre === "all" ? rows : rows.filter((r) => r.key === genre);

  // Clicking a cover/row opens the detail modal for that album.
  const [detail, setDetail] = useState<ListenAlbum | null>(null);

  return (
    <div className={s.page}>
      <HeroCarousel
        slides={hero.slides}
        autoPlay={hero.autoPlay}
        intervalMs={hero.intervalMs}
        height={440}
        renderSlide={(a) => (
          <AlbumHero
            cover={a.cover}
            kicker={t("categories.listen")}
            title={a.title}
            subtitle={a.artist}
            ctaLabel={t("listen.play")}
            onCta={() => navigate("/connect")}
            height="100%"
          />
        )}
      />

      <FadeScroller controls className={s.pills}>
        <GenrePill active={genre === "all"} onClick={() => setGenre("all")}>
          {t("listen.all")}
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
              {r.items.map((a) => {
                const fav = isFavorite(a.id);
                return (
                  <div key={a.id} className={s.album}>
                    <MediaCard image={a.cover} title={a.title} subtitle={a.artist} onClick={() => setDetail(a)} />
                    <FavoriteButton
                      className={s.fav}
                      active={fav}
                      onChange={() => toggle({ id: a.id, kind: "listen", title: a.title, image: a.cover })}
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
                {r.items.map((a) => {
                  const fav = isFavorite(a.id);
                  return (
                    <MediaRow
                      key={a.id}
                      image={a.cover}
                      aspect="1 / 1"
                      title={a.title}
                      subtitle={a.artist}
                      onClick={() => setDetail(a)}
                      trailing={
                        <FavoriteButton
                          active={fav}
                          onChange={() => toggle({ id: a.id, kind: "listen", title: a.title, image: a.cover })}
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
        media={detail ? listenDetail(detail, t) : null}
        onClose={() => setDetail(null)}
        isFavorite={detail ? isFavorite(detail.id) : false}
        onToggleFavorite={() =>
          detail && toggle({ id: detail.id, kind: "listen", title: detail.title, image: detail.cover })
        }
        t={t}
      />
    </div>
  );
}
