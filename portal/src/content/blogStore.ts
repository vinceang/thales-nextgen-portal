// Blog draft store — the local (browser) "CMS" backing the in-app Studio editor.
//
// This is the runtime authoring layer: posts created in /studio are persisted to
// localStorage and merged with the seeded posts by content/blog.ts. It mirrors
// the FavoritesProvider persistence pattern. A real headless CMS would replace
// this module (and blog.ts's merge) with network calls returning the same
// BlogPost shape — nothing downstream changes.
import type { BlogPost, BlogSection } from "./blog";

const KEY = "thales.blog.drafts.v1";

/** All author-created posts (across sections). Safe on SSR / disabled storage. */
export function loadDrafts(): BlogPost[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BlogPost[]) : [];
  } catch {
    return [];
  }
}

function writeDrafts(posts: BlogPost[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(posts));
  } catch {
    /* storage full / unavailable — drafts simply won't persist */
  }
}

/** Create or update a draft (keyed by section + slug). Newest kept at the front. */
export function saveDraft(post: BlogPost) {
  const rest = loadDrafts().filter((p) => !(p.section === post.section && p.slug === post.slug));
  writeDrafts([post, ...rest]);
}

export function deleteDraft(section: BlogSection, slug: string) {
  writeDrafts(loadDrafts().filter((p) => !(p.section === section && p.slug === slug)));
}

export function getDraft(section: BlogSection, slug: string): BlogPost | undefined {
  return loadDrafts().find((p) => p.section === section && p.slug === slug);
}

export function isDraft(section: BlogSection, slug: string): boolean {
  return loadDrafts().some((p) => p.section === section && p.slug === slug);
}

/** URL-safe slug from a title. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
