import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroBanner,
  ShowcaseTile,
  WeatherTile,
  BentoGrid,
} from "../design-system/components";
import { getShowcaseTiles } from "../content/showcase";
import { MediaDetailModal } from "../components/MediaDetailModal";
import { useI18n } from "../i18n";
import { useFavorites } from "../favorites";
import s from "./Showcase.module.css";

/* Showcase — the configurable bento hub. Layout (bento areas) lives here; each
   tile's behaviour is data, from content/showcase.ts: media tiles open the
   MediaDetailModal, everything else links to a view. The weather panel deep-links
   to the destination's 5-day forecast. */

const HERO_IMG = "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80";
const WEATHER_CODE = 3;

export default function Showcase() {
  const navigate = useNavigate();
  const { t: tr } = useI18n();
  const { isFavorite, toggle } = useFavorites();
  const tiles = getShowcaseTiles(tr);

  // The media tile whose detail modal is open (null = closed).
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeAction = activeId ? tiles[activeId].action : null;
  const activeDetail = activeAction?.kind === "modal" ? activeAction.detail : null;

  // Activate a tile: open its modal, or navigate to its linked view.
  function activate(id: string) {
    const { action } = tiles[id];
    if (action.kind === "modal") setActiveId(id);
    else navigate(action.to);
  }

  // A 2:1 media/link tile — BentoGrid controls the cell width, aspect sets height.
  function Tile({ id, titleSize = 24 }: { id: string; titleSize?: number }) {
    const cfg = tiles[id];
    return (
      <div className={s.tile21}>
        <ShowcaseTile
          image={cfg.img}
          kicker={tr(`categories.${cfg.cat}`)}
          title={tr(`showcase.tiles.${id}`)}
          titleSize={titleSize}
          height="100%"
          onClick={() => activate(id)}
        />
      </div>
    );
  }

  const items = {
    // Row 1 — big hero (spans) + two promo cells (r1/r2)
    hero: (
      <div className={s.heroCell}>
        <HeroBanner
          image={HERO_IMG}
          kicker={tr("categories.connect")}
          title={tr("showcase.hero.title")}
          ctaLabel={tr("showcase.hero.cta")}
          ctaArrow
          height="100%"
          onCta={() => navigate("/connect")}
        />
      </div>
    ),
    r1: <Tile id="young-sheldon" titleSize={22} />,
    r2: <Tile id="billie" titleSize={22} />,
    // Row 2 — four 2:1 tiles
    sq: <Tile id="squid" />,
    rm: <Tile id="red-moon" />,
    gm: <Tile id="games" />,
    dn: <Tile id="dining" titleSize={22} />,
    // Row 3 — feature destination (spans) + weather panel
    ep: <Tile id="epcot" titleSize={44} />,
    wx: (
      <div className={s.weatherCell}>
        <WeatherTile
          code={WEATHER_CODE}
          date={tr("showcase.weather.date")}
          city={tr("showcase.weather.city")}
          temp="79.5°"
          unit="F"
          condition={tr("showcase.weather.condition")}
          linkLabel={tr("showcase.weather.linkLabel")}
          iconSrc={`/assets/icons/weather/${WEATHER_CODE}.svg`}
          onLink={() => navigate("/weather?view=forecast")}
        />
      </div>
    ),
    // Row 4 — four 2:1 tiles
    en: <Tile id="england" titleSize={22} />,
    df: <Tile id="duty-free" titleSize={22} />,
    fg: <Tile id="fall-guy" />,
    eb: <Tile id="ebooks" titleSize={22} />,
  };

  return (
    <div className={s.page}>
      <BentoGrid
        gap={16}
        items={items}
        phone={{
          columns: "1fr",
          areas: ["hero", "r1", "r2", "sq", "rm", "gm", "dn", "ep", "wx", "en", "df", "fg", "eb"],
        }}
        tablet={{
          columns: "1fr 1fr",
          areas: ["hero hero", "r1 r2", "sq rm", "gm dn", "ep ep", "wx wx", "en df", "fg eb"],
        }}
        desktop={{
          columns: "repeat(12, 1fr)",
          areas: [
            "hero hero hero hero hero hero hero hero r1 r1 r1 r1",
            "hero hero hero hero hero hero hero hero r2 r2 r2 r2",
            "sq sq sq rm rm rm gm gm gm dn dn dn",
            "ep ep ep ep ep ep ep ep wx wx wx wx",
            "en en en df df df fg fg fg eb eb eb",
          ],
        }}
      />

      <MediaDetailModal
        open={!!activeDetail}
        media={activeDetail}
        onClose={() => setActiveId(null)}
        isFavorite={activeId ? isFavorite(activeId) : false}
        onToggleFavorite={() => {
          if (!activeId || activeAction?.kind !== "modal" || !activeDetail) return;
          toggle({ id: activeId, kind: activeAction.favKind, title: activeDetail.title, image: activeDetail.poster });
        }}
        t={tr}
      />
    </div>
  );
}
