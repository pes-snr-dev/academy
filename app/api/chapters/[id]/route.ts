import Chapter from "@models/ChapterModel";
import { connectToDB } from "@utils/db";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const chapter = await Chapter.findById(params.id);
    return new Response(JSON.stringify(chapter), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const PUT = async (request: NextApiRequest, { params }) => {
  const { title, description } = await request.json();
  const id = params.id;

  try {
    await connectToDB();
    const chapter = await Chapter.findByIdAndUpdate(id, { title, description });
    return new Response(JSON.stringify(chapter), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    await Chapter.findOneAndDelete({ _id: params.id });
    return new Response(JSON.stringify("Course deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};
