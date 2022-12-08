import { configureStore } from "@reduxjs/toolkit";
import selectedExerciseSlice from "../features/selectedExerciseSlice";
import popupActionsTypeSlice from "../features/popupActionsType";
import selectedExerciseSetSlice from "../features/selectedExerciseSetSlice";
// test
import exercisesSlice from "../features/exercisesSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesSlice,
    selectedExercise: selectedExerciseSlice,
    selectedExerciseSet: selectedExerciseSetSlice,
    popupActionType: popupActionsTypeSlice,
  },
});
