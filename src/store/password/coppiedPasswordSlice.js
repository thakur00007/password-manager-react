import { createSlice } from "@reduxjs/toolkit";
const initialState = { coppiedPassword: "" };

export const coppiedPasswordSlice = createSlice({
  name: "coppiedPassword",
  initialState,
  reducers: {
    setCoppiedPasswordSlice: (state, action) => {
      state.coppiedPassword = action.payload;
    },
    unsetCoppiedPasswordSlice: (state) => {
      state.coppiedPassword = "";
    },
  },
});

export const { setCoppiedPasswordSlice, unsetCoppiedPasswordSlice } =
  coppiedPasswordSlice.actions;
export default coppiedPasswordSlice.reducer;
