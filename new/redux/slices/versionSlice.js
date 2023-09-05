import { apiSlice } from "./apiSlice";
const VERSIONS_URL = "/api/versions";

export const versionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVersions: builder.query({
      query: (id) => ({
        url: `${VERSIONS_URL}/`,
        method: "GET",
      }),
      providesTags: ["Version"],
    }),
  }),
});

export const { useGetVersionsQuery } = versionsApiSlice;
