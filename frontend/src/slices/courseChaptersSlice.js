import { createSlice } from "@reduxjs/toolkit";

const initialState = { courseChapters: [] };

const courseChapters = createSlice({
  name: "courseChapters",
  initialState,
  reducers: {
    setCourseChapters: (state, action) => {
      state.courseChapters = action.payload;
    },
    removeCourseChapters: (state, action) => {
      state.courseChapters = null;
    },
    updateCourseChapters: (state, action) => {
      state.courseChapters = action.payload;
    },
  },
});

export const { setCourseChapters, removeCourseChapters, updateCourseChapters } =
  courseChapters.actions;

export default courseChapters.reducer;
