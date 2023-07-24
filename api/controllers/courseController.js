import asyncHandler from "express-async-handler";
import * as fs from "fs";
import Course from "../models/CourseModel.js";
import CourseThumbnail from "../models/CourseThumbnail.js";
import User from "../models/userModel.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, coachId } = req.body;
  console.log(title);

  let id = coachId.trim();
  const coach = await User.findById(id);
  if (coach) {
    const course = await Course.create({
      title,
      description,
      coach,
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
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
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
  } else {
    res.status(404);
    throw new Error(`Instructor for id ${coachId} not found`);
  }
});

const getCoachCourses = asyncHandler(async (req, res) => {
  let { id } = req.params;

  const coach = await User.findById(id);
  if (coach) {
    const courses = await Course.find({ coach }).select(
      "_id title description createdAt updatedAt"
    );
    res.status(200);
    res.json(courses);
  } else {
    res.status(404);
    throw new Error(`Coach with id ${id} not found`);
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const course = await Course.findById(id);
  if (course) {
    await course.deleteOne();
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(404);
    throw new Error(`Course with id ${id} not found`);
  }
});

export { createCourse, getCoachCourses, deleteCourse };
