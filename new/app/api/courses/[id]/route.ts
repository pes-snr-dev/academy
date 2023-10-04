import fs from "fs";
import Course from "@models/CourseModel";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";
import { removeImage, uploadFile } from "@utils/files";
import validateImageFile from "@validators/files";
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from "@constants";
import Chapter from "@models/ChapterModel";
import User from "@models/UserModel";
import ChapterVideo from "@models/ChapterVideo";
import Version from "@models/Version";

export const DELETE = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    // Find the Course by ID and remove it
    await Course.findOneAndDelete({ _id: params.id });

    return new Response(JSON.stringify("Course deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};

// note 200 when no content found return message instead of catch for better error

export const GET = async (request: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    const course = await Course.findById(params.id)
      .populate({ path: "coach", model: User })
      .exec();
    const chapters = await Chapter.find({ course: course }).sort({
      chapter_number: 1,
    });
    course.chapters = chapters;
    const chapterVideosList = [];
    for (const chapter of chapters) {
      const chapterVideos = await ChapterVideo.find({
        chapter: chapter._id,
      }).populate({ path: "version", model: Version });
      chapterVideosList.push(...chapterVideos);
    }
    course.videos = chapterVideosList;
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const PUT = async (request: NextApiRequest, { params }) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  let id = params.id;
  const { title, description, file, headline, transcript } = data;
  try {
    const course = await Course.findById(id);
    if (file && file !== "null") {
      const response = await removeImage(`${course.thumbnail}`);

      if (response?.status === 200) {
        // validate image
        const { status: validateStatus, message: validateMessage } =
          validateImageFile(file, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE);
        if (validateStatus !== 200)
          return new Response(JSON.stringify({ error: validateMessage }), {
            status: 500,
          });

        const ROOT_DIR = "/uploads/courses";
        let uploadDir = `./public${ROOT_DIR}`;
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const { status, message } = await uploadFile(file, uploadDir, ROOT_DIR);
        if (status === 200)
          await Course.findByIdAndUpdate(id, {
            thumbnail: message,
            title: title,
            description: description,
            headline: headline,
            transcript: transcript,
          });
        return new Response(JSON.stringify(course), { status: 200 });
      }

      return new Response(JSON.stringify({ message: response.message }), {
        status: 500,
      });
    }
    await Course.findByIdAndUpdate(id, {
      title,
      description,
      headline,
      transcript,
    });
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.log(error, "in catch");
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
