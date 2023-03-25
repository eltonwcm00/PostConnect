import mongoose from "mongoose";

const RPDSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      // required: true,
    },
    miniThesisTitle: {
      type: String,
      required: true,
    },
    dateScheduleRPD: {
      type: Date,
      // required: true,
    },
    grade: {
      type: String,
      // required: true,
    },
    retryAttempt: { //cannot exceed 3 retries
      type: Number,
    },
    status: {
      type: Boolean,
      // default: true,
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