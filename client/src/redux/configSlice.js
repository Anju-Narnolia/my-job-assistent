import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiBaseUrl: "https://my-job-assistent-server.onrender.com",
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
