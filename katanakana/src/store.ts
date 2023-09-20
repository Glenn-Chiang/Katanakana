import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import answersReducer from "./features/game/answersSlice";
import settingsReducer from "./features/game/settingsSlice";

const store = configureStore({
  reducer: {
    answers: answersReducer,
    settings: settingsReducer
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
