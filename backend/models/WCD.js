import mongoose from "mongoose";

const WCDSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    thesisTitle: {
      type: String,
      required: true,
    },
    dateScheduleWCD: {
      type: Date,
    },
    grade: {
      type: String,
    },
    // retryAttempt: { //cannot exceed 3 retries
    //   type: Number,
    // },
    status: { // indicates if the student pass already or not
      type: Boolean,
    },
    studentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    wcdApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WCDApplication",
    }
  },
  {
    timestamps: true,
  }
);

const WCD = mongoose.model("WCD", WCDSchema);

export default WCD;