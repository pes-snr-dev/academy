import { createSlice } from "@reduxjs/toolkit";

const initialState = { courses: [] };

function updateCoursesState(prev, newData) {
  return { ...prev, courses: [...prev.courses, ...newData] };
}

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
  },
});

export const { setCourses, removeCourses } = coachSlice.actions;

export default coachSlice.reducer;
