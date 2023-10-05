import Course from "@models/CourseModel";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest) => {
  try {
    await connectToDB();
    const courses = await Course.find({}).populate("coach");
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
