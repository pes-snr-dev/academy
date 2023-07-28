import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import asyncHandler from "express-async-handler";
import Course from "../models/CourseModel.js";
import CourseThumbnail from "../models/CourseThumbnail.js";
import User from "../models/userModel.js";

const uploadThumbnail = async (course, req, res) => {
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
      res.status(200).json({
        _id: course._id,
        title: course.title,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
      });
    } else {
      res.status(500);
      throw new Error("Error adding the course thumbnail to the database");
    }
  }
};

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, coachId } = req.body;

  let id = coachId.trim();
  const coach = await User.findById(id);
  if (coach) {
    const course = await Course.create({
      title,
      description,
      coach,
    });
    if (course) {
      uploadThumbnail(course, req, res);
    } else {
      res.status(400);
      throw new Error("Invalid data.");
    }
  } else {
    res.status(404);
    throw new Error(`Instructor for id ${coachId} not found`);
  }
});

const editThumbnail = async (course, req, res) => {
  console.log("editing thumb");
  if (req.files) {
    let thumbnail = req.files;

    const filePath = `uploads/${thumbnail.filename}`;
    const previousThumbnail = await CourseThumbnail.find({
      course: course._id,
    }).select("path");
    // console.log(previousThumbnail.path, "pathing", previousThumbnail);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePreviousThumbnailPath = path.resolve(
      __dirname,
      `../../${previousThumbnail[0].path}`
    );
    console.log("ze paz", filePreviousThumbnailPath);
    if (filePreviousThumbnailPath) {
      try {
        fs.unlinkSync(filePreviousThumbnailPath);
      } catch (error) {
        res.status(500);
        throw new Error(`Error: ${error.message}`);
      }
    }

    fs.rename(thumbnail.path, filePath, (err) => {
      if (err) {
        // Handle error appropriately and send an error response
        res.status(500);
        throw new Error("Failed to upload the file");
      }
    });
    const filter = {
      course: course,
    };
    const update = {
      filename: thumbnail.filename,
      path: req.file.path,
    };
    const image = await CourseThumbnail.findOneAndUpdate(filter, update, {
      new: true,
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
};

const updateCourse = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { title, description } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(id, { title, description });
    editThumbnail(course, req, res);
  } catch (error) {
    res.status(500);
    throw new Error(`${error.message}`);
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
    res.status(200).json({ id: req.params.id, status: "OK" });
  } else {
    res.status(404);
    throw new Error(`Course with id ${id} not found`);
  }
});

const getCourseById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const course = await Course.findById(id).select(
    "_id title description createdAt updatedAt"
  );
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404);
    throw new Error(`Course with id ${id} not found`);
  }
});

const getCourseThumbnail = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const thumbnail = await CourseThumbnail.find({ course: id }).select(
    "filename path"
  );
  if (thumbnail) {
    res.status(200).json(thumbnail);
  } else {
    res.status(404);
    throw new Error(`Thumbnail with id ${id} not found`);
  }
});

export {
  createCourse,
  getCoachCourses,
  deleteCourse,
  getCourseById,
  getCourseThumbnail,
  updateCourse,
};
