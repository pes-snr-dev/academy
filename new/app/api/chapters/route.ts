import Chapter from "@models/Chapter";
import { connectToDB } from "@utils/db";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  console.log("Im i really called");
  const { title, description, course } = await req.json();

  try {
    await connectToDB();
    const newChapter = new Chapter({
      course,
      title,
      description,
    });
    await newChapter.save();

    return new Response(JSON.stringify(newChapter), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
