import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Course", "CourseThumbnail", "Version", "Chapter"],
  endpoints: (builder) => ({}),
});
