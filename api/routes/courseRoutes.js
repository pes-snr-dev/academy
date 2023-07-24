import express from "express";
import {
  createCourse,
  getCoachCourses,
  deleteCourse,
} from "../controllers/courseController.js";
import { uploadSingleFilesMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadSingleFilesMiddleware, createCourse);
router.get("/:id", getCoachCourses);
router.delete("/:id", deleteCourse);

export default router;
