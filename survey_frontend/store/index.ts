import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../lib/slices/auth_slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);

export type ReduxStore = ReturnType<typeof store.getState>;

export default store;
