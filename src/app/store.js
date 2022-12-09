import { configureStore } from "@reduxjs/toolkit";
import selectedExerciseSlice from "../features/selectedExerciseSlice";
import popupActionsTypeSlice from "../features/popupActionsType";
import selectedExerciseSetSlice from "../features/selectedExerciseSetSlice";
import exercisesSlice from "../features/exercisesSlice";
import exercisesSetsSlice from "../features/exercisesSetsSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesSlice,
    exercisesSets: exercisesSetsSlice,
    selectedExercise: selectedExerciseSlice,
    selectedExerciseSet: selectedExerciseSetSlice,
    popupActionType: popupActionsTypeSlice,
  },
});
