import mongoose from "mongoose";

const WCDApplicationSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    supervisorName: {
      type: String,
      required: true,
    },
    thesisPDF: {
      type: String,
      // required: true,
    },
    thesisTitle: {
      type: String,
      required: true,
    },
    dateApplyWCD: {
      type: Date,
      required: true,
    },
    dateScheduleWCD: {
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

const WCDApplication = mongoose.model("WCDApplication", WCDApplicationSchema);

export default WCDApplication;