import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KanaCard from "../../components/KanaCard.tsx";
import { useEffect, useRef, useState } from "react";
import {
  faArrowRotateRight,
  faClock,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import KatanaIcon from "../../components/KatanaIcon.tsx";
import { KanaType, GameState } from "./types.ts";
import { getRandomKana, getKanas } from "./helpers.ts";

export default function Game() {
  const [kanaType, setKanaType] = useState<KanaType>("katakana");
  const kanas = getKanas(kanaType);
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

  // Handle user input
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

  const handleSkip = () => {};

  const handleRestart = () => {};

  return (
    <main className="h-screen flex flex-col justify-between">
      <div className="p-4 flex justify-between text-4xl">
        <Clock time={time} />
        <Score score={score} />
      </div>
      <section className="flex flex-col gap-4 p-4 items-center justify-center h-1/2">
        <KanaCard kana={kana} />
        <input
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          autoFocus
          className="bg-black outline-none border-b-2 border-slate-400 text-4xl w-1/4 text-center"
        />
      </section>
      <div className="p-4 flex justify-between text-slate-400">
        <SkipButton onClick={handleSkip} />
        <RestartButton onClick={handleRestart} />
      </div>
    </main>
  );
}

type ButtonProps = {
  onClick: () => void;
};

function SkipButton({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center hover:text-white"
    >
      <FontAwesomeIcon icon={faArrowRotateRight} />
      Skip
    </button>
  );
}

function RestartButton({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center hover:text-white"
    >
      <FontAwesomeIcon icon={faRefresh} />
      Restart
    </button>
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
