import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Panel from "../models/Panel.js";
import Student from "../models/Student.js";
import RPD from "../models/RPD.js";
import WCD from "../models/WCD.js";
import ProgressReport from "../models/ProgressReport.js";

const panelLogin = asyncHandler(async (req, res) => {
    
    const { usernamePanel, password } = req.body;
    const userPanel = await Panel.findOne({ usernamePanel });  
    if (userPanel) {
    
      const validPass = await bcrypt.compare(password, userPanel.password);

      if (userPanel && validPass) {
        res.status(201).json({
          _id: userPanel._id,
          usernamePanel: userPanel.usernamePanel, 
          isPanel: true,
          token: generateToken(userPanel._id),
          successMessage: "Logged in successfully!"
        });
      } 
      else {
        res.status(401).json({message: "Username or Password is incorrect!"});
      }
    }
    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
});

/*************************************************** PROFILE ***************************************************/

const panelProfileList = asyncHandler(async (req, res) => {

  const panelList = await Panel.find();

  if (panelList) {
    res.status(201).json(panelList);
  }
  else {
    res.status(401).json({message: "No panel currently"});
  }
});

const panelProfileListByID = asyncHandler(async (req, res) => {

  const panelProfileID = await Panel.findById(req.params.id);

  if (panelProfileID) {
    res.status(201).json(panelProfileID);
  }
  else {
    res.status(401).json({ message: "Details of this panel is not found" });
  }
});

const panelUpdatedProfile = asyncHandler(async (req, res) => {
  
  const { password, cfrmPassword } = req.body

  const panelProfileID = await Panel.findById(req.params.id);

  if (panelProfileID) {
  
    if (req.body.password && req.body.cfrmPassword) {
      if(cfrmPassword !== password) {
        res.status(401).json({message: "Repeat password and password is not match"});
      } else {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        panelProfileID.password = hashedPassword;        
      }
    }

    const updatedDetail = await panelProfileID.save();

    if (updatedDetail) {
      res.status(201).json({
        updatedDetail,
        messageUpdated: "The profile details have been updated"
      })
    }
  }
  else {
    res.status(401).json({ message: "Details of this panel is not found" });
  }
});

const panelCountEvaluatedRPD = asyncHandler(async (req, res) => {
  const fetchEvalutedRPDCount = await RPD.find({})
                                         .or([{status:{$eq: false}}, {status:{$eq: true}}])
                                         .countDocuments(); 

  if (fetchEvalutedRPDCount) {
    res.status(201).json(fetchEvalutedRPDCount);
  }
});

const panelCountEvaluatedWCD = asyncHandler(async (req, res) => {
  const fetchEvalutedWCDCount = await WCD.find({})
                                         .or([{status:{$eq: false}}, {status:{$eq: true}}])
                                         .countDocuments(); 

  if (fetchEvalutedWCDCount) {
    res.status(201).json(fetchEvalutedWCDCount);
  }
});

const panelCountEvaluatedPR = asyncHandler(async (req, res) => {
  const fetchEvalutedPRCount = await ProgressReport.find({})
                                                   .or([{status:{$eq: false}}, {status:{$eq: true}}])
                                                   .countDocuments(); 

  if (fetchEvalutedPRCount) {
    res.status(201).json(fetchEvalutedPRCount);
  }
});

/*************************************************** END PROFILE ***************************************************/


/*************************************************** RPD EVALUATION ***************************************************/

const panelReadRPD = asyncHandler(async (req, res) => {
  
  const RPDList = await RPD.find();

  if(RPDList) {
    res.json(RPDList);
  } 
  else {
    res.status(401).json({errorRPDList: "No RPD is ready to be evaluate"});
  }
});

const panelReadRPDByID = asyncHandler(async (req, res) => {

  const fetchRPDID = await RPD.findById(req.params.id);

  if (fetchRPDID) {
    res.status(201).json(fetchRPDID);
  }
  else {
    res.status(401).json({message: "Error in .db reference"});
  }
});

const panelEvaluatePassRPD = asyncHandler(async (req, res) => {
  
  const fetchRPDID = await RPD.findById(req.params.id);
  const insertStudent = await Student.findOne({usernameStud: fetchRPDID.fullname, 
                                               retryRPDAttempt: {$gte: 1}});

  if (fetchRPDID) {
    fetchRPDID.status = true;
    const passRPDID = await fetchRPDID.save();
    res.status(201).json({
        passRPDID,
        approveMsg: "The RPD is evaluated, the grade of the evaluation is given 'Satisfactory (S)'"
      }
    );
  } 
  else {
    res.status(401).json({ message: "Internal server error" });
  }
  // 'S' grade after re-evaluated 
  if(insertStudent) {
    insertStudent.retryRPDAttempt = 0;
    insertStudent.isStudent = true;
    fetchRPDID.status = true;
    await insertStudent.save();
    await fetchRPDID.save();
  }
});

const panelEvaluateFailRPD = asyncHandler(async (req, res) => {

  const fetchRPDID = await RPD.findById(req.params.id);
  const insertStudent = await Student.findOne({usernameStud: fetchRPDID.fullname})

  if (fetchRPDID) {
    fetchRPDID.status = false;
    const passRPDID = await fetchRPDID.save();
    res.status(201).json({
        passRPDID,
        rejectMsg: "The RPD is evaluated, the grade of the evaluation is given 'Unsatisfactory (US)'"
      }
    );
  } 
  else {
    res.status(401).json({ message: "Internal server error" });
  }
  // 'US' grade
  if(insertStudent) {
    insertStudent.retryRPDAttempt = insertStudent.retryRPDAttempt + 1;
    await insertStudent.save();
  }
});

/*************************************************** END RPD EVALUATION ***************************************************/

/*************************************************** WCD EVALUATION ***************************************************/

const panelReadWCD = asyncHandler(async (req, res) => {
  
  const WCDList = await WCD.find();

  if(WCDList) {
    res.json(WCDList);
  } 
  else {
    res.status(401).json({errorWCDList: "No WCD is ready to be evaluate"});
  }
});

const panelReadWCDByID = asyncHandler(async (req, res) => {

  const fetchWCDID = await WCD.findById(req.params.id);

  if (fetchWCDID) {
    res.status(201).json(fetchWCDID);
  }
  else {
    res.status(401).json({message: "Error in .db reference"});
  }
});

const panelEvaluatePassWCD = asyncHandler(async (req, res) => {
  
  const fetchWCDID = await WCD.findById(req.params.id);
  const insertStudent = await Student.findOne({usernameStud: fetchWCDID.fullname, 
                                               retryWCDAttempt: {$gte: 1}});

  if (fetchWCDID) {
    fetchWCDID.status = true;
    const passWCDID = await fetchWCDID.save();
    res.status(201).json({
        passWCDID,
        approveMsg: "The WCD is evaluated, the grade of the evaluation is given 'Satisfactory (S)'"
      }
    );
  } 
  else {
    res.status(401).json({ message: "Internal server error" });
  }
  // 'S' grade after re-evaluated 
  if(insertStudent) {
    insertStudent.retryWCDAttempt = 0;
    insertStudent.isStudent = true;
    fetchWCDID.status = true;
    await insertStudent.save();
    await fetchWCDID.save();
  }
});

const panelEvaluateFailWCD = asyncHandler(async (req, res) => {

  const fetchWCDID = await WCD.findById(req.params.id);
  const insertStudent = await Student.findOne({usernameStud: fetchWCDID.fullname})

  if (fetchWCDID) {
    fetchWCDID.status = false;
    const passWCDID = await fetchWCDID.save();
    res.status(201).json({
        passWCDID,
        rejectMsg: "The WCD is evaluated, the grade of the evaluation is given 'Unsatisfactory (US)'"
      }
    );
  } 
  else {
    res.status(401).json({ message: "Internal server error" });
  }
  // 'US' grade
  if(insertStudent) {
    insertStudent.retryWCDAttempt = insertStudent.retryWCDAttempt + 1;
    await insertStudent.save();
  }
});

/*************************************************** PR EVALUATION ***************************************************/

const panelReadPRDateSetPR = asyncHandler(async (req, res) => {
  const fetchDateSetPR = await ProgressReport.findOne({dateSetPR: {$exists: true}});
  if (fetchDateSetPR) {
    res.status(201).json(fetchDateSetPR);
  }
});

const panelReadPR = asyncHandler(async (req, res) => {
  
  const PRList = await ProgressReport.find({dateSubmitPR:{$exists: true}}).populate('studentUser');

  if(PRList) {
    res.status(201).json(PRList)
  } 
  else {
    res.status(401).json({message: "No PR is ready to be evaluate"});
  }
});

const panelReadPRByID = asyncHandler(async (req, res) => {

  const fetchPRID = await ProgressReport.findById(req.params.id).populate('studentUser');

  if (fetchPRID) {
    res.status(201).json(fetchPRID);
  }
  else {
    res.status(401).json({message: "Error in .db reference"});
  }
});

const panelEvaluatePR = asyncHandler(async (req, res) => {
  
  const fetchPRID = await ProgressReport.findById(req.params.id);
  const insertStudent = await Student.findOne({_id: fetchPRID.studentUser});
  const insertStudentAfterReevaluate = await Student.findOne({_id: fetchPRID.studentUser, 
                                                              retryPRAttempt: {$gte: 1}});
  const { grade } = req.body;

  const hasPanel = req.userPanel;

  if (!grade) {
    res.status(401).json({message: "Please give a grade for the evaluation of progress report"});
  } 
  else {
    fetchPRID.grade = fetchPRID.grade + (parseInt(grade)*0.5);
    fetchPRID.panelUser = hasPanel;
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

/*************************************************** END PR EVALUATION ***************************************************/

export { panelLogin, panelProfileList, panelProfileListByID, panelUpdatedProfile,
         panelCountEvaluatedRPD, panelCountEvaluatedWCD, panelCountEvaluatedPR,
         panelReadRPD, panelReadRPDByID, panelEvaluatePassRPD, panelEvaluateFailRPD, 
         panelReadWCD, panelReadWCDByID, panelEvaluatePassWCD, panelEvaluateFailWCD, 
         panelReadPRDateSetPR, panelReadPR, panelReadPRByID, panelEvaluatePR };
