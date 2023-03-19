import mongoose from "mongoose";

const RPDSchema = mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    retryAttempt: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const RPD = mongoose.model("RPD", RPDSchema);

export default RPD;