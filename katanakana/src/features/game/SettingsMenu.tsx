import {
  TimeLimit,
  setKanaType,
  setTimeLimit,
  useSettingsSelector,
} from "./settingsSlice";
import { KanaType, kanaTypes } from "./types";
import { timeLimits } from "./settingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAppDispatch } from "../../store";

export default function SettingsMenu({handleStart}: {handleStart: () => void}) {
  const { kanaType, timeLimit } = useSettingsSelector();

  const kanaTypeOptions = kanaTypes.map((kanaType, index) => (
    <option key={index}>{kanaType}</option>
  ));

  const timeLimitOptions = timeLimits.map((timeLimit, index) => (
    <option key={index}>{timeLimit}</option>
  ));

  const dispatch = useAppDispatch();

  const handleSelectKanaType: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch(setKanaType(event.target.value as KanaType));
  };

  const handleSelectTimeLimit: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const selectedTimeLimit = Number(event.target.value) as TimeLimit;
    dispatch(setTimeLimit(selectedTimeLimit));
  };

  return (
    <section className="flex flex-col items-center p-4 h-screen justify-center ">
      <h1 className="flex items-center gap-2 p-4">
        <FontAwesomeIcon icon={faGear} />
        Game Settings
      </h1>
      <section className="w-5/6 flex flex-col gap-4 p-4 rounded">
        <div className="flex justify-between items-center">
          <span>Kana Type</span>
          <select
            onChange={handleSelectKanaType}
            value={kanaType}
            className="bg-black capitalize rounded p-2"
          >
            {kanaTypeOptions}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faClock} />
            Time Limit
          </span>
          <select
            onChange={handleSelectTimeLimit}
            value={timeLimit}
            className="bg-black capitalize rounded p-2"
          >
            {timeLimitOptions}
          </select>
        </div>
      </section>
      <div className="p-4">
        <button onClick={handleStart} className="flex gap-2 items-center p-2 rounded border-2 border-slate-400 hover:text-white hover:border-white">
          <FontAwesomeIcon icon={faPlay} />
          Start
        </button>
      </div>
    </section>
  );
}
