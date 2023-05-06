import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import Student from "../models/Student.js";
import RPDApplication from "../models/RPDApplication.js";
import RPD from "../models/RPD.js";
import MeetingLog from "../models/MeetingLog.js";
import WCDApplication from "../models/WCDApplication.js";
import WCD from "../models/WCD.js";
import ProgressReport from "../models/ProgressReport.js";

const studentLogin = asyncHandler(async (req, res) => {
    const { usernameStud, password } = req.body;
  
    const userStudent = await Student.findOne({ usernameStud });
    const validPass = await bcrypt.compare(password, userStudent.password);
  
    if (userStudent && validPass) {
      res.status(201).json({
        _id: userStudent._id,
        usernameStud: userStudent.usernameStud,       
        dateJoined: userStudent.dateJoin,
        isStudent: userStudent.isStudent,
        retryRPDAttempt: userStudent.retryRPDAttempt,
        retryWCDAttempt: userStudent.retryWCDAttempt,
        retryPRAttempt: userStudent.retryPRAttempt,
        token: generateToken(userStudent._id),
        successMessage: "Logged in successfully!"
      });
    } 
    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
});

const studentProfileList = asyncHandler(async (req, res) => {

  const studentList = await Student.find();

  if (studentList) {
    res.status(201).json(studentList);
  }
  else {
    res.status(401).json({message: "No student currently"});
  }
});

const studentProfileListByID = asyncHandler(async (req, res) => {

  const studentProfileID = await Student.findById(req.params.id);

  if (studentProfileID) {
    res.status(201).json(studentProfileID);
  }
  else {
    res.status(401).json({ message: "Details of this student is not found" });
  }
});

const systemReadVerifyStudentStatus = asyncHandler(async (req, res) => {
    
  const currentStudent = req.userStudent;

  const currentStudInfo = await Student.findOne({ _id: currentStudent});

  if (currentStudInfo) {
    res.status(201).json(currentStudInfo);
  }
});

const systemVerifyStudentStatus = asyncHandler(async (req, res) => {
 
  let terminationCause = ""

  const currentStudent = req.userStudent;

  const currentTerminateExceedStudyStudInfo = await Student.findOne({ _id: currentStudent})
                                                              .and([
                                                                  {isStudent: false},
                                                                  {retryRPDAttempt: {$lt: 3}}, 
                                                                  {retryWCDAttempt: {$lt: 3}},
                                                                  {retryPRAttempt: {$lt: 3}}]);  

  const currentStudInfo = await Student.findOne({ _id: currentStudent})
                                          .or([
                                               {retryRPDAttempt: {$gte: 3}}, 
                                               {retryWCDAttempt: {$gte: 3}},
                                               {retryPRAttempt: {$gte: 3}}]);

  if (currentTerminateExceedStudyStudInfo) {
    res.status(201).json({
      terminateMsg: `You have been terminated from studies due to the fact that you have 
                     exceed the maximum amount of study duration. Pleae refer this case your supervisor`});
  }
  else {
    if (!currentStudInfo) {
      res.status(401).json({message: "No student is found"});  
      return;
    }
    else if (currentStudInfo) {
          currentStudInfo.isStudent = false;   
          const terminateStudStatus = await currentStudInfo.save(); 
          
          if (currentStudInfo.retryRPDAttempt >= 3) {
            terminationCause = "Research Proposal Defence (RPD)";
          }
          else if (currentStudInfo.retryWCDAttempt >= 3) {
            terminationCause = "Work Completion Defence (WCD)";
          }
          else if (currentStudInfo.retryPRAttempt >= 3) {
            terminationCause = "Progress Report (PR)";
          }

          if (terminateStudStatus) {
              res.status(201).json({studentStatus: terminateStudStatus.isStudent, 
                                    terminateMsg: `You have been terminated from studies due to the fact that you have 
                                                  received 'Unsatisfactory (US)' grade for ${terminationCause}. 
                                                  Please refer this case to your supervisor`});
          }
    }
  }
});

// course completion status, when student passed rpd, wcd, ppm

/*************************************************** RPD ***************************************************/

const studentViewDataRequestRPD = asyncHandler(async (req, res) => {

  let currentStudInfo;

  const currentStudent = req.userStudent;
  
  currentStudInfo = await Student.find({ _id: currentStudent}) //findByID(req.params.id)
  // currentStudInfo = await Student.find({ _id: currentStudent})

  if (currentStudInfo) {
    res.status(201).json(currentStudInfo)
  }
  else {
    res.status(401).json({message: "Your student details are not found, please refer to faculty"});
  }
})

const studentRequestRPD = asyncHandler(async (req, res) => {

  const { fullName, miniThesisTitle, supervisorName, miniThesisPDF } = req.body;
  const currentStudent = req.userStudent;

  let appliedRPD;

  const hasApplied = await RPDApplication.findOne({ studentUser: currentStudent });
  const isReApplyAllow = await Student.findOne({studentUser: currentStudent, 
                                              retryRPDAttempt: {$gte: 1}});
  //const isRPDFailed = await RPD.findOne({fullname:currentStudent.usernameStud, status: false});

  const hasSupervisor = req.userStudent.supervisorUser;

  if (!hasSupervisor) {
    res.status(401).json({message: "Access denied! you have not been assigned to any supervisor, please refer to faculty"});
  }
  else if (hasApplied && (!isReApplyAllow)) { 
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
  const rpdPassed = await RPD.findOne({fullname:currentStudent.usernameStud, status: true});
  const rpdFailed = await RPD.findOne({fullname:currentStudent.usernameStud, status: false});
  // const rpdReapplied = await Student.findOne({fullname:currentStudent.usernameStud, retryRPDAttempt: {$gte: 1}});


  if (appliedForRPD) { 
    
    if (applicationFalseStatus) {
      res.status(201).json({applicationStatusMsg: `Sorry, your RPD application on ${moment(appliedForRPD.dateApplyRPD).format('MMMM Do YYYY')} 
                              is rejected, please refer to your supervisor`,
                            updatedAt: applicationFalseStatus.updatedAt});
    }
    else if (rpdPassed) {
      res.status(201).json({applicationStatusMsg: "Congratulation! You have received a 'Satisfactory (S)' grade and passed your RPD",
                            updatedAt: rpdPassed.updatedAt});
    }
    else if (rpdFailed) {
      res.status(201).json({applicationStatusMsg: "Sorry, You have received a 'Unsatisfactory (US)' grade and failed your RPD, please re-apply the RPD",
                            updatedAt: rpdFailed.updatedAt});
    }
    else if (applicationTrueStatus) {
      res.status(201).json({applicationStatusMsg: `Congratulation! Your RPD application on ${moment(appliedForRPD.dateApplyRPD).format('MMMM Do YYYY')} 
                              is approved, the RPD will be happened roughly after 2 weeks`,
                            updatedAt: applicationTrueStatus.updatedAt});
    }
    else {
      res.status(201).json({applicationStatusMsg: `Your RPD application on ${moment(appliedForRPD.dateApplyRPD).format('MMMM Do YYYY')} 
                              is pending to be approved`,
                            updatedAt: appliedForRPD});
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

/*************************************************** END RPD ***************************************************/

/*************************************************** MEETING LOG ***************************************************/
const studentSubmitMeetingLog = asyncHandler(async (req, res) => {
  
  let submitLog;
  const currentStudent = req.userStudent;
  // const today = moment().format('l');

  const { contentLog, dateMeetingLog } = req.body;

  let dateSubmit_ = moment(dateMeetingLog);
  let todayDate = moment();

  const studentSupervisor = await Student.findById(currentStudent).populate('supervisorUser')
  // const recentExist = await MeetingLog.findOne({ studentUser: currentStudent, dateLog: today});

  // if (recentExist) {
  //   res.status(401).json({message: "You have already submitted the meeting log for today, please try again on tomorrow"});
  // }
  if (!req.userStudent.supervisorUser) {
    res.status(401).json({message: "Access denied! you have not been assigned to any supervisor, please refer to faculty"});
  }
  else if (!dateMeetingLog) {
    res.status(401).json({message: "Please fill in the meeting log date"});
  }
  else if (dateSubmit_ > todayDate) {
    res.status(401).json({message: "Invalid, the meeting log date is greater than today's date"});
  }
  else if (contentLog.trim().length === 0) {
    res.status(401).json({message: "Please fill in the meeting log content"});
  }
  else {
    submitLog = await MeetingLog.create({
      contentLog,
      dateLog: moment(dateMeetingLog).format('l'),
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
                                                  after the next meeting`,
                            updatedAt: submitedMeetingLog.updatedAt});
  }
  else {
     res.status(201).json({meetingLogStatusMsg: `You have not yet submit the meeting log! Kindly submit within 14 days
                                                 from your registration date. Last day to submit is on ${moment(currentStudent.dateJoin).add(14, 'days').format('MMMM Do YYYY')}`});
  }
});
/*************************************************** END MEETING LOG ***************************************************/

/*************************************************** WCD ***************************************************/

const studentRequestWCD = asyncHandler(async (req, res) => {

  const { thesisTitle, thesisPDF } = req.body;
  const currentStudent = req.userStudent;

  let appliedRPD;

  const hasApplied = await WCDApplication.findOne({ studentUser: currentStudent });
  const isReApplyAllow = await Student.findOne({studentUser: currentStudent, 
                                                retryWCDAttempt: {$gte: 1}});

  const hasSupervisor = req.userStudent.supervisorUser;

  if (!hasSupervisor) {
    res.status(401).json({message: "Access denied! you have not been assigned to any supervisor, please refer to faculty"});
  }
  else if (hasApplied && (!isReApplyAllow)) { 
    res.status(401).json({message: "You have applied the application previously"});
  }
  else if (currentStudent) {
    
    // if(fullName.trim().length === 0) { res.status(401).json({message: "Please fill in your full name"});}
    if(thesisTitle.trim().length === 0) {res.status(401).json({message: "Please fill in your full thesis title"});}
    // else if(supervisorName.trim().length === 0) { res.status(401).json({message: "Please fill your supervisor name"});}
    else if (thesisPDF.trim().length === 0) { res.status(401).json({message: "Please upload your full thesis .pdf file"});}

    appliedRPD = await WCDApplication.create({
      //fullName,
      fullName: currentStudent.usernameStud,
      thesisTitle,
      // supervisorName,
      supervisorName: hasSupervisor,
      thesisPDF, // miniThesisPDF: req.file, //req.file.filename
      dateApplyWCD: moment(),
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
      fullThesisTitle: appliedRPD.thesisTitle,
      supervisorName: appliedRPD.supervisorName,
      thesisPDF: appliedRPD.thesisPDF,
      dateApplyWCD: appliedRPD.dateApplyWCD,
      applicationStatus: appliedRPD.applicationStatus,
      studentUser: appliedRPD.studentUser,
      successMessage: "The WCD request application is submitted",
    })
  }
});

const studentViewWCDApplication = asyncHandler(async (req, res) => {

  const currentStudent = req.userStudent;
  
  const appliedForWCD = await WCDApplication.findOne({ studentUser: currentStudent}); 
  const applicationFalseStatus = await WCDApplication.findOne({ studentUser: currentStudent, applicationStatus: false});
  const applicationTrueStatus = await WCDApplication.findOne({ studentUser: currentStudent, applicationStatus: true});
  const wcdPassed = await WCD.findOne({fullname:currentStudent.usernameStud, status: true});
  const wcdFailed = await WCD.findOne({fullname:currentStudent.usernameStud, status: false});
  // const rpdReapplied = await Student.findOne({fullname:currentStudent.usernameStud, retryRPDAttempt: {$gte: 1}});


  if (appliedForWCD) { 
    
    if (applicationFalseStatus) {
      res.status(201).json({applicationStatusMsg: `Sorry, your WCD application on ${moment(appliedForWCD.dateApplyWCD).format('MMMM Do YYYY')} 
                                                   is rejected, please refer to your supervisor`,
                            updatedAt: applicationFalseStatus.updatedAt});
    }
    else if (wcdPassed) {
      res.status(201).json({applicationStatusMsg: "Congratulation! You have received a 'Satisfactory (S)' grade and passed your WCD",
                            updatedAt: wcdPassed.updatedAt});
    }
    else if (wcdFailed) {
      res.status(201).json({applicationStatusMsg: "Sorry, You have received a 'Unsatisfactory (US)' grade and failed your WCD please re-apply the WCD",
                            updatedAt: wcdFailed.updatedAt});
    }
    else if (applicationTrueStatus) {
      res.status(201).json({applicationStatusMsg: `Congratulation! Your WCD application on ${moment(appliedForWCD.dateApplyWCD).format('MMMM Do YYYY')} 
                                                   is approved, the WCD will be happened roughly after 2 weeks`,
                            updatedAt: applicationTrueStatus.updatedAt});
    }
    else {
      res.status(201).json({applicationStatusMsg: `Your WCD application on ${moment(appliedForWCD.dateApplyWCD).format('MMMM Do YYYY')} 
                                                   is pending to be approved`,
                            updatedAt: appliedForWCD.updatedAt});
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
    res.status(201).json({applicationStatusMsg: `You have not yet apply for the WCD, the due date to apply is on, 
      ${moment(currentStudent.dateJoin).add(days, 'days').format('MMMM Do YYYY')}`});
  }
});

/*************************************************** END WCD ***************************************************/

/*************************************************** PR ***************************************************/

const studentRegisterPRLandingPage = asyncHandler(async (req, res) => {
  
  const currentStudent = req.userStudent;

  const fetchPRDate = await ProgressReport.findOne({dateSetPR:{$exists: true}});
  const fetchPRRegisteredStatus = await ProgressReport.findOne({studentUser: currentStudent});

  if (fetchPRDate) {
    res.status(201).json({
      date: moment(fetchPRDate.dateSetPR).format('MMMM Do YYYY'),
      registeredPR: fetchPRRegisteredStatus?.registeredPR,
    })
  }
  else {
    res.status(201).json({prDate: `The date of progress report submission is not yet annouce by the faculty. Kindly wait for further annoucement`})
  }
});

const studentRegisterPR = asyncHandler(async (req, res) => {
  
  let todayDate = moment();
  let insertPRRegisteredStatus;

  const currentStudent = req.userStudent;

  const fetchPRDate = await ProgressReport.findOne({dateSetPR:{$exists: true}});

  const hasSupervisor = req.userStudent.supervisorUser;

  if (!hasSupervisor) {
    res.status(401).json({message: "Access denied! you have not been assigned to any supervisor, please refer to faculty"});
  }

  if (fetchPRDate) {
    if (todayDate > moment(fetchPRDate.dateSetPR)) {
      res.status(401).json({ message: "Sorry. The registration date for progress report submission is closed" });
    }
    else {
      const fetchPRRegisteredStatus = await ProgressReport.findOne({studentUser: currentStudent, registeredPR:{$exists: true}});
      if (fetchPRRegisteredStatus) {
        res.status(401).json({ message: "You have registered for progress report submission before. Kindly proceed to submit your progress report" });
      }
      else {
        insertPRRegisteredStatus = await ProgressReport.create({
          studentUser: currentStudent,
          registeredPR: true,
        });
        if (insertPRRegisteredStatus) {
          res.status(201).json({
            studentUser: insertPRRegisteredStatus.studentUser, 
            registeredPR: insertPRRegisteredStatus.registeredPR, 
            messagePRSucess: "You have successfully registered for the progress report submission. Kindly proceed to submit your progress report"
          })
        }
      }
    }
  }
  else {
    res.status(401).json({ message: "The registration date for progress report submission is not yet be opened. Kindly wait for the annoucement" });
  }
});

const studentSubmitPR = asyncHandler(async (req, res) => {

  const { contentPR } = req.body;
  const currentStudent = req.userStudent;

  const hasSubmitted = await ProgressReport.findOne({ studentUser: currentStudent, contentPR:{$exists: true} });
  const submitPR = await ProgressReport.findOne({studentUser: currentStudent});

  if (hasSubmitted && (!submitPR.prMoreThanOnce)) { 
    res.status(401).json({message: "You have submitted the progress report previously"});
  }
  if (currentStudent) {
    
    if (contentPR.trim().length === 0) { 
      res.status(401).json({message: "Please upload your progress report .pdf file"});
    }
    else {
      if(submitPR.prMoreThanOnce) {
        const subsequentSubmitPR = await ProgressReport.create({
          registeredPR: true,
          studentUser: currentStudent,
          contentPR,
          prMoreThanOnce: false,
          dateSubmitPR: moment(),
        });
        res.status(201).json({
          subsequentSubmitPR,
          messagePRSubmittedSucess: "The subsequent half year progress report has been submitted. Kindly wait for the result to be evaluated."
        })
      }
      else {
        submitPR.contentPR = contentPR;
        submitPR.dateSubmitPR = moment();
        submitPR.prMoreThanOnce = false;
        
        const submittedPR = await submitPR.save();
        
        res.status(201).json({
          submittedPR,
          messagePRSubmittedSucess: "The half-year progress report has been submitted. Kindly wait for the result to be evaluated."
        });
      }
      const fetchResubmitPR = await ProgressReport.updateMany( {studentUser: currentStudent, prMoreThanOnce: { $eq: true } },
                                                               { $set: { prMoreThanOnce : false } });
      if(fetchResubmitPR) {
        console.log(fetchResubmitPR.prMoreThanOnce); 
      }
    }
  }
  else {
    res.status(500);
    throw new Error("Internal server error");
  }
});

const studentViewPR = asyncHandler(async (req, res) => {

  const currentStudent = req.userStudent;
  
  const prInfo = await ProgressReport.findOne({}); 
  const registeredForPR = await ProgressReport.findOne({ studentUser: currentStudent}); 
  const currentStud = await Student.findOne({_id: currentStudent});
  const currentStudGrade = await ProgressReport.findOne({ studentUser: currentStudent}).sort({createdAt: -1}); // find latest result

  if (!registeredForPR) {
    res.status(201).json({applicationStatusMsg: `You have not yet register for the progress report submission, the due date of the registration and submission is on,
                                                 ${moment(prInfo.dateSetPR).format('MMMM Do YYYY')}`});
  }
  else if (registeredForPR.dateSubmitPR && registeredForPR.grade > 0 && currentStud.retryPRAttempt == 0) {
    res.status(201).json({applicationStatusMsg: `Your progress report has been evaluated. Congratulation! you have been given grade ${currentStudGrade.grade} 
                                                 for your progress report and received grade 'Satisfactory' (S).`,
                          updatedAt: registeredForPR.updatedAt});
  }
  else if (registeredForPR.dateSubmitPR && registeredForPR.grade > 0 && currentStud.retryPRAttempt > 0) {
    res.status(201).json({applicationStatusMsg: `Your progress report has been evaluated. Sorry, you have been given grade ${currentStudGrade.grade} 
                                                 for your progress report and received grade 'Unsatisfactory' (US).`,
                          updatedAt: registeredForPR.updatedAt});
  }
  else if (registeredForPR && registeredForPR.dateSubmitPR) { 
    res.status(201).json({applicationStatusMsg: `You have submit the progress report on ${moment(registeredForPR.dateSubmitPR).format('MMMM Do YYYY')}. Kindly wait
                                                 for the result to be evaluated.`,
                          updatedAt: registeredForPR.updatedAt});
  }
  else if (registeredForPR && !registeredForPR.dateSubmitPR) {
    res.status(201).json({applicationStatusMsg: `You have registered but not yet submit the progress report, the due date of the submission is on,
                                                 ${moment(prInfo.dateSetPR).format('MMMM Do YYYY')}`,
                          updatedAt: registeredForPR.updatedAt});
  }
});

/*************************************************** END PR ***************************************************/

export { studentLogin, studentProfileList, studentProfileListByID,
         systemVerifyStudentStatus, systemReadVerifyStudentStatus, 
         studentViewDataRequestRPD, studentRequestRPD, studentViewRPDApplication, 
         studentSubmitMeetingLog, studentViewMeetingLog, studentRequestWCD, studentViewWCDApplication, 
         studentRegisterPR, studentRegisterPRLandingPage, studentSubmitPR, studentViewPR };
