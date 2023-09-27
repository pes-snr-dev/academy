import { Schema, model, models } from "mongoose";
import { removeImage } from "@utils/files";

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
    position: { type: Number, auto: true },
  },
  {
    timestamps: true,
  }
);

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

const ChapterVideo =
  models.ChapterVideo || model("ChapterVideo", ChapterVideoSchema);

export default ChapterVideo;
