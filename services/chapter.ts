import { VIDEO_VERSION_UNION } from "@types";

const filterForVersionVideos = (
  version: String,
  videos: [VIDEO_VERSION_UNION]
) => {
  let versionVideos;
  if (videos) {
    versionVideos = videos.filter(function (el) {
      // console.log(el.version.abbreviation, version)
      return el.version.abbreviation === version;
    });
  }
  return versionVideos;
};

export { filterForVersionVideos };
