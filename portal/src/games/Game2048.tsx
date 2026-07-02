import { useCallback, useEffect, useRef, useState } from "react";
import type { GameProps } from "./registry";
import s from "./Game2048.module.css";

/* 2048 — an original implementation of the sliding-tile merge puzzle (the
   mechanic + name are generic; no third-party code or assets). Self-contained and
   fully offline: keyboard (arrows / WASD) + touch swipe, best score persisted to
   localStorage like the rest of the app. Turn-based, so no game-loop/timing bugs.
   Styled with tokens — monochrome tiles ramping toward the one accent hue. */

type Board = number[][];
const SIZE = 4;
const BEST_KEY = "thales.game.2048.best";

const empty = (): Board => Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

function spawn(board: Board): Board {
  const free: [number, number][] = [];
  board.forEach((row, r) => row.forEach((v, c) => v === 0 && free.push([r, c])));
  if (!free.length) return board;
  const [r, c] = free[Math.floor(Math.random() * free.length)];
  const next = board.map((row) => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function start(): Board {
  return spawn(spawn(empty()));
}

// Compress + merge a single line toward index 0.
function compress(line: number[]): { line: number[]; gained: number } {
  const nums = line.filter((v) => v);
  const out: number[] = [];
  let gained = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      const merged = nums[i] * 2;
      out.push(merged);
      gained += merged;
      i++;
    } else {
      out.push(nums[i]);
    }
  }
  while (out.length < SIZE) out.push(0);
  return { line: out, gained };
}

type Dir = "left" | "right" | "up" | "down";
// Map a line position (i = which line, j = position along it) to a board cell.
function cell(i: number, j: number, dir: Dir): [number, number] {
  switch (dir) {
    case "left": return [i, j];
    case "right": return [i, SIZE - 1 - j];
    case "up": return [j, i];
    case "down": return [SIZE - 1 - j, i];
  }
}

function move(board: Board, dir: Dir): { board: Board; gained: number; moved: boolean } {
  const next = empty();
  let gained = 0;
  let moved = false;
  for (let i = 0; i < SIZE; i++) {
    const line = Array.from({ length: SIZE }, (_, j) => {
      const [r, c] = cell(i, j, dir);
      return board[r][c];
    });
    const res = compress(line);
    gained += res.gained;
    res.line.forEach((v, j) => {
      const [r, c] = cell(i, j, dir);
      next[r][c] = v;
      if (board[r][c] !== v) moved = true;
    });
  }
  return { board: next, gained, moved };
}

function movesLeft(board: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return true;
      if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return true;
      if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}

// Tile background ramps from a flat surface (low) toward the accent (high).
function tileStyle(v: number): React.CSSProperties {
  if (!v) return {};
  const level = Math.log2(v); // 1..11+
  const pct = Math.min(100, level * 9);
  return {
    background: `color-mix(in srgb, var(--accent) ${pct}%, var(--color-surface-3))`,
    color: "var(--color-white)",
    fontSize: v >= 1000 ? "clamp(18px, 6vw, 30px)" : v >= 100 ? "clamp(22px, 7vw, 36px)" : "clamp(26px, 8vw, 42px)",
  };
}

export default function Game2048({ t }: GameProps) {
  const [board, setBoard] = useState<Board>(start);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(BEST_KEY) : null;
    return raw ? Number(raw) || 0 : 0;
  });
  const [status, setStatus] = useState<"playing" | "won" | "over">("playing");
  const keptPlaying = useRef(false);

  const apply = useCallback(
    (dir: Dir) => {
      setBoard((cur) => {
        if (status === "over") return cur;
        const res = move(cur, dir);
        if (!res.moved) return cur;
        const next = spawn(res.board);
        if (res.gained) {
          setScore((sc) => {
            const total = sc + res.gained;
            setBest((b) => {
              const nb = Math.max(b, total);
              try { window.localStorage.setItem(BEST_KEY, String(nb)); } catch { /* storage off */ }
              return nb;
            });
            return total;
          });
        }
        if (!keptPlaying.current && next.some((row) => row.some((v) => v >= 2048))) setStatus("won");
        else if (!movesLeft(next)) setStatus("over");
        return next;
      });
    },
    [status],
  );

  // Keyboard — arrows + WASD.
  useEffect(() => {
    const keys: Record<string, Dir> = {
      ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right",
      ArrowUp: "up", w: "up", ArrowDown: "down", s: "down",
    };
    function onKey(e: KeyboardEvent) {
      const dir = keys[e.key];
      if (!dir) return;
      e.preventDefault();
      apply(dir);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [apply]);

  // Touch — swipe, dominant axis, small threshold.
  const touch = useRef<{ x: number; y: number } | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    touch.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) apply(dx > 0 ? "right" : "left");
    else apply(dy > 0 ? "down" : "up");
  }

  function reset() {
    keptPlaying.current = false;
    setBoard(start());
    setScore(0);
    setStatus("playing");
  }

  return (
    <div className={s.wrap}>
      <div className={s.scores}>
        <div className={s.scoreBox}>
          <span className={s.scoreLabel}>{t("play.score")}</span>
          <span className={s.scoreValue}>{score}</span>
        </div>
        <div className={s.scoreBox}>
          <span className={s.scoreLabel}>{t("play.best")}</span>
          <span className={s.scoreValue}>{best}</span>
        </div>
        <button className={s.newBtn} onClick={reset}>{t("play.newGame")}</button>
      </div>

      <div className={s.boardWrap} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className={s.board}>
          {board.map((row, r) =>
            row.map((v, c) => (
              <div key={`${r}-${c}`} className={s.cell} data-filled={v ? "" : undefined} style={tileStyle(v)}>
                {v || ""}
              </div>
            )),
          )}
        </div>

        {status !== "playing" && (
          <div className={s.overlay}>
            <p className={s.overlayTitle}>{status === "won" ? t("play.youWin") : t("play.gameOver")}</p>
            <div className={s.overlayActions}>
              {status === "won" && (
                <button className={s.newBtn} onClick={() => { keptPlaying.current = true; setStatus("playing"); }}>
                  {t("play.keepGoing")}
                </button>
              )}
              <button className={s.newBtn} data-primary="" onClick={reset}>{t("play.newGame")}</button>
            </div>
          </div>
        )}
      </div>

      <p className={s.hint}>{t("play.hint2048")}</p>
    </div>
  );
}
