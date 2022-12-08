import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupType: "",
};

export const popupActionsTypeSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetPopupType: (state) => initialState,
    setPopupType: (state, action) => {
      state.popupType = action.payload;
    },
  },
});

export const { resetPopupType, setPopupType } = popupActionsTypeSlice.actions;

export default popupActionsTypeSlice.reducer;
