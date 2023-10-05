import { apiSlice } from "./apiSlice";
const VIDEO_URL = "/api/videos";

export const chaptersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChapterVideo: builder.mutation({
      query: (data) => ({
        url: `${VIDEO_URL}`,
        method: "POST",
        body: data.formData,
        formData: true,
      }),
      invalidatesTags: ["Chapter"],
    }),
    deleteChapterVideo: builder.mutation({
      query(id) {
        return {
          url: `${VIDEO_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Chapter"],
    }),
  }),
});

export const { useCreateChapterVideoMutation, useDeleteChapterVideoMutation } =
  chaptersApiSlice;
