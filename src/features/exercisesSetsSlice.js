import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, deleteExerciseSet, createNew, editExerciseSet } from "../firebase-config";

const initialState = {
  exercisesSets: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// create new set
export const createSet = createAsyncThunk("exercisesSets/create", async (setData, thunkAPI) => {
  const { data, user } = setData;
  try {
    return await createNew(`users/${user.uid}/exercisesSets`, data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// get user sets
export const getSets = createAsyncThunk("exercisesSets/getAll", async (user, thunkAPI) => {
  try {
    return await getData(`users/${user.uid}/exercisesSets`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// delete set
export const deleteSet = createAsyncThunk("exercisesSets/delete", async (id, thunkAPI) => {
  try {
    return await deleteExerciseSet(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// update set
export const editSet = createAsyncThunk("exercisesSet/update", async (setData, thunkAPI) => {
  try {
    const { id, data } = setData;
    return await editExerciseSet(id, data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const exercisesSetsSlice = createSlice({
  name: "exercisesSets",
  initialState,
  reducers: {
    resetExercisesSets: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercisesSets.push(action.payload);
      })
      .addCase(createSet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercisesSets = action.payload;
      })
      .addCase(getSets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercisesSets = state.exercisesSets.filter((set) => set.id !== action.payload);
      })
      .addCase(deleteSet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editSet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editSet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetExercisesSets } = exercisesSetsSlice.actions;

export default exercisesSetsSlice.reducer;
