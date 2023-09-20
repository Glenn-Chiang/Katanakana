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

export default function SettingsMenu() {
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
    <section className="flex flex-col items-center p-4">
      <h1 className="flex items-center gap-2">
        <FontAwesomeIcon icon={faGear} />
        Game Settings
      </h1>
      <section className="w-full flex flex-col gap-4 p-4">
        <div className="flex justify-between">
          <span>Kana Type</span>
          <select
            onChange={handleSelectKanaType}
            value={kanaType}
            className="bg-black capitalize rounded"
          >
            {kanaTypeOptions}
          </select>
        </div>
        <div className="flex justify-between">
          <span>
            <FontAwesomeIcon icon={faClock} />
            Time Limit
          </span>
          <select
            onChange={handleSelectTimeLimit}
            value={timeLimit}
            className="bg-black capitalize rounded"
          >
            {timeLimitOptions}
          </select>
        </div>
      </section>
      <div className="p-4">
        <button className="flex gap-2 items-center bg-rose-500 text-white p-2 rounded">
          <FontAwesomeIcon icon={faPlay} />
          Start
        </button>
      </div>
    </section>
  );
}
