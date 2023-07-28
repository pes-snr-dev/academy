import asyncHandler from "express-async-handler";
import Chapter from "../models/Chapter.js";

const createChapter = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { course, version } = req.params;

  const chapter = await Chapter.create({
    title,
    description,
    course,
    version,
  });
  if (chapter) {
    res.status(201);
    res.json({
      _id: chapter._id,
      title: chapter.title,
      description: chapter.description,
      course: chapter.course,
    });
  } else {
    res.status(500);
    throw new Error("Error adding the chapter to the database");
  }
});

const getCourseVersionChapters = asyncHandler(async (req, res) => {
  const { course, version } = req.params;
  const chapters = await Chapter.find({
    course: course,
    version: version,
  }).select("_id title description course");
  if (chapters) {
    res.status(200).json(chapters);
  } else {
    res.status(404).json({ message: "No chapters found" });
  }
});

export { createChapter, getCourseVersionChapters };
