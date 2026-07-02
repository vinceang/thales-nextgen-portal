// deezer-snapshot.mjs — build-time Deezer catalogue snapshot for the Listen page.
//
// Mirrors scripts/tmdb-snapshot.mjs, but for music — and Deezer's public API
// needs NO key/token/auth at all, so there's no .env to manage. Fetches chart +
// new-release + genre rows, then each album's full detail (label, genres,
// tracklist with durations) and maps to the app's ListenAlbum shape, writing
// src/content/data/listen.json (committed). Cover art is Deezer's public CDN.
//
// The Listen seam reads that JSON and stays synchronous; when empty it falls
// back to the placeholder catalogue, so the app always builds with no network.
//
// Usage:
//   node scripts/deezer-snapshot.mjs                # refresh now (fails loudly)
//   node scripts/deezer-snapshot.mjs --if-stale     # refresh only if stale; fail-open
//   node scripts/deezer-snapshot.mjs --stage        # `git add` the result
//   flags: --max-age-hours=48
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PORTAL_ROOT = dirname(SCRIPT_DIR);
const OUT_FILE = join(PORTAL_ROOT, "src/content/data/listen.json");
const DEEZER = "https://api.deezer.com";

const args = process.argv.slice(2);
const IF_STALE = args.includes("--if-stale");
const STAGE = args.includes("--stage");
const maxAgeArg = args.find((a) => a.startsWith("--max-age-hours"));
const MAX_AGE_HOURS = maxAgeArg ? Number(maxAgeArg.split(/[=\s]/)[1] ?? args[args.indexOf(maxAgeArg) + 1]) : 48;

// In --if-stale (hook) mode we never block the commit: warn and exit 0.
function bail(msg) {
  const softly = IF_STALE;
  console[softly ? "warn" : "error"](`[deezer-snapshot] ${msg}`);
  process.exit(softly ? 0 : 1);
}

// ── staleness guard ───────────────────────────────────────────────────────────
if (IF_STALE && existsSync(OUT_FILE)) {
  try {
    const prev = JSON.parse(readFileSync(OUT_FILE, "utf8"));
    if (prev.generatedAt) {
      const ageH = (Date.now() - new Date(prev.generatedAt).getTime()) / 36e5;
      if (ageH < MAX_AGE_HOURS) {
        console.log(`[deezer-snapshot] snapshot is fresh (${ageH.toFixed(1)}h < ${MAX_AGE_HOURS}h) — skipping.`);
        process.exit(0);
      }
    }
  } catch {
    /* unreadable snapshot — regenerate */
  }
}

// ── Deezer client (no auth). Deezer returns errors as { error } with HTTP 200,
// and rate-limits at ~50 requests / 5s. A shared interval gate spaces requests
// out (~7/s, safely under the cap) even when called via Promise.all, and quota
// errors (code 4) back off and retry. ────────────────────────────────────────
const MIN_INTERVAL_MS = 140;
let nextSlot = 0;
async function throttle() {
  const now = Date.now();
  const wait = Math.max(0, nextSlot - now);
  nextSlot = Math.max(now, nextSlot) + MIN_INTERVAL_MS;
  if (wait) await new Promise((r) => setTimeout(r, wait));
}
async function api(path, tries = 5) {
  for (let attempt = 1; ; attempt++) {
    await throttle();
    const res = await fetch(`${DEEZER}${path}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${path}`);
    const body = await res.json();
    if (body && body.error) {
      const quota = body.error.code === 4;
      if (quota && attempt < tries) {
        await new Promise((r) => setTimeout(r, 2000 * attempt)); // linear backoff
        continue;
      }
      throw new Error(`Deezer error on ${path}: ${JSON.stringify(body.error)}`);
    }
    return body;
  }
}

async function pool(items, size, fn) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  }
  return out;
}

// ── mapping helpers ───────────────────────────────────────────────────────────
const fmtLen = (secs) => (secs ? `${Math.round(secs / 60)} min` : "");
const fmtTrack = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
// Fan counts span millions → compress to a plausible 55–99 "listener score".
const fansToScore = (fans) => Math.max(55, Math.min(99, 55 + Math.round(Math.log10((fans || 0) + 1) * 7)));

// One Deezer album detail → the app's ListenAlbum shape.
function toAlbum(a) {
  return {
    id: String(a.id),
    title: a.title,
    artist: a.artist?.name ?? "",
    cover: a.cover_xl || a.cover_big || a.cover_medium,
    year: Number((a.release_date || "").slice(0, 4)) || 0,
    genre: a.genres?.data?.[0]?.name ?? "",
    label: a.label || "",
    length: fmtLen(a.duration),
    score: fansToScore(a.fans),
    about: "", // Deezer has no album descriptions
    tracks: (a.tracks?.data ?? []).map((t) => ({
      id: String(t.id),
      title: t.title,
      duration: fmtTrack(t.duration || 0),
    })),
  };
}

// Rows map to the existing GenrePill keys (labels stay in the app via t()).
// Deezer genre ids: 132 Pop · 116 Rap/Hip-Hop · 152 Rock. "chill" isn't a genre,
// so it's a ranked search. Order matches content/listen.ts.
const ROWS = [
  { key: "newReleases", path: "/editorial/0/releases?limit=14" },
  { key: "topCharts", path: "/chart/0/albums?limit=14" },
  { key: "pop", path: "/chart/132/albums?limit=14" },
  { key: "hiphop", path: "/chart/116/albums?limit=14" },
  { key: "rock", path: "/chart/152/albums?limit=14" },
  { key: "chill", path: "/search/album?q=chill&order=RANKING&limit=14" },
];
const ROW_LIMIT = 12;

async function main() {
  // Collect each row's album ids (in order), dedup for detail fetching.
  const rowIds = {};
  const wanted = new Set();
  for (const row of ROWS) {
    const data = await api(row.path);
    const ids = (data.data ?? [])
      .filter((x) => x && x.id)
      .slice(0, ROW_LIMIT)
      .map((x) => x.id);
    rowIds[row.key] = ids;
    ids.forEach((id) => wanted.add(id));
  }

  // Full detail per unique album (label, genres, tracklist, fans).
  const details = await pool([...wanted], 6, async (id) => {
    try {
      return await api(`/album/${id}`);
    } catch (e) {
      console.warn(`[deezer-snapshot] skipping album ${id}: ${e.message}`);
      return null;
    }
  });
  const byId = new Map(details.filter(Boolean).map((a) => [String(a.id), toAlbum(a)]));

  const rows = ROWS.map((row) => ({
    key: row.key,
    items: rowIds[row.key].map((id) => byId.get(String(id))).filter(Boolean),
  })).filter((r) => r.items.length);

  // Hero = top chart albums.
  const chart = await api("/chart/0/albums?limit=6");
  const slides = (chart.data ?? [])
    .filter((a) => a.cover_xl || a.cover_big)
    .slice(0, 3)
    .map((a) => ({ id: `lh-${a.id}`, cover: a.cover_xl || a.cover_big, title: a.title, artist: a.artist?.name ?? "" }));

  const snapshot = { generatedAt: new Date().toISOString(), source: "Deezer", hero: { slides }, rows };
  writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`[deezer-snapshot] wrote ${rows.length} rows / ${byId.size} unique albums → ${OUT_FILE}`);

  if (STAGE) {
    try {
      execFileSync("git", ["add", OUT_FILE], { stdio: "ignore" });
      console.log("[deezer-snapshot] staged listen.json");
    } catch {
      /* not fatal */
    }
  }
}

main().catch((e) => bail(`snapshot failed: ${e.message}`));
