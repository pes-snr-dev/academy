import { apiSlice } from "./apiSlice";
const COURSES_URL = "/api/courses";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachCourses: builder.query({
      query: (id) => ({
        url: `${COURSES_URL}/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCoachCoursesQuery } = userApiSlice;
