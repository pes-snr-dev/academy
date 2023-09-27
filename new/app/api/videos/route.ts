import fs from "fs";
import ChapterVideo from "@models/ChapterVideo";
import { connectToDB } from "@utils/db";
import type { NextApiRequest } from "next";
import { uploadFile } from "@utils/files";
import validateImageFile from "@validators/files";

const allowedThumbnailTypes = [
  "video/x-flv",
  "video/x-ms-wmv",
  "video/x-msvideo",
  "video/quicktime",
  "video/3gpp",
  "video/MP2T",
  "application/x-mpegURL",
  "video/mp4",
];

const thumbnailMaxSize = 20;

export const POST = async (req: NextApiRequest) => {
  const formData = await req.formData();
  let data = Object.fromEntries(formData);

  const { title, chapter, version, file } = data;

  const ROOT_DIR = `/videos/${chapter}/${version}`;
  let uploadDir = `./public${ROOT_DIR}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const { status, message } = validateImageFile(
    file,
    allowedThumbnailTypes,
    thumbnailMaxSize
  );
  if (status !== 200)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });

  const { status: uploadStatus, message: uploadMessage } = await uploadFile(
    file,
    uploadDir,
    ROOT_DIR
  );

  if (uploadStatus !== 200) {
    return new Response(JSON.stringify({ error: uploadMessage }), {
      status: 500,
    });
  }

  try {
    await connectToDB();
    const newChapterVideo = new ChapterVideo({
      title,
      filename: file.name,
      path: uploadMessage,
      type: file.type,
      chapter,
      version,
    });
    await newChapterVideo.save();

    return new Response(JSON.stringify(newChapterVideo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
