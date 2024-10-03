import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import authReducer from "./auth/authSlice";
import coppiedPasswordReducer from "./password/coppiedPasswordSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    coppiedPassword: coppiedPasswordReducer,
  },
});
