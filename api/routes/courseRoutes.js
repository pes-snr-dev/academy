import express from "express";
import fs from "fs-extra";
import { createCourse } from "../controllers/courseController.js";
import { uploadSingleFilesMiddleware } from "../middleware/uploadMiddleware.js";
const router = express.Router();
router.post("/add", uploadSingleFilesMiddleware, createCourse);
export default router;
