import mongoose from "mongoose";
const { Schema } = mongoose;

const versionSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    abbreviation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Version = mongoose.model("Version", versionSchema);
export default Version;
