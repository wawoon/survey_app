import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../lib/slices/auth_slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: true,
});

export type ReduxStore = ReturnType<typeof store.getState>;

export default store;
