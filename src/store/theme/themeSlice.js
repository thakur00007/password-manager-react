import { createSlice } from "@reduxjs/toolkit";
import { getValue, setValue } from "../../services/localStorage";

const defaultTheme = getValue("theme") || "light";
const initialState = { pageTheme: defaultTheme };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.pageTheme = action.payload;
      document.querySelector("html").classList.remove("light", "dark");
      document.querySelector("html").classList.add(action.payload);
      setValue("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
