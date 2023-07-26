import express from "express";
import {
  createVersion,
  getVersions,
} from "../controllers/versionController.js";

const router = express.Router();

router.route("/").post(createVersion).get(getVersions);

export default router;
