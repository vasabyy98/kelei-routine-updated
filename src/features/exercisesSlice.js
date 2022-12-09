import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, deleteExerciseData, createNew, editExercise } from "../firebase-config";

const initialState = {
  exercises: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// create new exercise
export const createNewExercise = createAsyncThunk(
  "exercises/create",
  async (exerciseData, thunkAPI) => {
    const { data, user } = exerciseData;
    try {
      return await createNew(`users/${user.uid}/exercises`, data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user exercises
export const getExercises = createAsyncThunk("exercises/getAll", async (user, thunkAPI) => {
  try {
    return await getData(`users/${user.uid}/exercises`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// delete exercise
export const deleteExercise = createAsyncThunk("exercises/delete", async (id, thunkAPI) => {
  try {
    return await deleteExerciseData(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// update exercise
export const editExerciseData = createAsyncThunk(
  "exercises/update",
  async (exerciseData, thunkAPI) => {
    try {
      const { id, data } = exerciseData;
      return await editExercise(id, data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    resetExercises: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises.push(action.payload);
      })
      .addCase(createNewExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises = action.payload;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises = state.exercises.filter((exercise) => exercise._id !== action.payload);
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editExerciseData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editExerciseData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editExerciseData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setExercisesRedux, resetExercises } = exercisesSlice.actions;

export default exercisesSlice.reducer;
