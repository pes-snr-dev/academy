import Version from "@models/Version";
import { connectToDB } from "@utils/db";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const courses = await Version.find();
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const POST = async (req: NextApiRequest) => {
  const { title, abbreviation } = await req.json();
  try {
    await connectToDB();
    const newVersion = new Version({ title, abbreviation });
    await newVersion.save();
    return new Response(JSON.stringify(newVersion), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
