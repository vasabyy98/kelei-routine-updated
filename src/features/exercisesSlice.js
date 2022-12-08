import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exercises: [],
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    resetExercises: (state) => initialState,
    setExercisesRedux: (state, action) => {
      state.exercises = action.payload;
    },
  },
});

export const { setExercisesRedux, resetExercises } = exercisesSlice.actions;

export default exercisesSlice.reducer;
