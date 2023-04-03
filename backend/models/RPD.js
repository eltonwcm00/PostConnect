import mongoose from "mongoose";

const RPDSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    miniThesisTitle: {
      type: String,
      required: true,
    },
    dateScheduleRPD: {
      type: Date,
    },
    grade: {
      type: String,
    },
    retryAttempt: { //cannot exceed 3 retries
      type: Number,
    },
    status: { // indicates if the student pass already or not
      type: Boolean,
    },
    rpdApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RPDApplication",
    }
  },
  {
    timestamps: true,
  }
);

const RPD = mongoose.model("RPD", RPDSchema);

export default RPD;