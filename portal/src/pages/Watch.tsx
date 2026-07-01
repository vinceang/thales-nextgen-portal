import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel, MediaRail, MediaRow, GenrePill, ShowcaseTile, FavoriteButton, FadeScroller, ViewToggle } from "../design-system/components";
import { getWatchContent } from "../content/watch";
import { useI18n } from "../i18n";
import { useFavorites } from "../favorites";
import s from "./Watch.module.css";

/* Watch — streaming media gallery: auto-advancing hero, a genre-pill filter row,
   then horizontally-scrolling category shelves of poster tiles. Data comes from
   the content/watch.ts seam (TMDB later). Poster tiles + the hero CTA are
   non-interactive for now — detail/playback routing arrives with TMDB. */
export default function Watch() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();
  const { hero, rows } = getWatchContent(t);

  // GenrePill filter: "all" shows every shelf; a genre key shows just that shelf.
  const [genre, setGenre] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const visible = genre === "all" ? rows : rows.filter((r) => r.key === genre);

  return (
    <div className={s.page}>
      <HeroCarousel
        slides={hero.slides}
        autoPlay={hero.autoPlay}
        intervalMs={hero.intervalMs}
        height={480}
        onCta={() => navigate("/connect")}
      />

      <FadeScroller controls className={s.pills}>
        <GenrePill active={genre === "all"} onClick={() => setGenre("all")}>
          {t("watch.all")}
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
              {r.items.map((m) => {
                const fav = isFavorite(m.id);
                return (
                  <div key={m.id} className={s.poster}>
                    <ShowcaseTile image={m.poster} title={m.title} titleSize={16} height="100%" />
                    <FavoriteButton
                      className={s.fav}
                      active={fav}
                      onChange={() => toggle({ id: m.id, kind: "watch", title: m.title, image: m.poster })}
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
                {r.items.map((m) => {
                  const fav = isFavorite(m.id);
                  return (
                    <MediaRow
                      key={m.id}
                      image={m.poster}
                      aspect="2 / 3"
                      title={m.title}
                      trailing={
                        <FavoriteButton
                          active={fav}
                          onChange={() => toggle({ id: m.id, kind: "watch", title: m.title, image: m.poster })}
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
    </div>
  );
}
