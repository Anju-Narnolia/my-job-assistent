import { createSlice } from "@reduxjs/toolkit";

// Detect if in development or production
const isDevelopment = import.meta.env.MODE === "development";

const initialState = {
  apiBaseUrl: isDevelopment 
    ? "http://localhost:5000" 
    : "https://my-job-assistent-server.onrender.com",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setApiBaseUrl: (state, action) => {
      state.apiBaseUrl = action.payload;
    },
  },
});
export const { setApiBaseUrl } = configSlice.actions;
export default configSlice.reducer;
