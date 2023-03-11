import mongoose from "mongoose";

const SupervisorSchema = mongoose.Schema(
  {
    usernameSup: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSupervisor: {
        type: Boolean,
        required: true,
        default: false,
    },
    academicPos: {
        type: String,
        // required: true,
    },
    numSupervision: {
        type: Number,
        // required: true,
    },
    facultyUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
  },
  {
    timestamps: true,
  }
);

const Supervisor = mongoose.model("Supervisor", SupervisorSchema);

export default Supervisor;