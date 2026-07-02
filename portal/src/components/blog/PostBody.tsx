import type { BlogBlock } from "../../content/blog";
import s from "./PostBody.module.css";

/* PostBody — renders a portable block-body (the CMS rendering primitive). Given
   the array of typed blocks a post/CMS provides, it walks them into semantic HTML
   with token-styled editorial typography. Adding a block type = one case here +
   the union in content/blog.ts. Presentational; the reading column width is owned
   by the article page. */
export function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className={s.body}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <h2 key={i} className={s.heading}>{block.text}</h2>;
          case "paragraph":
            return <p key={i} className={s.paragraph}>{block.text}</p>;
          case "image":
            return (
              <figure key={i} className={s.figure}>
                <img className={s.image} src={block.src} alt={block.caption ?? ""} />
                {block.caption && <figcaption className={s.caption}>{block.caption}</figcaption>}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className={s.quote}>
                <p className={s.quoteText}>{block.text}</p>
                {block.cite && <cite className={s.quoteCite}>{block.cite}</cite>}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className={s.list}>
                {block.items.map((item, j) => (
                  <li key={j} className={s.listItem}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
