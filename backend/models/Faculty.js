import mongoose from "mongoose";

const FacultySchema = mongoose.Schema(
  {
    userNameFac: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isFaculty: {
        type: Boolean,
        required: true,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;