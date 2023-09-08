import { Schema, model, models } from "mongoose";
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

const Version = models.Version || model("Version", versionSchema);
export default Version;
