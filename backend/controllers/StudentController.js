import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import Student from "../models/Student.js";
import RPDApplication from "../models/RPDApplication.js";
import RPD from "../models/RPD.js";
import MeetingLog from "../models/MeetingLog.js";

const studentLogin = asyncHandler(async (req, res) => {
    const { usernameStud, password } = req.body;
  
    const userStudent = await Student.findOne({ usernameStud });
    const validPass = await bcrypt.compare(password, userStudent.password);
  
    if (userStudent && validPass) {
      res.status(201).json({
        _id: userStudent._id,
        usernameStud: userStudent.usernameStud,       
        dateJoined: userStudent.dateJoin,
        isStudent: true,
        token: generateToken(userStudent._id),
        successMessage: "Logged in successfully!"
      });
    } 
    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
});

const studentViewDataRequestRPD = asyncHandler(async (req, res) => {

  let currentStudInfo;

  const currentStudent = req.userStudent;
  
  currentStudInfo = await Student.find({ _id: currentStudent}); //findByID(req.params.id)

  if (currentStudInfo) {
    res.status(201).json(currentStudInfo)
  }
  else {
    res.status(401).json({message: "Yout student details are not found, please refer to faculty"});
  }
})

const studentRequestRPD = asyncHandler(async (req, res) => {

  const { fullName, miniThesisTitle, supervisorName, miniThesisPDF } = req.body;
  const currentStudent = req.userStudent;

  let appliedRPD;

  const hasApplied = await RPDApplication.findOne({ studentUser: currentStudent });

  const hasSupervisor = req.userStudent.supervisorUser;

  if (!hasSupervisor) {
    res.status(401).json({message: "Access denied! you have not been assigned to any supervisor, please refer to faculty"});
  }
  else if (hasApplied) { 
    res.status(401).json({message: "You have applied the application previously"});
  }
  else if (currentStudent) {
    
    // if(fullName.trim().length === 0) { res.status(401).json({message: "Please fill in your full name"});}
    if(miniThesisTitle.trim().length === 0) {res.status(401).json({message: "Please fill in your mini thesis title"});}
    // else if(supervisorName.trim().length === 0) { res.status(401).json({message: "Please fill your supervisor name"});}
    else if (miniThesisPDF.trim().length === 0) { res.status(401).json({message: "Please upload your mini thesis .pdf file"});}

    appliedRPD = await RPDApplication.create({
      //fullName,
      fullName: currentStudent.usernameStud,
      miniThesisTitle,
      // supervisorName,
      supervisorName: hasSupervisor,
      miniThesisPDF, // miniThesisPDF: req.file, //req.file.filename
      dateApplyRPD: moment(),
      studentUser: currentStudent,
    });
  }
  else {
    res.status(500);
    console.log(req.file.path);
    throw new Error("Internal server error");
  }
  
  if (appliedRPD) {
    res.status(201).json({
      _id: appliedRPD._id,
      fullName: appliedRPD.fullName,
      miniThesisTitle: appliedRPD.miniThesisTitle,
      supervisorName: appliedRPD.supervisorName,
      miniThesisPDF: appliedRPD.miniThesisPDF,
      dateApplyRPD: appliedRPD.dateApplyRPD,
      applicationStatus: appliedRPD.applicationStatus,
      studentUser: appliedRPD.studentUser,
      successMessage: "The RPD request application is submitted",
    })
  }
});

const studentViewRPDApplication = asyncHandler(async (req, res) => {

  const currentStudent = req.userStudent;
  
  const appliedForRPD = await RPDApplication.findOne({ studentUser: currentStudent}); 
  const applicationFalseStatus = await RPDApplication.findOne({ studentUser: currentStudent, applicationStatus: false});
  const applicationTrueStatus = await RPDApplication.findOne({ studentUser: currentStudent, applicationStatus: true});
  const rpdPassed = await RPD.findOne({fullname:currentStudent.usernameStud, status: true})
  

  if (appliedForRPD) { 
    
    if (applicationFalseStatus) {
      res.status(201).json({applicationStatusMsg: `Sorry, your RPD application on ${moment(appliedForRPD.dateApplyRPD).format('MMMM Do YYYY')} 
                              is rejected, please refer to your supervisor`});
    }
    else if (rpdPassed) {
      res.status(201).json({applicationStatusMsg: "Congratulation! You have passed your RPD and received a 'Satisfactory (S)' grade"});
    }
    else if (applicationTrueStatus) {
      res.status(201).json({applicationStatusMsg: `Congratulation! Your RPD application on ${moment(appliedForRPD.dateApplyRPD).format('MMMM Do YYYY')} 
                              is approved, the RPD will be happened roughly after 2 weeks`});
    }
    else {
      res.status(201).json({applicationStatusMsg: `Your RPD application on ${moment(appliedForRPD.dateApplyRPD).format('MMMM Do YYYY')} 
                              is pending to be approved`});
    }
  }
  else {
    let days = 0;
    if (currentStudent.degreeLvl === 'Doctoral Degree (Part-Time)') { 
      days = 365;
    }
    else if (currentStudent.degreeLvl === 'Doctoral Degree (Full-Time)') {
      days = 274;
    }
    else if (currentStudent.degreeLvl === 'Master Degree (Part-Time)') {
      days = 274;
    }
    else if (currentStudent.degreeLvl === 'Master Degree (Full-Time)') {
      days = 183;
    }
    res.status(201).json({applicationStatusMsg: `You have not yet apply for the RPD, the due date to apply is on, 
      ${moment(currentStudent.dateJoin).add(days, 'days').format('MMMM Do YYYY')}`});
  }
});

const studentSubmitMeetingLog = asyncHandler(async (req, res) => {
  
  let submitLog;
  const currentStudent = req.userStudent;
  const today = moment().format('l');

  const { contentLog } = req.body;

  const studentSupervisor = await Student.findById(currentStudent).populate('supervisorUser')
  const recentExist = await MeetingLog.findOne({ studentUser: currentStudent, dateLog: today});

  if (recentExist) {
    res.status(401).json({message: "You have already submitted the meeting log for today, please try again on tomorrow"});
  }
  else if (contentLog.trim().length === 0) {
    res.status(401).json({message: "Please fill in the meeting log content"});
  }
  else {
    submitLog = await MeetingLog.create({
      contentLog,
      dateLog: moment().format('l'),
      studentUser: currentStudent,
      studentSupervisor: studentSupervisor.supervisorUser,
    })
  }

  if(submitLog) {
    res.status(201).json({
      contentLog: submitLog.contentLog,
      dateLog: submitLog.dateLog,
      studentUser: submitLog.studentUser,
      studentSupervisor: studentSupervisor.supervisorUser,
      sucessMessage: "You have successfully submited the meeting log",
    })
  }
});

const studentViewMeetingLog = asyncHandler(async (req, res) => {

  const currentStudent = req.userStudent;
  
  const submitedMeetingLog = await MeetingLog.findOne({ studentUser: currentStudent}); 

  if (submitedMeetingLog) { 
      res.status(201).json({meetingLogStatusMsg: `Your meeting log has been submitted! Kindly submit the next meeting logs
         in 2 weeks later, on date ${moment(submitedMeetingLog.dateLog).add(14, 'days').format('MMMM Do YYYY')}`});
  }
  else {
     res.status(201).json({meetingLogStatusMsg: `You have not yet submit the meeting log! Kindly submit within 14 days
        from your registration date. Last day to submit is on ${moment(currentStudent.dateJoin).add(14, 'days').format('MMMM Do YYYY')}`});
  }
});

export {studentLogin, studentViewDataRequestRPD, studentRequestRPD, studentViewRPDApplication, studentSubmitMeetingLog, studentViewMeetingLog};
