import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Kana } from "../../types";
// import { useAppSelector } from "../../store";

export type Answer = {
  kana: Kana;
  correct: boolean;
};

type AnswersState = Answer[];
const initialState: AnswersState = [];

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<Answer>) => {
      state.push(action.payload);
    },
  },
});

// const answersSelector = useAppSelector(state => state.answers)

export const { addAnswer } = answersSlice.actions;
export default answersSlice.reducer;
