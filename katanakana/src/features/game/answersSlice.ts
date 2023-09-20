import { createSlice } from "@reduxjs/toolkit";
import { Kana } from "../../types";

type Answer = {
  kana: Kana;
  correctlyAnswered: boolean;
}

type AnswersState = Answer[] 
const initialState: AnswersState = []

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addAnswer } = answersSlice.actions;
export default answersSlice.reducer;
