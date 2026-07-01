import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel, AlbumHero, MediaRail, MediaCard, GenrePill, FavoriteButton, FadeScroller } from "../design-system/components";
import { getListenContent } from "../content/listen";
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
  const visible = genre === "all" ? rows : rows.filter((r) => r.key === genre);

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

      <div className={s.rows}>
        {visible.map((r) => (
          <MediaRail key={r.key} title={r.label}>
            {r.items.map((a) => {
              const fav = isFavorite(a.id);
              return (
                <div key={a.id} className={s.album}>
                  <MediaCard image={a.cover} title={a.title} subtitle={a.artist} />
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
        ))}
      </div>
    </div>
  );
}
