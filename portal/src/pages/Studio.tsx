import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Input, TextArea, Select, Checkbox, Button, Badge, Icon } from "../design-system/components";
import { PostBody } from "../components/blog/PostBody";
import { getSectionMeta, type BlogBlock, type BlogPost, type BlogSection } from "../content/blog";
import { loadDrafts, saveDraft, deleteDraft, getDraft, slugify } from "../content/blogStore";
import { useI18n } from "../i18n";
import s from "./Studio.module.css";

/* Studio — the in-app "CMS" editor. A structured block editor over the portable
   BlogPost model: author metadata + typed body blocks, persisted to localStorage
   via blogStore, and rendered live through the same PostBody the public articles
   use. Drafts appear immediately in their section (blog.ts merges them). This is
   the authoring surface a headless CMS would otherwise provide; it's intentionally
   English-only (an admin tool, not a passenger-facing screen). */

interface EditorState {
  section: BlogSection;
  title: string;
  excerpt: string;
  cover: string;
  authorName: string;
  authorRole: string;
  date: string;
  readTime: string;
  tags: string;
  featured: boolean;
  blocks: BlogBlock[];
}

const today = () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

function blankState(section: BlogSection): EditorState {
  return {
    section,
    title: "",
    excerpt: "",
    cover: "",
    authorName: "",
    authorRole: "",
    date: today(),
    readTime: "5 min read",
    tags: "",
    featured: false,
    blocks: [{ type: "paragraph", text: "" }],
  };
}

function fromPost(p: BlogPost): EditorState {
  return {
    section: p.section,
    title: p.title,
    excerpt: p.excerpt,
    cover: p.cover,
    authorName: p.author.name,
    authorRole: p.author.role ?? "",
    date: p.date,
    readTime: p.readTime,
    tags: p.tags.join(", "),
    featured: !!p.featured,
    blocks: p.body.length ? p.body : [{ type: "paragraph", text: "" }],
  };
}

const NEW_BLOCK: Record<BlogBlock["type"], () => BlogBlock> = {
  heading: () => ({ type: "heading", text: "" }),
  paragraph: () => ({ type: "paragraph", text: "" }),
  quote: () => ({ type: "quote", text: "", cite: "" }),
  list: () => ({ type: "list", items: [""] }),
  image: () => ({ type: "image", src: "", caption: "" }),
};

const BLOCK_LABEL: Record<BlogBlock["type"], string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  quote: "Quote",
  list: "List",
  image: "Image",
};

export default function Studio() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const paramSection = (params.get("section") as BlogSection) || "destinations";
  const editSlug = params.get("slug");

  // Initialise once from an edited draft (if any) or a blank post.
  const [draft, setDraft] = useState<EditorState>(() => {
    if (editSlug) {
      const existing = getDraft(paramSection, editSlug);
      if (existing) return fromPost(existing);
    }
    return blankState(paramSection);
  });
  const [origSlug, setOrigSlug] = useState<string | null>(editSlug && getDraft(paramSection, editSlug) ? editSlug : null);
  const [preview, setPreview] = useState(false);
  const [tick, setTick] = useState(0); // re-read drafts list after mutations

  const patch = (p: Partial<EditorState>) => setDraft((d) => ({ ...d, ...p }));
  const setBlock = (i: number, b: BlogBlock) => setDraft((d) => ({ ...d, blocks: d.blocks.map((x, idx) => (idx === i ? b : x)) }));
  const addBlock = (type: BlogBlock["type"]) => setDraft((d) => ({ ...d, blocks: [...d.blocks, NEW_BLOCK[type]()] }));
  const removeBlock = (i: number) => setDraft((d) => ({ ...d, blocks: d.blocks.filter((_, idx) => idx !== i) }));
  const moveBlock = (i: number, dir: -1 | 1) =>
    setDraft((d) => {
      const j = i + dir;
      if (j < 0 || j >= d.blocks.length) return d;
      const blocks = [...d.blocks];
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      return { ...d, blocks };
    });

  const canSave = draft.title.trim().length > 0;

  function toPost(): BlogPost {
    const slug = origSlug ?? slugify(draft.title);
    return {
      slug,
      section: draft.section,
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim(),
      cover: draft.cover.trim() || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      author: { name: draft.authorName.trim() || "Guest Author", role: draft.authorRole.trim() || undefined },
      date: draft.date.trim() || today(),
      readTime: draft.readTime.trim() || "5 min read",
      tags: draft.tags.split(",").map((x) => x.trim()).filter(Boolean),
      featured: draft.featured,
      body: draft.blocks,
    };
  }

  function save() {
    if (!canSave) return;
    const post = toPost();
    // If the title changed on an existing draft, drop the old slug entry.
    if (origSlug && origSlug !== post.slug) deleteDraft(post.section, origSlug);
    saveDraft(post);
    navigate(`/${post.section}/${post.slug}`);
  }

  function removeCurrent() {
    if (origSlug) deleteDraft(draft.section, origSlug);
    navigate(`/${draft.section}`);
  }

  const drafts = (() => { void tick; return loadDrafts(); })();
  const previewPost = toPost();

  return (
    <div className={s.page}>
      <header className={s.head}>
        <div>
          <h1 className={s.title}>Content Studio</h1>
          <p className={s.subtitle}>Create and edit posts. Saved to this browser — drafts appear live in their section.</p>
        </div>
        <div className={s.headActions}>
          <Button variant="secondary" onClick={() => setPreview((v) => !v)}>
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button onClick={save} disabled={!canSave}>Save & View</Button>
        </div>
      </header>

      {preview ? (
        <Card padding={24}>
          <div className={s.previewMeta}>
            <span className={s.previewKicker}>{previewPost.tags[0] ?? "Untitled"}</span>
            <h2 className={s.previewTitle}>{previewPost.title || "Untitled post"}</h2>
            <p className={s.previewExcerpt}>{previewPost.excerpt}</p>
          </div>
          <PostBody blocks={draft.blocks} />
        </Card>
      ) : (
        <>
          {/* Post metadata */}
          <Card title="Post details" padding={24}>
            <div className={s.fieldCol}>
              <div className={s.grid2}>
                <Select
                  label="Section"
                  options={[
                    { value: "destinations", label: getSectionMeta("destinations", t).title },
                    { value: "travel", label: getSectionMeta("travel", t).title },
                  ]}
                  value={draft.section}
                  onChange={(e) => patch({ section: e.target.value as BlogSection })}
                />
                <Input label="Read time" placeholder="6 min read" value={draft.readTime} onChange={(e) => patch({ readTime: e.target.value })} />
              </div>
              <Input label="Title" placeholder="A day at Epcot" value={draft.title} onChange={(e) => patch({ title: e.target.value })} />
              <TextArea label="Excerpt" rows={2} placeholder="One-line deck shown on cards and under the hero." value={draft.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} />
              <Input label="Cover image URL" placeholder="https://…" value={draft.cover} onChange={(e) => patch({ cover: e.target.value })} />
              <div className={s.grid2}>
                <Input label="Author" placeholder="Your name" value={draft.authorName} onChange={(e) => patch({ authorName: e.target.value })} />
                <Input label="Author role" placeholder="Contributor" value={draft.authorRole} onChange={(e) => patch({ authorRole: e.target.value })} />
              </div>
              <div className={s.grid2}>
                <Input label="Date" placeholder="July 1, 2026" value={draft.date} onChange={(e) => patch({ date: e.target.value })} />
                <Input label="Tags (comma-separated)" placeholder="Orlando, Family" value={draft.tags} onChange={(e) => patch({ tags: e.target.value })} />
              </div>
              <Checkbox checked={draft.featured} onChange={(v) => patch({ featured: v })}>
                Feature as the section's lead story
              </Checkbox>
            </div>
          </Card>

          {/* Block body editor */}
          <Card title="Body" padding={24}>
            <div className={s.blocks}>
              {draft.blocks.map((block, i) => (
                <div key={i} className={s.block}>
                  <div className={s.blockBar}>
                    <span className={s.blockType}>{BLOCK_LABEL[block.type]}</span>
                    <div className={s.blockTools}>
                      <button type="button" className={s.iconBtn} aria-label="Move up" disabled={i === 0} onClick={() => moveBlock(i, -1)}>
                        <Icon name="chevron-up" size={16} />
                      </button>
                      <button type="button" className={s.iconBtn} aria-label="Move down" disabled={i === draft.blocks.length - 1} onClick={() => moveBlock(i, 1)}>
                        <Icon name="chevron-down" size={16} />
                      </button>
                      <button type="button" className={s.iconBtn} aria-label="Remove block" onClick={() => removeBlock(i)}>
                        <Icon name="x" size={16} />
                      </button>
                    </div>
                  </div>
                  <BlockFields block={block} onChange={(b) => setBlock(i, b)} />
                </div>
              ))}
            </div>

            <div className={s.addRow}>
              {(Object.keys(NEW_BLOCK) as BlogBlock["type"][]).map((type) => (
                <Button key={type} variant="secondary" size="sm" onClick={() => addBlock(type)}>
                  + {BLOCK_LABEL[type]}
                </Button>
              ))}
            </div>
          </Card>

          {origSlug && (
            <div className={s.deleteRow}>
              <Button variant="secondary" onClick={removeCurrent}>Delete this draft</Button>
            </div>
          )}
        </>
      )}

      {/* Existing drafts */}
      <Card title="Your drafts" padding={24}>
        {drafts.length === 0 ? (
          <p className={s.empty}>No drafts yet. Create one above — it saves to this browser.</p>
        ) : (
          <div className={s.draftList}>
            {drafts.map((p) => (
              <div key={`${p.section}/${p.slug}`} className={s.draftRow}>
                <div className={s.draftText}>
                  <span className={s.draftTitle}>{p.title}</span>
                  <span className={s.draftMeta}>
                    <Badge>{getSectionMeta(p.section, t).title}</Badge> {p.date}
                  </span>
                </div>
                <div className={s.draftActions}>
                  <Button variant="secondary" size="sm" onClick={() => navigate(`/studio?section=${p.section}&slug=${p.slug}`)}>Edit</Button>
                  <Button variant="secondary" size="sm" onClick={() => { deleteDraft(p.section, p.slug); if (origSlug === p.slug) { setOrigSlug(null); setDraft(blankState(draft.section)); } setTick((n) => n + 1); }}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* Per-type field editor for a single block. */
function BlockFields({ block, onChange }: { block: BlogBlock; onChange: (b: BlogBlock) => void }) {
  switch (block.type) {
    case "heading":
      return <Input placeholder="Section heading" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />;
    case "paragraph":
      return <TextArea rows={3} placeholder="Write a paragraph…" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />;
    case "quote":
      return (
        <div className={s.fieldCol}>
          <TextArea rows={2} placeholder="Pull quote…" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
          <Input placeholder="Attribution (optional)" value={block.cite ?? ""} onChange={(e) => onChange({ ...block, cite: e.target.value })} />
        </div>
      );
    case "image":
      return (
        <div className={s.fieldCol}>
          <Input placeholder="Image URL" value={block.src} onChange={(e) => onChange({ ...block, src: e.target.value })} />
          <Input placeholder="Caption (optional)" value={block.caption ?? ""} onChange={(e) => onChange({ ...block, caption: e.target.value })} />
        </div>
      );
    case "list":
      return (
        <div className={s.fieldCol}>
          {block.items.map((item, j) => (
            <div key={j} className={s.listItemRow}>
              <Input placeholder={`Item ${j + 1}`} value={item} onChange={(e) => onChange({ ...block, items: block.items.map((it, k) => (k === j ? e.target.value : it)) })} />
              <button type="button" className={s.iconBtn} aria-label="Remove item" onClick={() => onChange({ ...block, items: block.items.filter((_, k) => k !== j) })}>
                <Icon name="x" size={16} />
              </button>
            </div>
          ))}
          <div>
            <Button variant="secondary" size="sm" onClick={() => onChange({ ...block, items: [...block.items, ""] })}>+ Item</Button>
          </div>
        </div>
      );
    default:
      return null;
  }
}
