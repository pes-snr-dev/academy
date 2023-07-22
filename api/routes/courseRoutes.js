import express from "express";
import {
  createCourse,
  getCoachCourses,
} from "../controllers/courseController.js";
import { uploadSingleFilesMiddleware } from "../middleware/uploadMiddleware.js";
const router = express.Router();
router.post("/add", uploadSingleFilesMiddleware, createCourse);
router.get("/:id", getCoachCourses);
export default router;
