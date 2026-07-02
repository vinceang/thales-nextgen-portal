import { useEffect, useState } from "react";
import { Icon } from "../design-system/components";
import { GAMES } from "../games/registry";
import type { TFunc } from "../i18n";
import s from "./GameLauncher.module.css";

/* GameLauncher — the full-screen "cabinet" a playable game runs in. Looks the
   game up in the registry by key, mounts it, and owns the chrome: title, Restart
   (remounts the game via a changing key), and Close (Esc too). Locks page scroll
   while open. Neutral frame so both on-brand originals and (later) bundled games
   sit in the same shell. Rendered by the Play page when a game is launched. */
export interface GameLauncherProps {
  gameKey: string | null;
  title: string;
  onClose: () => void;
  t: TFunc;
}

export function GameLauncher({ gameKey, title, onClose, t }: GameLauncherProps) {
  const [nonce, setNonce] = useState(0); // bump to remount (restart) the game

  // Esc closes; lock body scroll while the cabinet is open.
  useEffect(() => {
    if (!gameKey) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [gameKey, onClose]);

  if (!gameKey) return null;
  const Game = GAMES[gameKey];
  if (!Game) return null;

  return (
    <div className={s.cabinet} role="dialog" aria-modal="true" aria-label={title}>
      <header className={s.bar}>
        <span className={s.title}>{title}</span>
        <div className={s.controls}>
          <button className={s.control} onClick={() => setNonce((n) => n + 1)}>
            {t("play.restart")}
          </button>
          <button className={s.close} onClick={onClose} aria-label={t("play.exit")}>
            <Icon name="x" size={18} strokeWidth={2.2} />
          </button>
        </div>
      </header>
      <div className={s.stage}>
        <Game key={nonce} t={t} />
      </div>
    </div>
  );
}
