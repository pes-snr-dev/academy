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

export { createVersion };
