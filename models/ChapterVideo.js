import { Schema, model, models } from "mongoose";
import { removeImage } from "@utils/files";
import { updateVideoNumbers } from "./helpers/videos";

const ChapterVideoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this video."],
    },
    filename: {
      type: String,
      required: [true, "Please provide a name for this video."],
    },
    path: {
      type: String,
      required: [true, "Please provide a path for this video."],
    },
    type: {
      type: String,
      required: [true, "Please provide the file type for this video."],
    },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    version: { type: Schema.Types.ObjectId, ref: "Version", required: true },
    video_number: { type: Number },
  },
  {
    timestamps: true,
  }
);

ChapterVideoSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    await updateVideoNumbers(doc.chapter, doc.version);
  }
);

ChapterVideoSchema.post("findOneAndDelete", async function (doc) {
  await updateVideoNumbers(doc.chapter, doc.version);
});

ChapterVideoSchema.pre("findOneAndDelete", async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  const response = await removeImage(`${docToUpdate.path}`);
  if (response?.status !== 200) throw new Error(response.message);
});

ChapterVideoSchema.pre("deleteMany", async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  const response = await removeImage(`${docToUpdate.path}`);
  if (response?.status !== 200) throw new Error(response.message);
});

ChapterVideoSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) return next();

    const videoWithMaxNumber = await this.constructor
      .findOne({ chapter: this.chapter, version: this.version })
      .sort("-video_number")
      .select("video_number")
      .exec();

    const nextVideoNumber = (videoWithMaxNumber?.video_number || 0) + 1;
    this.video_number = nextVideoNumber;
    return next();
  } catch (error) {
    return next(error);
  }
});

const ChapterVideo =
  models.ChapterVideo || model("ChapterVideo", ChapterVideoSchema);

export default ChapterVideo;
