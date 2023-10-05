import { Schema, model, models } from "mongoose";
import ChapterVideo from "./ChapterVideo";
import { updateChapterNumbers } from "./helpers/chapter";

const ChapterSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    chapter_number: { type: Number },
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

ChapterSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    await updateChapterNumbers(doc.course);
  }
);

ChapterSchema.post("findOneAndDelete", async function (doc) {
  await updateChapterNumbers(doc.course);
});

ChapterSchema.pre("deleteMany", async function () {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    await ChapterVideo.deleteMany({ chapter: docToDelete.id });
    await updateChapterNumbers(docToDelete.course);
  } catch (error) {
    return;
  }
});

ChapterSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) return next();

    const chapterWithMaxNumber = await this.constructor
      .findOne({ course: this.course })
      .sort("-chapter_number")
      .select("chapter_number")
      .exec();

    const nextChapterNumber = (chapterWithMaxNumber?.chapter_number || 0) + 1;
    this.chapter_number = nextChapterNumber;
    return next();
  } catch (error) {
    return next(error);
  }
});

const Chapter = models.Chapter || model("Chapter", ChapterSchema);
export default Chapter;
