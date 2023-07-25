import { apiSlice } from "./apiSlice";
const COURSES_URL = "/api/courses";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachCourses: builder.query({
      query: (id) => ({
        url: `${COURSES_URL}/coach/${id}/`,
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
    getCourseById: builder.query({
      query: (id) => ({
        url: `${COURSES_URL}/${id}/`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getCourseThumbnail: builder.query({
      query: (id) => ({
        url: `${COURSES_URL}/${id}/thumbnail/`,
        method: "GET",
      }),
      providesTags: ["CourseThumbnail"],
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.id}`,
        method: "PUT",
        body: data.formData,
        formData: true,
      }),
      invalidatesTags: ["Course", "CourseThumbnail"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoachCoursesQuery,
  useDeleteCourseMutation,
  useGetCourseByIdQuery,
  useGetCourseThumbnailQuery,
  useUpdateCourseMutation,
} = userApiSlice;
