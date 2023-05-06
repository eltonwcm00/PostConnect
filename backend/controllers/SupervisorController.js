import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Supervisor from "../models/Supervisor.js";
import MeetingLog from "../models/MeetingLog.js";
import RPD from "../models/RPD.js";
import WCD from "../models/WCD.js";
import ProgressReport from "../models/ProgressReport.js";

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

const supervisorProfileList = asyncHandler(async (req, res) => {

  const supervisorList = await Supervisor.find();

  if (supervisorList) {
    res.status(201).json(supervisorList);
  }
  else {
    res.status(401).json({message: "No supervisor currently"});
  }
});

const supervisorProfileListByID = asyncHandler(async (req, res) => {

  const supervisorProfileID = await Supervisor.findById(req.params.id);

  if (supervisorProfileID) {
    res.status(201).json(supervisorProfileID);
  }
  else {
    res.status(401).json({ message: "Details of this supervisor is not found" });
  }
});

/*************************************************** MEETING LOG ***************************************************/

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

/*************************************************** END MEETING LOG ***************************************************/

/*************************************************** RPD ***************************************************/

const supervisorReadRPDResult = asyncHandler(async (req, res) => {

  const currentSupervisor = req.userSupervisor;

  const getSupervisingStudent = await Student.find({supervisorUser: currentSupervisor._id});
  const readRPD = await RPD.find({studentRef:getSupervisingStudent})
                              .or([{status:{$eq: false}}, {status:{$eq: true}}])
                                .populate('studentRef'); 

  if (readRPD) {
    res.status(201).json(readRPD);
  }
  else {
    res.status(401).json({message: "Unable to retrieve student details"});
  }
});

/*************************************************** END RPD ***************************************************/

/*************************************************** WCD ***************************************************/

const supervisorReadWCDResult = asyncHandler(async (req, res) => {

  const currentSupervisor = req.userSupervisor;

  const getSupervisingStudent = await Student.find({supervisorUser: currentSupervisor._id});
  const readWCD = await WCD.find({studentRef:getSupervisingStudent})
                              .or([{status:{$eq: false}}, {status:{$eq: true}}])
                                .populate('studentRef');

  if (readWCD) {
    res.status(201).json(readWCD);
  }
  else {
    res.status(401).json({message: "Unable to retrieve student details"});
  }
});

/*************************************************** END WCD ***************************************************/

/*************************************************** PR ***************************************************/

const supervisorReadPR = asyncHandler(async (req, res) => {
  
  const currentSupervisor = req.userSupervisor;

  const getSupervisingStudent = await Student.find({supervisorUser: currentSupervisor._id});
  const PRList = await ProgressReport.find({studentUser: getSupervisingStudent,
                                            dateSubmitPR:{$exists: true}})
                                              .populate('studentUser');

  if(PRList) {
    res.status(201).json(PRList)
  } 
  else {
    res.status(401).json({errorWCDList: "No PR is ready to be evaluate"});
  }
});

const supervisorReadPRByID = asyncHandler(async (req, res) => {

  const fetchPRID = await ProgressReport.findById(req.params.id).populate('studentUser');

  if (fetchPRID) {
    res.status(201).json(fetchPRID);
  }
  else {
    res.status(401).json({message: "Error in .db reference"});
  }
});

const supervisorEvaluatePR = asyncHandler(async (req, res) => {
  
  const fetchPRID = await ProgressReport.findById(req.params.id);
  const insertStudent = await Student.findOne({_id: fetchPRID.studentUser});
  const insertStudentAfterReevaluate = await Student.findOne({_id: fetchPRID.studentUser, 
                                                              retryPRAttempt: {$gte: 1}});
  const { grade } = req.body;

  const hasSupervisor = req.userSupervisor;

  if (!grade) {
    res.status(401).json({message: "Please give a grade for the evaluation of progress report"});
  }
  else {
    fetchPRID.grade = fetchPRID.grade + (parseInt(grade)*0.5);
    fetchPRID.supervisorUser = hasSupervisor;
    const prGrade = await fetchPRID.save();

    if (prGrade) {
      res.status(201).json({
        prGrade,
        messagePRSuccess: `The progress report is evaluated, the grade of the evaluation is given by ${grade}`
      });
    }
  }

  if ((fetchPRID.panelUser && fetchPRID.supervisorUser) 
        && (fetchPRID.grade > 0 && fetchPRID.grade < 3)) {
    fetchPRID.status = false;
  }
  else if ((fetchPRID.panelUser && fetchPRID.supervisorUser) 
             && (fetchPRID.grade > 0 && fetchPRID.grade >= 3)) {
    fetchPRID.status = true;

    // 'S' grade after re-evaluated 
    if(insertStudentAfterReevaluate) {
      insertStudent.retryPRAttempt = 0;
      await insertStudent.save();
    }
  }
  await fetchPRID.save();
  
  // 'US' grade if total grade < 3
  if((fetchPRID.grade > 0 && fetchPRID.grade < 3) && fetchPRID.status === false) {
    insertStudent.retryPRAttempt = insertStudent.retryPRAttempt + 1;
    await insertStudent.save();
  }
});

const supervisorReadPRResult = asyncHandler(async (req, res) => {

  const currentSupervisor = req.userSupervisor;

  const getSupervisingStudent = await Student.find({supervisorUser: currentSupervisor._id});
  const readRPD = await ProgressReport.find({studentUser:getSupervisingStudent})
                              .or([{status:{$eq: false}}, {status:{$eq: true}}])
                                .populate('studentUser'); 

  if (readRPD) {
    res.status(201).json(readRPD);
  }
  else {
    res.status(401).json({message: "Unable to retrieve student details"});
  }
});


export { supervisorLogin, supervisorProfileList, supervisorProfileListByID,
         supervisorReadMeetingLog, supervisorReadMeetingLogByID,
         supervisorReadRPDResult, supervisorReadWCDResult, 
         supervisorReadPR, supervisorReadPRByID, supervisorEvaluatePR, supervisorReadPRResult };
