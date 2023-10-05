import React, { createContext, useEffect } from "react";
import { useGetChapterVideosQuery } from "@redux/slices/chaptersSlice";
import { filterForVersionVideos } from "@services/chapter";

// Create a context
const MyContext = createContext();

// Create a provider component
const ChapterVideoProvider = ({ children, chapterId, version }) => {
  const {
    data: videos,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useGetChapterVideosQuery(chapterId);

  let versionVideos;

  if (videos) {
    versionVideos = filterForVersionVideos(version, videos);
  }

  const sharedData = {
    videos: videos,
  };

  return <MyContext.Provider value={sharedData}>{children}</MyContext.Provider>;
};

export default ChapterVideoProvider;
