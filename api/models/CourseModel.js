import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
