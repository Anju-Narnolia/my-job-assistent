// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
  },
});
