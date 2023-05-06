import mongoose from "mongoose";

const PanelSchema = mongoose.Schema(
  {
    usernamePanel: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPanel: {
        type: Boolean,
        required: true,
        default: false,
    },
    facultyUser: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Faculty",
    },
  },
  {
    timestamps: true,
  }
);

const Panel = mongoose.model("Panel", PanelSchema);

export default Panel;