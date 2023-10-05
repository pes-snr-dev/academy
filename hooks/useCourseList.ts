import { useState } from "react";
import { VIDEO_VERSION_UNION } from "@types";

// const videoVersions: VIDEO_VERSION_UNION[] = [];

export default function useCourseList(videos: VIDEO_VERSION_UNION[]) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  function next() {
    setCurrentVideoIndex((i) => {
      if (i >= videos.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentVideoIndex((i) => {
      if (i < 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentVideoIndex(index);
  }

  function getCurrentVideo() {
    return videos[currentVideoIndex];
  }

  return {
    currentVideoIndex,
    video: videos[currentVideoIndex],
    next,
    back,
    goTo,
    videos,
    isFirstVideo: currentVideoIndex === 0,
    isLastVideo: currentVideoIndex === videos.length - 1,
    getCurrentVideo,
  };
}
