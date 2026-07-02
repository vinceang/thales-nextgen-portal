import { useNavigate, useParams } from "react-router-dom";
import { Badge, Icon, NewsItem } from "../design-system/components";
import { getPost, getPosts, getSectionMeta, type BlogSection } from "../content/blog";
import { PostBody } from "../components/blog/PostBody";
import { useI18n } from "../i18n";
import s from "./BlogArticle.module.css";

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase();
}

/* BlogArticle — a single post: cover hero, byline, tags, block body (PostBody),
   and a "more in section" footer. Slug comes from the route; data from the
   content/blog.ts seam. */
export default function BlogArticle({ section }: { section: BlogSection }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const post = getPost(section, slug);
  const meta = getSectionMeta(section, t);

  const BackLink = (
    <button type="button" className={s.back} onClick={() => navigate(`/${section}`)}>
      <Icon name="chevron-left" size={18} strokeWidth={2} color="currentColor" /> {meta.title}
    </button>
  );

  if (!post) {
    return (
      <div className={s.page}>
        {BackLink}
        <p className={s.notFound}>{t("blog.notFound")}</p>
      </div>
    );
  }

  const more = getPosts(section).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className={s.page}>
      {BackLink}

      <header className={s.hero}>
        <img className={s.heroImg} src={post.cover} alt="" />
        <div className={s.heroInner}>
          <div className={s.kicker}>{post.tags[0]}</div>
          <h1 className={s.title}>{post.title}</h1>
          <p className={s.excerpt}>{post.excerpt}</p>
        </div>
      </header>

      <div className={s.column}>
        <div className={s.byline}>
          <span className={s.avatar} aria-hidden="true">{initials(post.author.name)}</span>
          <div className={s.bylineText}>
            <span className={s.author}>
              {post.author.name}
              {post.author.role && <span className={s.role}>, {post.author.role}</span>}
            </span>
            <span className={s.dateline}>{post.date} · {post.readTime}</span>
          </div>
        </div>

        <div className={s.tags}>
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <PostBody blocks={post.body} />
      </div>

      {more.length > 0 && (
        <section className={s.more}>
          <h2 className={s.moreTitle}>{t("blog.moreIn", { section: meta.title })}</h2>
          <div className={s.moreList}>
            {more.map((p, i) => (
              <div key={p.slug}>
                <NewsItem
                  image={p.cover}
                  headline={p.title}
                  timestamp={p.readTime}
                  onClick={() => navigate(`/${section}/${p.slug}`)}
                />
                {i < more.length - 1 && <div className={s.divider} />}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
