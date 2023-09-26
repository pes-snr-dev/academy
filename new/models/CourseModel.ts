import { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: [true, "The course title is required."] },
    description: {
      type: String,
      required: [true, "The course description is required."],
    },
    coach: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Course publisher is required."],
    },
    thumbnail: {
      type: String,
      required: [true, "A thumbnail is required for this course."],
    },
    cost: {
      type: Number,
      required: [true, "How much will you charge this course."],
    },
    releaseDate: {
      type: Date,
      default: Date.now(),
    },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    headline: {
      type: String,
      required: [true, "Please add a short introduction to your course."],
    },
    transcript: { type: String },
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;
