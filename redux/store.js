import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import coachReducer from "./slices/coachSlice";
import courseChaptersReducer from "./slices/courseChaptersSlice";
import prefsReducer from "./slices/prefsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    prefs: prefsReducer,
    coach: coachReducer,
    courseChapters: courseChaptersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
