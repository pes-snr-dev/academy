import express from "express";
import {
  createChapter,
  getCourseVersionChapters,
  getChapterById,
} from "../controllers/chapterController.js";
import {
  uploadChapterVideo,
  getChapterVideos,
} from "../controllers/chapterVideoController.js";
import { uploadSingleVideoFileMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/course/:course")
  .post(createChapter)
  .get(getCourseVersionChapters);
router.get("/:id", getChapterById);
router.post(
  "/:chapter/:version/videos",
  uploadSingleVideoFileMiddleware,
  uploadChapterVideo
);

router.get("/:id/videos", getChapterVideos);

export default router;
