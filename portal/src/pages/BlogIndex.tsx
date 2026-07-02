import { useNavigate } from "react-router-dom";
import { Kicker, Button } from "../design-system/components";
import { getPosts, getSectionMeta, type BlogSection } from "../content/blog";
import { BlogCard } from "../components/blog/BlogCard";
import { useI18n } from "../i18n";
import s from "./BlogIndex.module.css";

/* BlogIndex — the section landing for an editorial section (Destinations, Travel).
   One engine, parameterized by `section`: a featured lead story, then a grid of
   the rest. Data from the content/blog.ts seam (a CMS later). */
export default function BlogIndex({ section }: { section: BlogSection }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const posts = getPosts(section);
  const meta = getSectionMeta(section, t);
  const [featured, ...rest] = posts;

  const go = (slug: string) => navigate(`/${section}/${slug}`);

  return (
    <div className={s.page}>
      <header className={s.head}>
        <div className={s.headText}>
          <h1 className={s.title}>{meta.title}</h1>
          <p className={s.subtitle}>{meta.subtitle}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate(`/studio?section=${section}`)}>
          {t("blog.newPost")}
        </Button>
      </header>

      {featured && (
        <article className={s.hero} data-clickable onClick={() => go(featured.slug)}>
          <img className={s.heroImg} src={featured.cover} alt="" />
          <div className={s.heroInner}>
            <Kicker style={{ fontSize: 12 }}>{featured.tags[0]}</Kicker>
            <h2 className={s.heroTitle}>{featured.title}</h2>
            <p className={s.heroExcerpt}>{featured.excerpt}</p>
            <div className={s.heroMeta}>
              <span className={s.heroAuthor}>{featured.author.name}</span>
              <span aria-hidden="true"> · </span>
              {featured.date}
              <span aria-hidden="true"> · </span>
              {featured.readTime}
            </div>
          </div>
        </article>
      )}

      <div className={s.grid}>
        {rest.map((p) => (
          <BlogCard
            key={p.slug}
            image={p.cover}
            kicker={p.tags[0]}
            title={p.title}
            excerpt={p.excerpt}
            author={p.author.name}
            date={p.date}
            readTime={p.readTime}
            onClick={() => go(p.slug)}
          />
        ))}
      </div>
    </div>
  );
}
