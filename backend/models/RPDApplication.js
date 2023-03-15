import mongoose from "mongoose";

const RPDApplicationSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    supervisorName: {
      type: String,
      required: true,
    },
    miniThesisPDF: {
        type: String,
    },
    miniThesisTitle: {
        type: String,
    },
    dateApplyRPD: {
        type: Date,
    },
    dateScheduleRPD: {
        type: Date,
        required: true,
    },
    applicationStatus: {
        type: Boolean,
        required: true,
    },
    studentUser: { //insert only when supervisor choose a specific student
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    facultyUser: { //insert only when supervisor choose a specific student
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    }
  },
  {
    timestamps: true,
  }
);

const RPDApplication = mongoose.model("RPDApplication", RPDApplicationSchema);

export default RPDApplication;