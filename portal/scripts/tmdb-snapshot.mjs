// tmdb-snapshot.mjs — build-time TMDB catalogue snapshot for the Watch page.
//
// Fetches a real movie catalogue from TMDB and writes it into the app as
// src/content/data/watch.json (committed). The Watch content seam reads that
// JSON and stays synchronous; if the snapshot is empty/missing the page falls
// back to its placeholder catalogue, so the app always builds — even with no
// token and no network.
//
// The key (a TMDB v4 Read Access Token) is read from portal/.env.local (git-
// ignored) or the environment. It is used ONLY here, at snapshot time — it is
// never bundled or shipped to the browser. Images use TMDB's public CDN, which
// needs no key at runtime.
//
// Usage:
//   node scripts/tmdb-snapshot.mjs                 # refresh now (fails loudly)
//   node scripts/tmdb-snapshot.mjs --if-stale      # refresh only if stale; fail-open
//   node scripts/tmdb-snapshot.mjs --stage         # `git add` the result after writing
//   flags: --max-age-hours=48  (default staleness window for --if-stale)
//
// The pre-commit hook runs it as: --if-stale --stage --max-age-hours 48
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PORTAL_ROOT = dirname(SCRIPT_DIR);
const OUT_FILE = join(PORTAL_ROOT, "src/content/data/watch.json");
const TMDB = "https://api.themoviedb.org/3";

// ── args ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const IF_STALE = has("--if-stale");
const STAGE = has("--stage");
const maxAgeArg = args.find((a) => a.startsWith("--max-age-hours"));
const MAX_AGE_HOURS = maxAgeArg ? Number(maxAgeArg.split(/[=\s]/)[1] ?? args[args.indexOf(maxAgeArg) + 1]) : 48;

// In --if-stale (hook) mode we never block the commit: warn and exit 0.
// In manual mode we exit non-zero so a failed refresh is obvious.
function bail(msg) {
  const softly = IF_STALE;
  console[softly ? "warn" : "error"](`[tmdb-snapshot] ${msg}`);
  process.exit(softly ? 0 : 1);
}

// ── env: load portal/.env.local then .env (without overriding real env) ───────
for (const name of [".env.local", ".env"]) {
  const p = join(PORTAL_ROOT, name);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2].replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}

// ── staleness guard (before the token check, so a fresh snapshot skips quietly) ─
if (IF_STALE && existsSync(OUT_FILE)) {
  try {
    const prev = JSON.parse(readFileSync(OUT_FILE, "utf8"));
    if (prev.generatedAt) {
      const ageH = (Date.now() - new Date(prev.generatedAt).getTime()) / 36e5;
      if (ageH < MAX_AGE_HOURS) {
        console.log(`[tmdb-snapshot] snapshot is fresh (${ageH.toFixed(1)}h < ${MAX_AGE_HOURS}h) — skipping.`);
        process.exit(0);
      }
    }
  } catch {
    /* unreadable snapshot — fall through and regenerate */
  }
}

const TOKEN = process.env.TMDB_READ_TOKEN;
if (!TOKEN) {
  bail("No TMDB_READ_TOKEN found (set it in portal/.env.local). Skipping snapshot.");
}

// ── TMDB client ───────────────────────────────────────────────────────────────
const headers = { Authorization: `Bearer ${TOKEN}`, accept: "application/json" };
async function api(path) {
  const res = await fetch(`${TMDB}${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${path}`);
  return res.json();
}

// Small concurrency pool so we're gentle on the rate limit.
async function pool(items, size, fn) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  }
  return out;
}

// ── mapping helpers ───────────────────────────────────────────────────────────
let imgBase = "https://image.tmdb.org/t/p/";
const img = (size, path) => (path ? `${imgBase}${size}${path}` : undefined);
const fmtRuntime = (min) => (!min ? "" : min >= 60 ? `${Math.floor(min / 60)}h ${min % 60}m` : `${min}m`);
const fmtDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y} (US)`;
};
function usCert(detail) {
  const us = (detail.release_dates?.results ?? []).find((r) => r.iso_3166_1 === "US");
  return (us?.release_dates ?? []).map((d) => d.certification).find((c) => c) || "NR";
}

// One TMDB movie detail → the app's WatchMovie shape.
function toMovie(d) {
  const director = (d.credits?.crew ?? []).find((c) => c.job === "Director")?.name ?? "";
  const cast = (d.credits?.cast ?? []).slice(0, 5).map((c) => ({
    id: String(c.id),
    name: c.name,
    character: c.character || "",
    photo: img("w185", c.profile_path),
  }));
  return {
    id: String(d.id),
    title: d.title,
    poster: img("w500", d.poster_path),
    backdrop: img("w780", d.backdrop_path),
    year: Number((d.release_date || "").slice(0, 4)) || 0,
    certification: usCert(d),
    releaseDate: fmtDate(d.release_date),
    genres: (d.genres ?? []).map((g) => g.name).join(", "),
    runtime: fmtRuntime(d.runtime),
    score: Math.round((d.vote_average ?? 0) * 10),
    tagline: d.tagline || "",
    overview: d.overview || "",
    director,
    cast,
  };
}

// Rows map to the existing GenrePill keys (i18n labels stay in the app via t()).
const GENRE_ROWS = [
  { key: "action", genre: 28 },
  { key: "comedy", genre: 35 },
  { key: "scifi", genre: 878 },
  { key: "drama", genre: 18 },
  { key: "documentary", genre: 99 },
];
const discover = (genre) =>
  `/discover/movie?with_genres=${genre}&sort_by=popularity.desc&vote_count.gte=200&include_adult=false&language=en-US`;
const ROW_LIMIT = 12;

async function main() {
  // Image base URL/sizes from TMDB configuration.
  try {
    const cfg = await api("/configuration");
    if (cfg.images?.secure_base_url) imgBase = cfg.images.secure_base_url;
  } catch {
    /* keep the default image base */
  }

  // Assemble each row's movie ids (poster-bearing only), preserving order.
  const rowDefs = [
    { key: "trending", path: "/trending/movie/week?language=en-US" },
    { key: "newReleases", path: "/movie/now_playing?language=en-US&region=US" },
    ...GENRE_ROWS.map((g) => ({ key: g.key, path: discover(g.genre) })),
  ];

  const rowIds = {};
  const wanted = new Set();
  for (const def of rowDefs) {
    const data = await api(def.path);
    const ids = (data.results ?? [])
      .filter((m) => m.poster_path)
      .slice(0, ROW_LIMIT)
      .map((m) => m.id);
    rowIds[def.key] = ids;
    ids.forEach((id) => wanted.add(id));
  }

  // Fetch full detail (credits + certifications) for every unique movie.
  const details = await pool([...wanted], 8, async (id) => {
    try {
      return await api(`/movie/${id}?append_to_response=credits,release_dates&language=en-US`);
    } catch (e) {
      console.warn(`[tmdb-snapshot] skipping movie ${id}: ${e.message}`);
      return null;
    }
  });
  const byId = new Map(details.filter(Boolean).map((d) => [d.id, toMovie(d)]));

  const rows = rowDefs
    .map((def) => ({ key: def.key, items: rowIds[def.key].map((id) => byId.get(id)).filter(Boolean) }))
    .filter((r) => r.items.length);

  // Hero = top trending backdrops.
  const trending = await api("/trending/movie/week?language=en-US");
  const slides = (trending.results ?? [])
    .filter((m) => m.backdrop_path)
    .slice(0, 3)
    .map((m) => ({ id: `h-${m.id}`, image: img("w1280", m.backdrop_path), title: m.title }));

  const snapshot = { generatedAt: new Date().toISOString(), source: "TMDB", hero: { slides }, rows };
  writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2) + "\n");
  const count = rows.reduce((n, r) => n + r.items.length, 0);
  console.log(`[tmdb-snapshot] wrote ${rows.length} rows / ${byId.size} unique movies → ${OUT_FILE}`);

  if (STAGE) {
    try {
      execFileSync("git", ["add", OUT_FILE], { stdio: "ignore" });
      console.log("[tmdb-snapshot] staged watch.json");
    } catch {
      /* not fatal — the file is written regardless */
    }
  }
  void count;
}

main().catch((e) => bail(`snapshot failed: ${e.message}`));
