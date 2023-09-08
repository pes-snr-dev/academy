import Course from "@models/Course";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";
import { removeImage, uploadImageFile } from "@utils/files";

export const DELETE = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    // Find the Course by ID and remove it
    await Course.findByIdAndRemove(params.id);

    return new Response(JSON.stringify("Course deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Error deleting Course"), {
      status: 500,
    });
  }
};

// note 200 when no content found return message in catch for better error

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    const course = await Course.findById(params.id);
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const PUT = async (request: NextApiRequest, { params }) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  let id = params.id;
  const { title, description, file } = data;
  try {
    const course = await Course.findById(id);
    if (file) {
      const response = await removeImage(`${course.thumbnail}`);
      if (response?.status === 200) {
        const { status, message } = await uploadImageFile(file);
        if (status === 200)
          await Course.findByIdAndUpdate(id, {
            thumbnail: message,
            title: title,
            description: description,
          });
        return new Response(JSON.stringify(course), { status: 200 });
      }
      return new Response(JSON.stringify({ message: response.message }), {
        status: 500,
      });
    }
    await Course.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.log(error, "in catch");
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
