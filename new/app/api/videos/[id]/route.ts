import ChapterVideo from "@models/ChapterVideo";
import { connectToDB } from "@utils/db";
import { removeImage } from "@utils/files";

export const DELETE = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    // Find the Course by ID and remove it
    // await ChapterVideo.findByIdAndRemove(params.id);
    const video = await ChapterVideo.findById(params.id);
    console.log(video.path);
    const response = await removeImage(`${video.path}`);

    if (response?.status === 200) {
      await ChapterVideo.findByIdAndRemove(params.id);
      return new Response(JSON.stringify("Course deleted successfully"), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ message: response.message }), {
      status: 500,
    });
  } catch (error) {
    return new Response(JSON.stringify("Error deleting Course"), {
      status: 500,
    });
  }
};
