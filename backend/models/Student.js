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
    },
    degreeLvl: {
        type: String,
    },
    academicStatus: {
        type: String,
        default: "Active",
    },
    retryRPDAttempt: { //cannot exceed 3 retries
      type: Number,
      default: 0,
    },
    facultyUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    supervisorUser: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supervisor",
    }
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;