import { useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import KanaCard from "../../components/KanaCard";
import { KanaType, kanaTypes } from "../../types";
import { getKanas } from "../game/helpers.js";

export default function Scrolls() {
  const [kanaType, setKanaType] = useState<KanaType>("hiragana");
  const kanas = getKanas(kanaType);

  return (
    <BaseLayout>
      <KanaMenu
        kanaType={kanaType}
        setKanaType={(kanaType: KanaType) => setKanaType(kanaType)}
      />
      <section className="p-8 grid-cols-1 md:grid-cols-5 grid gap-10 justify-items-center mt-10 mb-20">
        {kanas.map((kana) => (
          <KanaCard key={kana.id} kana={kana} withRomaji={true} />
        ))}
      </section>
    </BaseLayout>
  );
}

interface KanaMenuProps {
  kanaType: KanaType;
  setKanaType: (kanaType: KanaType) => void;
}

function KanaMenu({ kanaType: selectedKanaType, setKanaType }: KanaMenuProps) {
  const handleClick = (kanaType: KanaType) => {
    setKanaType(kanaType);
    window.scrollTo(0,0)
  };

  return (
    <div className="flex fixed w-screen z-10 bg-black top-0">
      {kanaTypes.slice(0,2).map((kanaType, index) => (
        <button
          key={index}
          onClick={() => handleClick(kanaType)}
          className={`flex-1 capitalize p-2 ${
            kanaType === selectedKanaType && "border-b-2 border-white"
          }`}
        >
          {kanaType}
        </button>
      ))}
    </div>
  );
}
