import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    usernameStud: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isStudent: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateJoin: {
        type: Date,
        // required: true,
    },
    degreeLvl: {
        type: String,
    },
    academicStatus: {
        type: String,
        default: "Active",
    }
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;