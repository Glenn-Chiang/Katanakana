import { useState } from "react";
import hiraganaList from "../../kanaData/hiragana.js";
import katakanaList from "../../kanaData/katakana.js";
import { Kana } from "../../types.js";
import KanaCard from "../../components/KanaCard.js";

type KanaType = "hiragana" | "katakana";

export default function Scrolls() {
  const [kanaType, setKanaType] = useState<KanaType>("hiragana");
  const kanas: Kana[] = kanaType === "hiragana" ? hiraganaList : katakanaList;
  return (
    <>
    <h1>

    </h1>
    <section className="p-4 grid-cols-3 grid gap-4">
      {kanas.map((kana) => (
        <KanaCard key={kana.id} kana={kana} />
      ))}
    </section>
    </>
  );
}

