import express from "express";
import {
  createCourse,
  getCoachCourses,
  deleteCourse,
  getCourseById,
  getCourseThumbnail,
  updateCourse,
} from "../controllers/courseController.js";
import { uploadSingleFilesMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadSingleFilesMiddleware, createCourse);
router.put("/:id", uploadSingleFilesMiddleware, updateCourse);
router.get("/coach/:id", getCoachCourses);
router.delete("/:id", deleteCourse);
router.get("/:id", getCourseById);
router.get("/:id/thumbnail", getCourseThumbnail);

export default router;
