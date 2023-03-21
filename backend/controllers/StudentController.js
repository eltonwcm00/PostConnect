import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import Student from "../models/Student.js";
import RPDApplication from "../models/RPDApplication.js";

const studentLogin = asyncHandler(async (req, res) => {
    const { usernameStud, password } = req.body;
  
    const userStudent = await Student.findOne({ usernameStud });
    const validPass = await bcrypt.compare(password, userStudent.password);
  
    if (userStudent && validPass) {
      res.status(201).json({
        _id: userStudent._id,
        usernameStud: userStudent.usernameStud, 
        isStudent: true,
        token: generateToken(userStudent._id),
        successMessage: "Logged in successfully!"
      });
    } 
    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
});

const studentRequestRPD = asyncHandler(async (req, res) => {

  const { fullName, miniThesisTitle, supervisorName, miniThesisPDF } = req.body;
  const currentStudent = req.userStudent;

  let appliedRPD;

  const hasApplied = await RPDApplication.findOne({ studentUser: currentStudent });
  const hasSupervisor = req.userStudent.supervisorUser;

  if(!hasSupervisor) {
    res.status(401).json({message: "Access denied! you have not been assigned to any supervisor, please refer to faculty"});
  }
  else if (hasApplied) {
    res.status(401).json({message: "You have applied the application previously"});
  }
  else if (currentStudent) {
    
    if(fullName.trim().length === 0) { res.status(401).json({message: "Please fill in your full name"});}
    else if(miniThesisTitle.trim().length === 0) {res.status(401).json({message: "Please fill in your mini thesis title"});}
    else if(supervisorName.trim().length === 0) { res.status(401).json({message: "Please fill your supervisor name"});}
    else if (miniThesisPDF.trim().length === 0) { res.status(401).json({message: "Please upload your mini thesis .pdf file"});}

    appliedRPD = await RPDApplication.create({
      fullName,
      miniThesisTitle,
      supervisorName,
      // miniThesisPDF: req.file, //req.file.filename
      miniThesisPDF,
      dateApplyRPD: moment(),
      studentUser: currentStudent,
      applicationStatus: false,
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

export {studentLogin, studentRequestRPD};
