import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Supervisor from "../models/Supervisor.js";
import MeetingLog from "../models/MeetingLog.js";

const supervisorLogin = asyncHandler(async (req, res) => {
  const { usernameSup, password } = req.body;

  const userSupervisor = await Supervisor.findOne({ usernameSup });
  const validPass = await bcrypt.compare(password, userSupervisor.password);

  if (userSupervisor && validPass) {
    res.status(201).json({
      _id: userSupervisor._id,
      usernameSup: userSupervisor.usernameSup,
      isSupervisor: true,
      token: generateToken(userSupervisor._id),
      successMessage: "Logged in successfully!"
    });
  }
  else {
    res.status(401).json({ message: "Username or Password is incorrect!" });
  }
});

const supervisorReadMeetingLog = asyncHandler(async (req, res) => {
  
  let meetingLogStudent;
  const currentSupervisor = req.userSupervisor;

  meetingLogStudent = await MeetingLog.find({studentSupervisor: currentSupervisor}).populate('studentUser');


  if(meetingLogStudent) {
    res.status(201).json(meetingLogStudent);
  }
  else {
    res.status(401).json({message: "Unable to retrieve student info"});
  }

});

export { supervisorLogin, supervisorReadMeetingLog };
