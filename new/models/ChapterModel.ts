import { Schema, model, models } from "mongoose";
import ChapterVideo from "./ChapterVideo";
const ChapterSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    position: { type: Number, auto: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "ChapterVideo" }],
  },
  {
    timestamps: true,
  }
);

ChapterSchema.pre("findOneAndDelete", async function () {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    await ChapterVideo.deleteMany({ chapter: docToDelete.id });
  } catch (error) {
    return;
  }
});

ChapterSchema.pre("deleteMany", async function () {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    await ChapterVideo.deleteMany({ chapter: docToDelete.id });
  } catch (error) {
    return;
  }
});

const Chapter = models.Chapter || model("Chapter", ChapterSchema);
export default Chapter;
