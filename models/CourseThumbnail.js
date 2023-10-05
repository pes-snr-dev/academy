import { Schema, model, models } from "mongoose";

const CourseThumbnailSchema = new Schema(
  {
    filename: String,
    path: String,
    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  {
    timestamps: true,
  }
);

const CourseThumbnail =
  models.CourseThumbnail || model("CourseThumbnail", CourseThumbnailSchema);

export default CourseThumbnail;
