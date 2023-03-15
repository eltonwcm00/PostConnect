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
    },
    numSupervision: {
        type: Number,
        default: 0,
    },
    numAssignedSupervision: {
      type: Number,
      default: 0,
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