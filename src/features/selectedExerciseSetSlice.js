import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exerciseSetName: "",
  volume: "",
  routine: "",
  selectedExercises: "",
  _id: "",
};

export const selectedExerciseSetSlice = createSlice({
  name: "exerciseSet",
  initialState,
  reducers: {
    resetSelectedExerciseSet: (state) => initialState,
    setSelectedExerciseSet: (state, action) => {
      state.exerciseSetName = action.payload.data.exerciseSetName;
      state.volume = action.payload.data.volume;
      state.routine = action.payload.data.routine;
      state.selectedExercises = action.payload.data.selectedExercises;
      state._id = action.payload.id;
    },
  },
});

export const { setSelectedExerciseSet, resetSelectedExerciseSet } =
  selectedExerciseSetSlice.actions;

export default selectedExerciseSetSlice.reducer;
