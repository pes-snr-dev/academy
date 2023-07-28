import express from "express";
import {
  createChapter,
  getCourseVersionChapters,
} from "../controllers/chapterController.js";

const router = express.Router();

router.route("/:course").post(createChapter).get(getCourseVersionChapters);

export default router;
