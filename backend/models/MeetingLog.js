import mongoose from "mongoose";

const MeetingLogSchema = mongoose.Schema(
  {
    contentLog: {
      type: String,
      required: true, 
    },
    dateLog: {
      type: Date,
    },
    studentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    studentSupervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const MeetingLog = mongoose.model("MeetingLog", MeetingLogSchema);

export default MeetingLog;