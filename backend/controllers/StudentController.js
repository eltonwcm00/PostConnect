import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";

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

  if(currentStudent) {
    res.status(201).json({
      _id: currentStudent._id,
      username: currentStudent.usernameStud,
      successMessage: "User is validated!"
    })
  }
  else {
    res.status(500);
    throw new Error("Internal server error");
  }

});

export {studentLogin, studentRequestRPD};
