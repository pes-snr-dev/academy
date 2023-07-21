import asyncHandler from "express-async-handler";
import * as fs from "fs";
import Course from "../models/CourseModel.js";
import CourseThumbnail from "../models/CourseThumbnail.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const course = await Course.create({
    title,
    description,
  });
  if (course) {
    if (req.files) {
      let thumbnail = req.files;

      const filePath = `uploads/${thumbnail.filename}`;
      fs.rename(thumbnail.path, filePath, (err) => {
        if (err) {
          // Handle error appropriately and send an error response
          res.status(500);
          throw new Error("Failed to upload the file");
        }
      });
      const image = await CourseThumbnail.create({
        filename: thumbnail.filename,
        path: req.file.path,
        course: course,
      });

      if (image) {
        res.status(201).json({
          _id: course._id,
          title: course.title,
          thumbnail: image.filename,
        });
      } else {
        res.status(500);
        throw new Error("Error course thumbnail to the database");
      }
    }
  } else {
    res.status(400);
    throw new Error("Invalid data.");
  }
});

export { createCourse };
