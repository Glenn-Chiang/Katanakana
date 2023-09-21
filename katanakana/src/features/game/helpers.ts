import { Kana } from "../../types.ts";
import { KanaType } from "../../types.ts";
import hiraganaList from "../../constants/hiragana.ts";
import katakanaList from "../../constants/katakana.ts";

const getRandomKana = (kanas: Kana[]) => {
  const randomIndex = Math.floor(Math.random() * kanas.length);
  return kanas[randomIndex];
};

const getKanas = (kanaType: KanaType): Kana[] => {
  let kanas;
  switch (kanaType) {
    case "hiragana":
      kanas = hiraganaList;
      break;
    case "katakana":
      kanas = katakanaList;
      break;
    case "all":
      kanas = hiraganaList.concat(katakanaList); 
  }
  return kanas;
};

export { getKanas, getRandomKana };
