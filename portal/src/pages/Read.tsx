import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel, AlbumHero, MediaRail, MediaCard, GenrePill, FavoriteButton, FadeScroller } from "../design-system/components";
import { getReadContent } from "../content/read";
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
  const visible = genre === "all" ? rows : rows.filter((r) => r.key === genre);

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

      <FadeScroller className={s.pills}>
        <GenrePill active={genre === "all"} onClick={() => setGenre("all")}>
          {t("read.all")}
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
            {r.items.map((b) => {
              const fav = isFavorite(b.id);
              return (
                <div key={b.id} className={s.book}>
                  <MediaCard image={b.cover} aspect="2 / 3" title={b.title} subtitle={b.author} />
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
        ))}
      </div>
    </div>
  );
}
