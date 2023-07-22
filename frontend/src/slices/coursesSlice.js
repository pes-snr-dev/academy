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
    createCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/add/`,
        method: "POST",
        body: data.formData,
        formData: true,
      }),
    }),
  }),
});

export const { useCreateCourseMutation, useGetCoachCoursesQuery } =
  userApiSlice;
