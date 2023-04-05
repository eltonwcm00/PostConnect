import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Panel from "../models/Panel.js";
import RPD from "../models/RPD.js";
import Student from "../models/Student.js";

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

const panelReadRPD = asyncHandler(async (req, res) => {
  
  const RPDList = await RPD.find();

  if(RPDList) {
    res.json(RPDList);
  } 
  else {
    res.status(401).json({errorRPDList: "No RPD is ready to be evaluate"});
  }
})

const panelReadRPDByID = asyncHandler(async (req, res) => {

  const fetchRPDID = await RPD.findById(req.params.id);

  if (fetchRPDID) {
    res.status(201).json(fetchRPDID);
  }
  else {
    res.status(401).json({message: "Error in .db reference"});
  }
})

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
})

export {panelLogin, panelReadRPD, panelReadRPDByID, panelEvaluatePassRPD, panelEvaluateFailRPD};
