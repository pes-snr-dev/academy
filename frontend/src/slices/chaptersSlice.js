import { apiSlice } from "./apiSlice";
const CHAPTER_URL = "/api/chapters";

export const chaptersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (id) => ({
        url: `${CHAPTER_URL}/course/${id}/`,
        method: "GET",
      }),
      providesTags: ["Chapter"],
    }),
    getChapter: builder.query({
      query: (id) => ({
        url: `${CHAPTER_URL}/${id}/`,
        method: "GET",
      }),
      providesTags: ["Chapter"],
    }),
    createChapter: builder.mutation({
      query: (data) => ({
        url: `${CHAPTER_URL}/course/${data.course}`,
        method: "POST",
        body: data.chapter,
        formData: true,
      }),
      invalidatesTags: ["Chapter"],
    }),
    getChapterVideos: builder.query({
      query: (id) => ({
        url: `${CHAPTER_URL}/${id}/videos`,
        method: "GET",
      }),
      providesTags: ["Chapter", "ChapterVideo"],
    }),
  }),
});

export const {
  useCreateChapterMutation,
  useGetChaptersQuery,
  useGetChapterQuery,
  useGetChapterVideosQuery,
} = chaptersApiSlice;
