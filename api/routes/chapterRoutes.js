import express from "express";
import {
  createChapter,
  getCourseVersionChapters,
  getChapterById,
} from "../controllers/chapterController.js";

const router = express.Router();

router.route("/course/:course").post(createChapter).get(getCourseVersionChapters);
router.get("/:id", getChapterById);

export default router;
