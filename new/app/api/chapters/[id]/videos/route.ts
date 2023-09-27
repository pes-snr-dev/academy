import ChapterVideo from "@models/ChapterVideo";
import Version from "@models/Version";
import { connectToDB } from "@utils/db";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const videos = await ChapterVideo.find({ chapter: params.id }).populate({
      path: "version",
      model: Version,
    });
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
