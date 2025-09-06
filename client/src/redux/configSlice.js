import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiBaseUrl: "http://localhost:5000",
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
