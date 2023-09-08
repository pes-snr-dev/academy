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
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;
