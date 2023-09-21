import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store";
import { KanaType } from "../../types";

export const timeLimits = [15, 30, 60] as const;

export type TimeLimit = (typeof timeLimits)[number];

interface Settings {
  kanaType: KanaType;
  timeLimit: TimeLimit;
}

const initialSettings: Settings = {
  kanaType: "katakana",
  timeLimit: 30,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    setKanaType: (state, action: PayloadAction<KanaType>) => {
      state.kanaType = action.payload;
    },
    setTimeLimit: (state, action: PayloadAction<TimeLimit>) => {
      state.timeLimit = action.payload;
    },
  },
});

export const useSettingsSelector = () =>
  useAppSelector((state) => state.settings);
export const { setKanaType, setTimeLimit } = settingsSlice.actions;
export default settingsSlice.reducer;
