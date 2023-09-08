import Course from "@models/Course";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const courses = await Course.find({ coach: params.id });
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
