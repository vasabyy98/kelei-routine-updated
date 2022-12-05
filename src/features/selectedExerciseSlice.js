import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exerciseName: "",
  rm: "",
  weight: "",
  _id: "",
};

export const selectedExerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetSelectedExercise: (state) => initialState,
    setSelectedExercise: (state, action) => {
      state.exerciseName = action.payload.data.exerciseName;
      state.rm = action.payload.data.rm;
      state.weight = action.payload.data.weight;
      state._id = action.payload.id;
    },
  },
});

export const { setSelectedExercise, resetSelectedExercise } = selectedExerciseSlice.actions;

export default selectedExerciseSlice.reducer;
