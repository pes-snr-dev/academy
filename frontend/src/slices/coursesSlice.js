import { apiSlice } from "./apiSlice";
const COURSES_URL = "/api/courses";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachCourses: builder.query({
      query: (id) => ({
        url: `${COURSES_URL}/${id}/`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/`,
        method: "POST",
        body: data.formData,
        formData: true,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query(id) {
        return {
          url: `${COURSES_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoachCoursesQuery,
  useDeleteCourseMutation,
} = userApiSlice;
