import { Kana } from "../types";

export default function KanaCard({ kana }: { kana: Kana }) {
  return (
    <article className="text-slate-100 flex flex-col p-2 rounded-xl justify-center items-center w-4/5 h-80 text-8xl">
      <span>{kana.kana}</span>
    </article>
  );
}
