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
      // required: true,
    },
    miniThesisTitle: {
      type: String,
      required: true,
    },
    dateApplyRPD: {
      type: Date,
      required: true,
    },
    dateScheduleRPD: {
      type: Date,
        // required: true,
    },
    applicationStatus: {
      type: Boolean,
        // required: true,
    },
    studentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    facultyUser: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  },
  {
    timestamps: true,
  }
);

const RPDApplication = mongoose.model("RPDApplication", RPDApplicationSchema);

export default RPDApplication;