import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseLayout from "../../components/BaseLayout";
import { useAppSelector } from "../../store";
import { Answer } from "../game/answersSlice";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Review() {
  const answers = useAppSelector((state) => state.answers);
  return (
    <BaseLayout>
    <Link to={'/dojo'} className="flex gap-2 items-center fixed p-4 z-10 bg-black">
      <FontAwesomeIcon icon={faChevronLeft}/>
      Back
    </Link>
      <section className="h-screen">
        {answers.map((answer, index) => (
          <KanaAnswer key={index} answer={answer} />
        ))}
      </section>
    </BaseLayout>
  );
}

function KanaAnswer({ answer }: { answer: Answer }) {
  return (
    <article className="flex flex-col h-1/3 items-center justify-center text-6xl">
      <span>{answer.kana.kana}</span>
      <span>{answer.kana.id}</span>
    </article>
  );
}
