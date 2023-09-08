import fs from "fs";
import Course from "@models/Course";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";
import { uploadFile } from "@utils/files";
import validateImageFile from "@validators/files";

const allowedThumbnailTypes = [
  "image/webp",
  "image/tiff",
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/vnd.microsoft.icon",
  "image/gif",
  "image/bmp",
];

const thumbnailMaxSize = 5;

export const POST = async (req: NextApiRequest) => {
  const formData = await req.formData();
  let data = Object.fromEntries(formData);

  const { title, description, coachId, file } = data;

  const ROOT_DIR = "/uploads/courses";
  let uploadDir = `./public${ROOT_DIR}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const { status, message } = validateImageFile(
    file,
    allowedThumbnailTypes,
    thumbnailMaxSize
  );
  if (status !== 200)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });

  const { status: uploadStatus, message: uploadMessage } = await uploadFile(
    file,
    uploadDir,
    ROOT_DIR
  );

  if (uploadStatus !== 200) {
    return new Response(JSON.stringify({ error: uploadMessage }), {
      status: 500,
    });
  }

  try {
    await connectToDB();
    const newCourse = new Course({
      coach: coachId,
      title,
      description,
      thumbnail: uploadMessage,
    });
    await newCourse.save();

    return new Response(JSON.stringify(newCourse), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
