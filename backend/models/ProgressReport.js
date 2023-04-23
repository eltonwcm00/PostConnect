import mongoose from "mongoose";

const ProgressReportSchema = mongoose.Schema(
  {
    contentPR: {
      type: String,
    },
    dateSetPR : {
      type: Date,
    },
    dateSubmitPR: {
      type: Date,
    },
    status: {
       type: Boolean,
    },
    registeredPR: {
      type: Boolean,
    },
    prMoreThanOnce: {
      type: Boolean,
    },
    grade: {
        type: Number,
        default: 0,
    },
    studentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    supervisorUser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
    },
    panelUser: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panel",
    },
  },
  {
    timestamps: true,
  }
);

const ProgressReport = mongoose.model("ProgressReport", ProgressReportSchema);

export default ProgressReport;