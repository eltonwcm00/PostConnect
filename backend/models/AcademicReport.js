import mongoose from "mongoose";

const AcademicReportSchema = mongoose.Schema(
  {
    studID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    supID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
    },
    facID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
    rpdID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RPD",
    },
    wcdID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WCD",
    },
    reportProgressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProgressReport",
    },
  },
  {
    timestamps: true,
  }
);

const AcademicReport = mongoose.model("AcademicReport", AcademicReportSchema);

export default AcademicReport;