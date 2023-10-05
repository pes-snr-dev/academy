import fs from "fs";
import Course from "@models/CourseModel";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";
import { uploadFile } from "@utils/files";
import validateImageFile from "@validators/files";
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from "@constants";

export const POST = async (req: NextApiRequest) => {
  const formData = await req.formData();
  let data = Object.fromEntries(formData);

  const { title, description, cost, coachId, file, headline, transcript } =
    data;

  // validate image
  const { status, message } = validateImageFile(
    file,
    ALLOWED_IMAGE_TYPES,
    MAX_IMAGE_SIZE
  );
  if (status !== 200)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  // upload image
  const ROOT_DIR = "/uploads/courses";
  let uploadDir = `./public${ROOT_DIR}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
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
      cost,
      headline,
      transcript,
    });
    await newCourse.save();

    return new Response(JSON.stringify(newCourse), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
