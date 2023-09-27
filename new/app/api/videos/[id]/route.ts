import ChapterVideo from "@models/ChapterVideo";
import { connectToDB } from "@utils/db";

export const DELETE = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    await ChapterVideo.findOneAndDelete({ _id: params.id });
    return new Response(JSON.stringify("Course deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};
