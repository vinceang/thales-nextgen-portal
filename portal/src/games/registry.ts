// Game registry — maps a `gameKey` (from content/play.ts) to a playable module.
//
// Each game is a self-contained React component, fully offline (no network, no
// external assets). The GameLauncher looks a game up here by key and mounts it in
// a full-screen cabinet. Adding a game = drop a component in src/games/ and add
// one line here; mark the matching catalogue entry `gameKey` to make it playable.
// (Bundled open-source games, when added, live in their own subfolder with their
// license/attribution preserved — see games/NOTICE.md.)
import type { ComponentType } from "react";
import type { TFunc } from "../i18n";
import Game2048 from "./Game2048";

/** Props every game component receives from the launcher. */
export interface GameProps {
  t: TFunc;
}

export const GAMES: Record<string, ComponentType<GameProps>> = {
  "2048": Game2048,
};

export const isPlayable = (gameKey?: string): boolean => !!gameKey && gameKey in GAMES;
