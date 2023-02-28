import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const FacultySchema = mongoose.Schema(
  {
    userNameFac: {
      type: String,
      required: true,
    },
    //password = 123
    password: {
      type: String,
      required: true,
    },
    isFaculty: {
        type: Boolean,
        required: true,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

// express.js built in api =  methods
FacultySchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  // will encrypt password everytime its saved
  // Only run this function if password was moddified (not on other update functions)
  FacultySchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;