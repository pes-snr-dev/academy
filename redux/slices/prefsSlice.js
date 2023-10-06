import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

if (typeof window !== "undefined") {
  initialState = {
    language: localStorage.getItem("language")
      ? JSON.parse(localStorage.getItem("language"))
      : null,
  };
}

const prefsSlice = createSlice({
  name: "prefs",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", JSON.stringify(action.payload));
    },
    unsetLanguage: (state, action) => {
      state.language = null;
      localStorage.removeItem("language");
    },
  },
});

export const { setLanguage, unsetLanguage } = prefsSlice.actions;

export default prefsSlice.reducer;
