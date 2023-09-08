import { Schema, model, models } from "mongoose";
const chapterSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  {
    timestamps: true,
  }
);

const Chapter = models.Chapter || model("Chapter", chapterSchema);
export default Chapter;
