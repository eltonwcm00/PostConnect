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
    },
    facultyUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;