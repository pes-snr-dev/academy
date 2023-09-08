import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function uploadFile(
  file: File,
  uploadDir: string,
  ROOT_DIR: string
) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `${uploadDir}/${file.name}`;
    await writeFile(path, buffer);
    return { status: 200, message: `${ROOT_DIR}/${file.name}` };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

export async function removeImage(imagePath: string) {
  if (imagePath) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePreviousThumbnailPath = path.resolve(
        __dirname,
        `../public${imagePath}`
      );

      fs.unlinkSync(filePreviousThumbnailPath);
      return { status: 200, message: "OK" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
