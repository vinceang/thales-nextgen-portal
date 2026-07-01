import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SourceRail, FadeScroller, GenrePill, NewsHero, NewsCard, TileGrid } from "../design-system/components";
import { getNewsContent } from "../content/news";
import { useI18n } from "../i18n";
import s from "./News.module.css";

/* News — aggregator gallery: a scrollable source-logo rail (SourceRail), a
   scrollable category filter row (GenrePill in a FadeScroller), a featured story
   (NewsHero), and a responsive grid of NewsCards (TileGrid). Source selection is
   visual-only for now; category filters the grid. Data: content/news.ts seam —
   a real aggregator returns the same shape. Stories are non-interactive
   placeholders (open routes to /connect as an upsell) until the feed is wired. */
export default function News() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { sources, categories, hero, stories } = getNewsContent(t);

  const [source, setSource] = useState(sources[0]?.id);
  const [category, setCategory] = useState("all");

  const visible = category === "all" ? stories : stories.filter((a) => a.category === category);

  return (
    <div className={s.page}>
      <SourceRail sources={sources} active={source} onSelect={setSource} />

      <FadeScroller center={false} controls className={s.categories}>
        {categories.map((c) => (
          <GenrePill key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
            {c.label}
          </GenrePill>
        ))}
      </FadeScroller>

      {category === "all" && (
        <NewsHero
          image={hero.image}
          date={hero.date}
          title={hero.title}
          timeAgo={hero.timeAgo}
          onClick={() => navigate("/connect")}
        />
      )}

      <TileGrid columns={4} tablet={3} phone={1} gap={24}>
        {visible.map((a) => (
          <NewsCard
            key={a.id}
            image={a.image}
            timeAgo={a.timeAgo}
            title={a.title}
            onClick={() => navigate("/connect")}
          />
        ))}
      </TileGrid>
    </div>
  );
}
