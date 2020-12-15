import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    respondentUuid: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setUuid: (state, action) => {
      state.respondentUuid = action.payload.respondentUuid;
    },
  },
});

export const { setAuth, setUuid } = authSlice.actions;

export default authSlice.reducer;
