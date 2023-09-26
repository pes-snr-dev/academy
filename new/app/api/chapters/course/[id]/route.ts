import Chapter from "@models/ChapterModel";
import { connectToDB } from "@utils/db";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const course = await Chapter.find({ course: params.id });
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
