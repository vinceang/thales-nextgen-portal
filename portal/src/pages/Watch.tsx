import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel, MediaRail, GenrePill, ShowcaseTile, FavoriteButton } from "../design-system/components";
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

      <div className={s.pills}>
        <div className={s.pillsTrack}>
          <GenrePill active={genre === "all"} onClick={() => setGenre("all")}>
            {t("watch.all")}
          </GenrePill>
          {rows.map((r) => (
            <GenrePill key={r.key} active={genre === r.key} onClick={() => setGenre(r.key)}>
              {r.label}
            </GenrePill>
          ))}
        </div>
      </div>

      <div className={s.rows}>
        {visible.map((r) => (
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
        ))}
      </div>
    </div>
  );
}
