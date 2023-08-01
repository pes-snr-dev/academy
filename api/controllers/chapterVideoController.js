import * as fs from "fs";
import asyncHandler from "express-async-handler";
import ChapterVideo from "../models/ChapterVideo.js";

const uploadChapterVideo = asyncHandler(async (req, res) => {
  const { chapter, version } = req.params;
  const { title } = req.body;

  console.log(chapter, version, title)

  if (req.files) {
    let video = req.files;

    const filePath = `uploads/${video.filename}`;
    fs.rename(video.path, filePath, (err) => {
      if (err) {
        res.status(500);
        throw new Error("Failed to upload the file");
      }
    });
    const videoObject = await ChapterVideo.create({
      title: title,
      filename: video.filename,
      type: video.mimetype,
      path: req.file.path,
      chapter: chapter,
      version: version,
    });

    if (videoObject) {
      res.status(200).json({
        _id: videoObject._id,
        title: videoObject.title,
        type: videoObject.type,
        filename: videoObject.filename,
        path: videoObject.path,
        createdAt: chapter.createdAt,
        updatedAt: chapter.updatedAt,
      });
    } else {
      res.status(500);
      throw new Error("Error adding the chapter video to the database");
    }
  }
});

const getChapterVideos = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const videos = await ChapterVideo.find({ chapter: id }).select(
    "title filename path type version"
  );
  if (videos) {
    res.status(200).json(videos);
  } else {
    res.status(404);
    throw new Error(`videos with id ${id} not found`);
  }
});
export { uploadChapterVideo, getChapterVideos };
