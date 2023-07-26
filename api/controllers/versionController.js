import asyncHandler from "express-async-handler";
import Version from "../models/Version.js";

const createVersion = asyncHandler(async (req, res) => {
  const { title, abbreviation } = req.body;
  const version = await Version.create({
    title,
    abbreviation,
  });
  if (version) {
    res.status(201).json({ _id: version._id, title: version.title });
  } else {
    res.status(400);
    throw new Error("Invalid data.");
  }
});

const getVersions = asyncHandler(async (req, res) => {
  const versions = await Version.find({}).select("_id title abbreviation");
  if (versions) {
    res.status(200).json(versions);
  } else {
    res.status(404).json({ message: "No versions found" });
  }
});
export { createVersion, getVersions };
