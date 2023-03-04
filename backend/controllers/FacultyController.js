import asyncHandler from "express-async-handler";
import Faculty from "../models/Faculty.js";
import Panel from "../models/Panel.js";
import generateToken from "../utils/generateFacultyToken.js";
import bcrypt from "bcryptjs";
import Supervisor from "../models/Supervisor.js";

const facultyLogin = asyncHandler(async (req, res) => {
  
    // username: admin; password: 123
    const { password } = req.body;
  
    const userFaculty = await Faculty.findOne({ userNameFac:'admin' });
    const validPass = await bcrypt.compare(password, userFaculty.password);
  
    if (userFaculty && validPass) {
      res.status(201).json({
        _id: userFaculty._id,
        userNameFac: userFaculty.userNameFac, 
        isFaculty: true,
        token: generateToken(userFaculty._id),
        successMessage: "Logged in successfully!"
      });
    } 
    else {
      res.status(401).json({message: "Username or Password is incorrect!"});
    }
  });

  const facultyPanelRegistration = asyncHandler(async (req, res) => {

    let hashedPassword, userPanel;
  
    const { usernamePanel, password, cfrmPassword } = req.body;
    const userExists = await Panel.findOne({ usernamePanel });
  
    if (userExists) {
      res.status(401).json({message: "Username is existed!"});
    }
  
    if (cfrmPassword == password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      userPanel = await Panel.create({
        usernamePanel,
        password: hashedPassword,
      });
    }
    else {
      res.status(401).json({message: "Repeat password and password is not match"});
    }

    if (userPanel) {
      res.status(201).json({
        _id: userPanel._id,
        usernamePanel: userPanel.usernamePanel,
        isPanel: true,
        token: generateToken(userPanel._id),
        successMessage: "Register successfully!"
      });
    } else {
        res.status(500);
        throw new Error("Internal server error");
    }
  });
///////////////////////
  const facultySupervisorRegistration = asyncHandler(async (req, res) => {

    let hashedPassword, userSupervisor;
  
    const { usernameSup, password, cfrmPassword, numSupervision, academicPos } = req.body;
    const userExists = await Supervisor.findOne({ usernameSup });
  
    if (userExists) {
      res.status(401).json({message: "Username is existed!"});
    } 
   
    else if(academicPos.trim().length === 0) {
      res.status(401).json({message: "Please fill in the academic position"});
    }
    else if(cfrmPassword !== password) {
      res.status(401).json({message: "Repeat password and password is not match"});
    }
    else if(isNaN(numSupervision)) {
      res.status(401).json({message: "Number of supervision must be in number format"});
    }
    else {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      userSupervisor = await Supervisor.create({
        usernameSup,
        password: hashedPassword,
        academicPos,
        numSupervision,
      });
    }

    if (userSupervisor) {
      res.status(201).json({
        _id: userSupervisor._id,
        usernamePanel: userSupervisor.usernameSup,
        academicPos: userSupervisor.academicPos,
        numSupervision: userSupervisor.numSupervision,
        isSupervisor: true,
        token: generateToken(userSupervisor._id),
        successMessage: "Register successfully!"
      });
    } else {
        res.status(500);
        throw new Error("Internal server error");
    }
  });

  export { facultyLogin, facultyPanelRegistration, facultySupervisorRegistration};