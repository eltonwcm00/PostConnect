import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Supervisor from "../models/Supervisor.js";
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

const supervisorReadChooseStudent = asyncHandler(async (req, res) => {

  const isAssignSupervision = req.userSupervisor.numSupervision;
  const fetchStudentList = await Student.find();

  if(isAssignSupervision === null) {
    res.status(401).json({ message: "Unable to show the list, please contact faculty for then assignment of number of student supervision" });
  }
  if (fetchStudentList) {
    res.json(fetchStudentList);
  }
  else {
    res.status(500);
    throw new Error("Internal server error");
  }
});

const supervisorReadChooseStudentByID = asyncHandler(async (req, res) => {
 
  const fetchStudentID = await Student.findById(req.params.id);

  if (fetchStudentID) {
    res.json(fetchStudentID);
  } 
  else {
    res.status(404).json({ message: "Student is not found" });
  }
});

const supervisorUpdateChooseStudentByID = asyncHandler(async (req, res) => {

  const { numAssignedSupervision } = req.body;

  const currentSupervisor = req.userSupervisor._id;
  const fetchStudentID = await Student.findById(req.params.id);

  if (numAssignedSupervision < req.userSupervisor.numSupervision) {
    if (currentSupervisor && fetchStudentID) {
      fetchStudentID.supervisorUser = currentSupervisor;
      const selectedStudent = await fetchStudentID.save();
  
      res.json({
          _id: selectedStudent,
          successMessage: `You have chosen '${fetchStudentID.usernameStud}' to be under your supervision`,
          chooseCount: numAssignedSupervision,
      });
    } 
    else {
      res.status(500);
      throw new Error("Internal server error");
    }
  }
  else {
    res.status(401).json({ message: `Reached the limit of your student supervision's attempts: ${req.userSupervisor.numSupervision}` });
  }
});

export { supervisorLogin, supervisorReadChooseStudent, supervisorReadChooseStudentByID, supervisorUpdateChooseStudentByID };
