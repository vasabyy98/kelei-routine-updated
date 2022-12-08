import { configureStore } from "@reduxjs/toolkit";
import selectedExerciseSlice from "../features/selectedExerciseSlice";
import popupActionsTypeSlice from "../features/popupActionsType";
import selectedExerciseSetSlice from "../features/selectedExerciseSetSlice";

export const store = configureStore({
  reducer: {
    selectedExercise: selectedExerciseSlice,
    selectedExerciseSet: selectedExerciseSetSlice,
    popupActionType: popupActionsTypeSlice,
  },
});
