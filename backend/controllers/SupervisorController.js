import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Supervisor from "../models/Supervisor.js";
import MeetingLog from "../models/MeetingLog.js";
import RPDApplication from "../models/RPDApplication.js";
import RPD from "../models/RPD.js";
import Student from "../models/Student.js";

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

  if (meetingLogStudent) {
    res.status(201).json(meetingLogStudent);
  }
  else {
    res.status(401).json({message: "Unable to retrieve student info"});
  }
});

const supervisorReadMeetingLogByID = asyncHandler(async (req, res) => {

  const meetingLogStudentID = await MeetingLog.findById(req.params.id).populate('studentUser');

  if (meetingLogStudentID) {
    res.status(201).json(meetingLogStudentID);
  }
  else {
    res.status(401).json({ message: "Meeting log of thi student is not found" });
  }
});

const supervisorReadRPDResult = asyncHandler(async (req, res) => {

  const currentSupervisor = req.userSupervisor;

  // const rpdReference = await RPD.find({});
  // const getSupervisingStudent = await Student.find({_id: rpdReference.studentRef, supervisorUser: currentSupervisor});// retry attempt
  // const readRPD = await RPD.find({studentRef: getSupervisingStudent._id}).populate('studRef'); // status, grade, mini thesis, date, fullname 

  // const rpdReference = await RPD.find({});
  const getSupervisingStudent = await Student.find({supervisorUser: currentSupervisor._id});// retry attempt
  const readRPD = await RPD.find({studentRef:getSupervisingStudent}).populate('studentRef'); // status, grade, mini thesis, date, fullname 


  if (readRPD) {
    res.status(201).json(readRPD);
  }
  else {
    res.status(401).json({message: "Unable to retrieve student details"});
  }

})

export { supervisorLogin, supervisorReadMeetingLog, supervisorReadMeetingLogByID, supervisorReadRPDResult };
