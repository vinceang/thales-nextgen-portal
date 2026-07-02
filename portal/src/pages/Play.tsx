import { useState } from "react";
import { HeroCarousel, MediaRail, MediaRow, GenrePill, ShowcaseTile, FavoriteButton, FadeScroller, ViewToggle } from "../design-system/components";
import { getPlayContent, getGame, type Game } from "../content/play";
import { MediaDetailModal, type MediaDetail } from "../components/MediaDetailModal";
import { GameLauncher } from "../components/GameLauncher";
import { isPlayable } from "../games/registry";
import { useI18n } from "../i18n";
import { useFavorites } from "../favorites";
import s from "./Play.module.css";

/* Play — web / HTML5 games gallery. The Watch layout with landscape (16:9) game
   art: auto-advancing hero, a genre-pill filter row, then horizontally-scrolling
   category shelves. Clicking a game opens the detail modal (Overview | Details)
   with a Play action. Data comes from the content/play.ts seam. Games with a
   `gameKey` are real and playable (launched in the GameLauncher); the rest are
   catalogue placeholders whose Play button reads "Coming soon". */
export default function Play() {
  const { t } = useI18n();
  const { isFavorite, toggle } = useFavorites();
  const { hero, rows } = getPlayContent(t);

  // Save a game to favorites (kind="play" → Account → Favorites → Play).
  const toggleFav = (g: Game) => toggle({ id: g.id, kind: "play", title: g.title, image: g.image });

  const [genre, setGenre] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const visible = genre === "all" ? rows : rows.filter((r) => r.key === genre);

  // Clicking a game (or the hero CTA) opens its detail modal.
  const [detail, setDetail] = useState<Game | null>(null);
  const openGame = (id: string) => {
    const g = getGame(id);
    if (g) setDetail(g);
  };

  // The game currently running in the full-screen launcher (null = none).
  const [playing, setPlaying] = useState<Game | null>(null);
  // Launch a playable game: close the detail modal, open the launcher.
  const launch = (g: Game) => {
    if (!isPlayable(g.gameKey)) return;
    setDetail(null);
    setPlaying(g);
  };

  // Map a game into the generic media-detail shape (Overview | Details).
  const toDetail = (g: Game): MediaDetail => ({
    title: g.title,
    poster: g.image,
    posterAspect: "16 / 9",
    year: g.year,
    facts: [g.genre, g.players],
    score: g.score,
    primaryActionLabel: isPlayable(g.gameKey) ? t("play.playGame") : t("play.comingSoon"),
    primaryActionIcon: "play",
    tagline: g.tagline,
    overview: g.about,
    details: [
      { label: t("play.developer"), value: g.developer },
      { label: t("play.players"), value: g.players },
      { label: t("play.controls"), value: g.controls },
      { label: t("play.category"), value: g.genre },
    ],
  });

  return (
    <div className={s.page}>
      <HeroCarousel
        slides={hero.slides}
        autoPlay={hero.autoPlay}
        intervalMs={hero.intervalMs}
        height={440}
        onCta={(slide: { gameId: string }) => openGame(slide.gameId)}
      />

      <FadeScroller controls className={s.pills}>
        <GenrePill active={genre === "all"} onClick={() => setGenre("all")}>
          {t("play.all")}
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
              {r.items.map((g) => {
                const fav = isFavorite(g.id);
                return (
                  <div key={g.id} className={s.card}>
                    <ShowcaseTile image={g.image} title={g.title} titleSize={18} height="100%" onClick={() => setDetail(g)} />
                    {isPlayable(g.gameKey) && <span className={s.playable}>{t("play.playable")}</span>}
                    <FavoriteButton
                      className={s.fav}
                      active={fav}
                      onChange={() => toggleFav(g)}
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
                {r.items.map((g) => {
                  const fav = isFavorite(g.id);
                  return (
                    <MediaRow
                      key={g.id}
                      image={g.image}
                      aspect="16 / 9"
                      title={g.title}
                      subtitle={g.genre}
                      onClick={() => setDetail(g)}
                      trailing={
                        <FavoriteButton
                          active={fav}
                          onChange={() => toggleFav(g)}
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
        onToggleFavorite={() => detail && toggleFav(detail)}
        onPrimaryAction={() => detail && launch(detail)}
        t={t}
      />

      <GameLauncher
        gameKey={playing?.gameKey ?? null}
        title={playing?.title ?? ""}
        onClose={() => setPlaying(null)}
        t={t}
      />
    </div>
  );
}
