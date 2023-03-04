import mongoose from "mongoose";

const PanelSchema = mongoose.Schema(
  {
    userNamePanel: {
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
  },
  {
    timestamps: true,
  }
);

const Panel = mongoose.model("Panel", PanelSchema);

export default Panel;