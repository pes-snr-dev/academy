import { apiSlice } from "./apiSlice";
const COURSES_URL = "/api/courses";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: `${COURSES_URL}/`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getCoachCourses: builder.query({
      query: (id) => ({
        url: `${COURSES_URL}/coach/${id}/`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/new/`,
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
        url: `${COURSES_URL}/${id}`,
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
      invalidatesTags: ["Course"],
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
  useGetCoursesQuery,
} = coursesApiSlice;
