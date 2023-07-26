import express from "express";
import { createVersion } from "../controllers/versionController.js";

const router = express.Router();

router.post("/", createVersion);

export default router;
