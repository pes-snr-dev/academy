import { createSlice } from "@reduxjs/toolkit";

const initialState = { courses: [] };

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    removeCourses: (state, action) => {
      state.courses = null;
    },
    updateCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses, removeCourses, updateCourses } = coachSlice.actions;

export default coachSlice.reducer;
