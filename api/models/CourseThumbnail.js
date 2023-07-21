import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseThumbnailSchema = new Schema(
  {
    filename: String,
    path: String,
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  {
    timestamps: true,
  }
);

const CourseThumbnail = mongoose.model(
  "CourseThumbnail",
  CourseThumbnailSchema
);

export default CourseThumbnail;
