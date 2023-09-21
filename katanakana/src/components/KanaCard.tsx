import { Kana } from "../types";

interface props {
  kana: Kana,
  withRomaji: boolean
}

export default function KanaCard({kana, withRomaji}: props) {
  return (
    <article className=" flex flex-col p-2 rounded-xl justify-center items-center w-4/5 gap-2">
      <span className="text-8xl">{kana.kana}</span>
      {withRomaji && <span className="text-4xl">{kana.id}</span>}
    </article>
  );
}
