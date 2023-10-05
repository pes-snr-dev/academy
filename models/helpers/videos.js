import ChapterVideo from "../ChapterVideo";

// Function to update chapter numbers after deletion
export const updateVideoNumbers = async function (chapter, version) {
  const videos = await ChapterVideo.find({ chapter: chapter, version })
    .sort("video_number")
    .exec();
  const updatedVideos = [];

  for (let i = 0; i < videos.length; i++) {
    const chapter = videos[i];
    chapter.video_number = i + 1;
    updatedVideos.push(chapter.save());
  }

  await Promise.all(updatedVideos);
};
