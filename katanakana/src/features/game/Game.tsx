import {
  faArrowRotateRight,
  faClock,
  faGear,
  faMagnifyingGlass,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/BaseLayout.tsx";
import KanaCard from "../../components/KanaCard.tsx";
import KatanaIcon from "../../components/KatanaIcon.tsx";
import { useAppDispatch, useAppSelector } from "../../store.ts";
import { GameState, Kana } from "../../types.ts";
import Review from "../review/Review.tsx";
import SettingsMenu from "../settings/SettingsMenu.tsx";
import { useSettingsSelector } from "../settings/settingsSlice.ts";
import { Answer, addAnswer, resetAnswers } from "./answersSlice.ts";
import { getKanas, getRandomKana } from "./helpers.ts";

export default function Game() {
  // Get settings from redux store
  const settings = useSettingsSelector();
  const { kanaType, timeLimit } = settings;

  const kanas = getKanas(kanaType);
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const gameIsActive = gameState === "in-game";

  const getKana = useCallback(() => getRandomKana(kanas), [kanas]);

  const [kana, setKana] = useState<Kana>(getKana()); // The current kana that the user has to identify
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [score, setScore] = useState(0);
  // Record of answers entered by user in current game
  const answers = useAppSelector((state) => state.answers);

  // Start timer once gamestate is in-game
  const timerRef = useRef<undefined | number>(undefined);
  useEffect(() => {
    if (gameState !== "in-game") {
      return;
    }
    timerRef.current = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Stop game when timer reaches 0
  useEffect(() => {
    if (timeLeft) return;
    console.log("time's up");
    clearInterval(timerRef.current); // Clear timer
    setInputValue("");
    setGameState("post-game");
  }, [timeLeft, answers]);

  // Handle user input
  const [inputValue, setInputValue] = useState("");
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (gameState === "post-game") return;
    // Game is started once user starts typing
    if (gameState === "pre-game") setGameState("in-game");
    setInputValue(event.target.value);
  };

  const dispatch = useAppDispatch();

  // Evaluate accuracy of input when user hits enter
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (!gameIsActive) return;
    if (event.key !== "Enter") return;
    // If correct, move to next kana and add to score
    if (inputValue.toLowerCase() === kana.id) {
      setKana(getKana());
      setInputValue("");
      setScore((score) => score + 1);
      const answer: Answer = { kana, correct: true };
      dispatch(addAnswer(answer));
    }
  };

  const handleSkip = () => {
    setKana(getKana());
    setInputValue("");
    const answer: Answer = { kana, correct: false }; // Mark answer as wrong if user skips kana
    dispatch(addAnswer(answer));
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    setTimeLeft(timeLimit);
    setScore(0);
    setKana(getKana());
    setGameState("pre-game");
    setSettingsShown(false);
    setReviewShown(false);
    setInputValue("");
    inputRef.current?.focus();
    dispatch(resetAnswers());
  };

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const [settingsShown, setSettingsShown] = useState(false);
  const showSettings = () => setSettingsShown(true);
  const [reviewShown, setReviewShown] = useState(false);
  const showReview = () => setReviewShown(true);

  if (settingsShown)
    return (
      <BaseLayout>
        <SettingsMenu handleStart={handleRestart} />
      </BaseLayout>
    );

  if (reviewShown) return <Review restart={handleRestart} />;

  return (
    <BaseLayout>
      <main className="h-screen flex flex-col justify-stretch">
        <div className="p-4 flex justify-between text-4xl">
          <Clock time={timeLeft} />
          <Score score={score} />
        </div>
        <section className="flex flex-col gap-4 p-4 items-center justify-center h-1/2">
          {gameState === "post-game" ? (
            <ResultCard score={score} handleClick={showReview} />
          ) : (
            <>
              <KanaCard kana={kana} withRomaji={false} />
              <input
                ref={inputRef}
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                autoFocus
                className="bg-black outline-none border-b-2 border-slate-400 text-4xl w-1/4 text-center"
              />
            </>
          )}
        </section>
        <div className="p-4 flex gap-4 flex-col items-center">
          <SkipButton onClick={handleSkip} disabled={gameState !== "in-game"} />
          <RestartButton onClick={handleRestart} />
          <SettingsButton
            onClick={showSettings}
            disabled={gameState === "in-game"}
          />
        </div>
      </main>
    </BaseLayout>
  );
}

interface ResultCardProps {
  score: number;
  handleClick: () => void;
}

function ResultCard({ score, handleClick }: ResultCardProps) {
  return (
    <>
      <section className="relative w-full flex flex-col justify-center items-center rounded-xl">
        <div className="w-1/2 md:w-1/4 opacity-40">
          <KatanaIcon />
        </div>
        <span className="text-8xl absolute text-white">{score}</span>
      </section>
      <button
        onClick={handleClick}
        className="p-4 flex gap-2 items-center bg-slate-800 rounded-xl"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Review
      </button>
    </>
  );
}

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

function SettingsButton({ onClick, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex gap-2 items-center ${
        disabled ? "text-slate-500" : "hover:text-white"
      }`}
    >
      <FontAwesomeIcon icon={faGear} />
      Settings
    </button>
  );
}

function SkipButton({ onClick, disabled }: ButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.currentTarget.blur(); // Unfocus restart button after it is clicked
    onClick();
  };
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`flex gap-2 items-center ${
        disabled ? "text-slate-500" : "hover:text-white"
      }`}
    >
      <FontAwesomeIcon icon={faArrowRotateRight} />
      Skip
    </button>
  );
}

function RestartButton({ onClick }: ButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.currentTarget.blur(); // Unfocus restart button after it is clicked
    onClick();
  };
  return (
    <button
      onClick={handleClick}
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
