import { Kicker } from "../../design-system/components";
import s from "./BlogCard.module.css";

/* BlogCard — an editorial index card: landscape cover, category kicker, title,
   excerpt, and a byline meta row. Presentational; the consumer owns onClick.
   Composes the DS Kicker + tokens. */
export interface BlogCardProps {
  image: string;
  kicker: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  onClick?: () => void;
}

export function BlogCard({ image, kicker, title, excerpt, author, date, readTime, onClick }: BlogCardProps) {
  return (
    <article className={s.card} data-clickable={onClick ? "true" : undefined} onClick={onClick}>
      <div className={s.coverWrap}>
        <img className={s.cover} src={image} alt="" />
      </div>
      <div className={s.body}>
        <Kicker style={{ fontSize: 12 }}>{kicker}</Kicker>
        <h3 className={s.title}>{title}</h3>
        <p className={s.excerpt}>{excerpt}</p>
        <div className={s.meta}>
          <span className={s.author}>{author}</span>
          <span className={s.dot} aria-hidden="true">·</span>
          <span>{date}</span>
          <span className={s.dot} aria-hidden="true">·</span>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}
