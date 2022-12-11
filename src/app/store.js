import { configureStore } from "@reduxjs/toolkit";
import selectedExerciseSlice from "../features/selectedExerciseSlice";
import popupActionsTypeSlice from "../features/popupActionsType";
import selectedExerciseSetSlice from "../features/selectedExerciseSetSlice";
import exercisesSlice from "../features/exercisesSlice";
import exercisesSetsSlice from "../features/exercisesSetsSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    exercises: exercisesSlice,
    exercisesSets: exercisesSetsSlice,
    selectedExercise: selectedExerciseSlice,
    selectedExerciseSet: selectedExerciseSetSlice,
    popupActionType: popupActionsTypeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
