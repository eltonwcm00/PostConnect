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
});

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
})

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

const panelReadPR = asyncHandler(async (req, res) => {
  
  const PRList = await ProgressReport.find({dateSubmitPR:{$exists: true}}).populate('studentUser');

  if(PRList) {
    res.status(201).json(PRList)
  } 
  else {
    res.status(401).json({errorWCDList: "No WCD is ready to be evaluate"});
  }
})

export {panelLogin, panelReadRPD, panelReadRPDByID, panelEvaluatePassRPD, panelEvaluateFailRPD, 
        panelReadWCD, panelReadWCDByID, panelEvaluatePassWCD, panelEvaluateFailWCD, panelReadPR};
