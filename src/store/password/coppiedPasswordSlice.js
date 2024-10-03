import { createSlice } from "@reduxjs/toolkit";
const initialState = { coppiedPassword: "" };

export const coppiedPasswordSlice = createSlice({
  name: "coppiedPassword",
  initialState,
  reducers: {
    setCoppiedPasswordSlice: (state, action) => {
      state.coppiedPassword = action.payload;
    },
  },
});

export const { setCoppiedPasswordSlice } = coppiedPasswordSlice.actions;
export default coppiedPasswordSlice.reducer;
