import { Kicker } from "../design-system/components";
import s from "./FeaturedMediaTile.module.css";

/* FeaturedMediaTile — the Showcase's featured-media cell. Unlike a plain
   ShowcaseTile (which fills the 2:1 cell by cropping), this shows the WHOLE cover
   at its native aspect (portrait poster / square album) floated over a blurred,
   darkened fill of the same cover — the same "aura" treatment as each gallery's
   AlbumHero, so a featured tile rhymes with the hero it came from. Kicker + title
   sit beside the cover. App-level (media tiles only); the DS ShowcaseTile and the
   photographic link tiles are unchanged. */
export interface FeaturedMediaTileProps {
  image: string;
  kicker: string;
  title: string;
  /** Cover aspect — "2 / 3" (poster/book) or "1 / 1" (album). */
  aspect?: string;
  titleSize?: number;
  onClick?: () => void;
}

export function FeaturedMediaTile({ image, kicker, title, aspect = "2 / 3", titleSize = 22, onClick }: FeaturedMediaTileProps) {
  return (
    <div
      className={s.tile}
      data-clickable={onClick ? "true" : undefined}
      onClick={onClick}
      style={{ "--fmt-aspect": aspect, "--fmt-title-size": `${titleSize}px` } as React.CSSProperties}
    >
      <img src={image} alt="" aria-hidden="true" className={s.bg} />
      <div className={s.scrim} />
      <div className={s.frame}>
        <img src={image} alt="" className={s.cover} />
        <div className={s.text}>
          {kicker && <Kicker style={{ fontSize: 12 }}>{kicker}</Kicker>}
          <div className={s.title}>{title}</div>
        </div>
      </div>
    </div>
  );
}
