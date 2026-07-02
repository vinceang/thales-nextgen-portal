import { getInfoContent, type InfoKey } from "../content/info";
import { PostBody } from "../components/blog/PostBody";
import { useI18n } from "../i18n";
import s from "./InfoPage.module.css";

/* InfoPage — a text-only editorial "document" page for the footer links (Terms,
   Privacy, Legal, Contact). Mirrors the blog article layout (kicker + Playfair
   title + centered reading column via PostBody) without the cover image, for
   consistency with the content pages. Copy is translatable (content/info.ts →
   i18n). */
export default function InfoPage({ pageKey }: { pageKey: InfoKey }) {
  const { t } = useI18n();
  const { kicker, title, updated, blocks } = getInfoContent(pageKey, t);

  return (
    <div className={s.page}>
      <header className={s.head}>
        <span className={s.kicker}>{kicker}</span>
        <h1 className={s.title}>{title}</h1>
        <span className={s.updated}>{updated}</span>
      </header>
      <PostBody blocks={blocks} />
    </div>
  );
}
