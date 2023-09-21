import {
  faChevronRight,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseLayout from "../../components/BaseLayout";
import KanaCard from "../../components/KanaCard";
import KatanaIcon from "../../components/KatanaIcon";
import { useAppSelector } from "../../store";
import { Answer } from "../game/answersSlice";

interface ReviewProps {
  restart: () => void
}
export default function Review({restart}: ReviewProps) {
  const answers = useAppSelector((state) => state.answers);

  return (
    <BaseLayout>
      <button
        onClick={restart}
        className="flex gap-2 items-center fixed right-0 p-4 z-10 bg-black top-0 w-full justify-end"
      >
        <div className="w-10 h-10"><KatanaIcon/></div>
        Train again
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <section className="flex items-center justify-center flex-col gap-20 my-20">
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            // <KanaCard key={index} kana={answer.kana} withRomaji={true}/>
            <KanaAnswer key={index} answer={answer} />
          ))
        ) : (
          <p>No answers entered</p>
        )}
      </section>
    </BaseLayout>
  );
}

function KanaAnswer({ answer }: { answer: Answer }) {
  return (
    <article
      className={`flex flex-col w-full gap-4 items-center justify-center text-6xl ${
        answer.correct || "text-rose-400"
      }`}
    >
      <KanaCard kana={answer.kana} withRomaji={true} />
      {answer.correct || (
        <span className="text-2xl text-rose-400 flex items-center gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} />
          Skipped
        </span>
      )}
    </article>
  );
}
