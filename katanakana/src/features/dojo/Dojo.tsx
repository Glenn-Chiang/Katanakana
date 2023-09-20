import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KanaCard from "../../components/KanaCard.tsx";
import hiraganaList from "../../kanaData/hiragana.ts";
import { Kana } from "../../types.ts";
import { useEffect, useRef, useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import KatanaIcon from "../../components/KatanaIcon.tsx";
// import katakanaList from '../../kanaData/katakana.ts'

const getRandomKana = (kanas: Kana[]) => {
  const randomIndex = Math.floor(Math.random() * kanas.length);
  return kanas[randomIndex];
};

type GameState = "pre-game" | "in-game" | "post-game";

export default function Dojo() {
  const kanas: Kana[] = hiraganaList;
  const [kana, setKana] = useState(getRandomKana(kanas));

  const [gameState, setGameState] = useState<GameState>("in-game");
  const gameIsActive = gameState === "in-game";
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);

  // Start timer once gamestate is in-game
  const timerRef = useRef<undefined | number>(undefined);
  useEffect(() => {
    if (gameState !== "in-game") {
      return;
    }
    timerRef.current = setInterval(() => setTime((time) => time - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Stop game when timer reaches 0
  useEffect(() => {
    if (!time) {
      console.log("time's up");
      clearInterval(timerRef.current); // Clear timer
      setInputValue("");
      setGameState("post-game");
    }
  }, [time]);

  const [inputValue, setInputValue] = useState("");
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (!gameIsActive) return;
    setInputValue(event.target.value);
  };

  // Evaluate accuracy of input when user hits enter
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (!gameIsActive) return;
    if (event.key !== "Enter") return;
    // If correct, move to next kana and add to score
    if (inputValue.toLowerCase() === kana.id) {
      setKana(getRandomKana(kanas));
      setInputValue("");
      setScore((score) => score + 1);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-between">
        <Clock time={time} />
        <Score score={score} />
      </div>
      <section className="flex flex-col gap-4 p-4 items-center ">
        <KanaCard kana={kana} />
        <input
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          autoFocus
          className="bg-black outline-none border-b-2 border-slate-400 text-4xl w-1/4 text-center"
        />
      </section>
    </>
  );
}

function Clock({ time }: { time: number }) {
  return (
    <div className="flex gap-2 items-center">
      <FontAwesomeIcon icon={faClock} />
      <span>{time}</span>
    </div>
  );
}

function Score({ score }: { score: number }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="h-12 w-12">
        <KatanaIcon />
      </span>
      <span>{score}</span>
    </div>
  );
}
