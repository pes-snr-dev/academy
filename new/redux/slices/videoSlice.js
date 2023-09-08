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
  }),
});

export const { useCreateChapterVideoMutation } = chaptersApiSlice;
