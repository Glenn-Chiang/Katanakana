export type Kana = {
  id: string;
  kana: string;
};
export type GameState = "pre-game" | "in-game" | "post-game";

export const kanaTypes = ["hiragana", "katakana", "all"] as const;
export type KanaType = (typeof kanaTypes)[number];
export type GameMode = "chill" | "frenzy";
