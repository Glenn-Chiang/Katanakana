import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseLayout from "../../components/BaseLayout";
import { useAppSelector } from "../../store";
import { Answer } from "../game/answersSlice";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Review() {
  const answers = useAppSelector((state) => state.answers);

  return (
    <BaseLayout>
      <Link
        to={"/dojo"}
        className="flex gap-2 items-center fixed right-0 p-4 z-10 bg-black top-0 w-full justify-end"
      >
        Next Game
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
      
      <section className="flex items-center justify-center flex-col gap-20 my-20">
        {answers.length > 0 ? answers.map((answer, index) => (
          <KanaAnswer key={index} answer={answer} />
        )): <p>No answers entered</p>}
      </section>
    </BaseLayout>
  );
}

function KanaAnswer({ answer }: { answer: Answer }) {
  return (
    <article
      className={`flex flex-col h-1/3 gap-4 items-center justify-center text-6xl ${
        answer.correct || "text-rose-400"
      }`}
    >
      <div className="flex flex-col items-center">
        <span>{answer.kana.kana}</span>
        <span>{answer.kana.id}</span>
      </div>
      {answer.correct || (
        <span className="text-2xl text-rose-400">Skipped</span>
      )}
    </article>
  );
}
