import { configureStore } from "@reduxjs/toolkit";
import selectedExerciseSlice from "../features/selectedExerciseSlice";
import popupActionsTypeSlice from "../features/popupActionsType";

export const store = configureStore({
  reducer: {
    selectedExercise: selectedExerciseSlice,
    popupActionType: popupActionsTypeSlice,
  },
});
