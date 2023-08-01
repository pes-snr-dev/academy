import mongoose from "mongoose";
const { Schema } = mongoose;

const ChapterVideoSchema = new Schema(
  {
    filename: {
      type: String,
      required: [true, "Please provide a name for this video."],
    },
    path: {
      type: String,
      required: [true, "Please provide a name for this video."],
    },
    type: {
      type: String,
      required: [true, "Please provide the file type for this video."],
    },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    version: { type: Schema.Types.ObjectId, ref: "Version", required: true },
  },
  {
    timestamps: true,
  }
);

const ChapterVideo = mongoose.model("ChapterVideo", ChapterVideoSchema);

export default ChapterVideo;
