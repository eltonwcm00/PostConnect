import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import Faculty from "../models/Faculty.js";
import Panel from "../models/Panel.js";
import Supervisor from "../models/Supervisor.js";
import Student from "../models/Student.js";
import RPDApplication from "../models/RPDApplication.js";
import RPD from "../models/RPD.js";

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
      facultyUser: req.userFaculty._id,
      isPanel: true,
    });
  }
  else {
    res.status(401).json({message: "Repeat password and password is not match"});
  }

  if (userPanel) {
    res.status(201).json({
      _id: userPanel._id,
      facultyUser: userPanel.facultyUser,
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
      facultyUser: req.userFaculty._id,
      isSupervisor: true,
    });
  }

  if (userSupervisor) {
    res.status(201).json({
      _id: userSupervisor._id,
      facultyUser: userSupervisor.facultyUser,
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

const facultyStudentRegistration = asyncHandler(async (req, res) => {

  let hashedPassword, userStudent;

  const { usernameStud, password, cfrmPassword, degreeLvl } = req.body;
  const { dateJoin } = req.body;

  let dateJoin_ = moment(dateJoin);
  let todayDate = moment();

  const userExists = await Student.findOne({ usernameStud });

  if (userExists) {
    res.status(401).json({message: "Username is existed!"});
  }
  else if(degreeLvl.trim().length === 0) {
    res.status(401).json({message: "Please fill in the degree level"});
  }
  else if(cfrmPassword !== password) {
    res.status(401).json({message: "Repeat password and password is not match"});
  }
  else if(dateJoin_ > todayDate) {
    res.status(401).json({message: "Invalid, joining date is greater than today's date"});
  }
  else {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    userStudent = await Student.create({
      usernameStud,
      password: hashedPassword,
      dateJoin,
      degreeLvl,
      facultyUser: req.userFaculty._id, // link faculty model to student model
      isStudent: true,
    });
  }

  if (userStudent) {
    res.status(201).json({
      _id: userStudent._id,
      facultyUser: userStudent.facultyUser, // link faculty model to student model
      usernameStud: userStudent.usernameStud,
      dateJoin: userStudent.dateJoin,
      degreeLvl: userStudent.degreeLvl,
      isStudent: true,
      token: generateToken(userStudent._id),
      successMessage: "Register successfully!"
    });
  } else {
      res.status(500);
      throw new Error("Internal server error");
  }
});

const facultyReadAssignSupervision = asyncHandler(async (req, res) => {
 
 const fetchSupervisorList = await Supervisor.find({facultyUser: req.userFaculty._id});

 if(fetchSupervisorList) {
   res.json(fetchSupervisorList);
 } 
 else {
   res.status(500);
   throw new Error("Internal server error");
 }
});

const facultyReadAssignSupervisionByID = asyncHandler(async (req, res) => {
 
   const fetchSupervisorID = await Supervisor.findById(req.params.id);

   if (fetchSupervisorID) {
     res.json(fetchSupervisorID);
   } 
   else {
     res.status(404).json({ message: "Supervisor is not found" });
   }
});

const facultyUpdateAssignSupervisionByID = asyncHandler(async (req, res) => {

    const exceedWarning = "Exceed the allowed number of max. supervision: ";
    
    const { numSupervision, academicPos } = req.body;

    const fetchSupervisorID = await Supervisor.findById(req.params.id);

    if (fetchSupervisorID) {
      if (isNaN(numSupervision)) {
        res.status(401).json({message: "Number of supervision must be in number format"});
      }
      else {
        if (academicPos === 'Principal Lecturer' && numSupervision > 6) {
          res.status(401).json({message: exceedWarning + "6"});
        }
        else if (academicPos === 'Senior Lecturer' && numSupervision > 5) {
          res.status(401).json({message: exceedWarning + "5"});
        }
        else if (academicPos === 'Lecturer' && numSupervision > 3) {
          res.status(401).json({message: exceedWarning + "3"});
        }
      }
      fetchSupervisorID.numSupervision = numSupervision;
      const updatedNumSupervision = await fetchSupervisorID.save();
      res.json(updatedNumSupervision);
   } 
   else {
      res.status(500);
      throw new Error("Internal server error");
  }
});

const facultyReadChooseStudent = asyncHandler(async (req, res) => {

  const fetchStudentList = await Student.find();

  if (fetchStudentList) {
    res.json(fetchStudentList);
  }
  else {
    res.status(500);
    throw new Error("Internal server error");
  }
});

const facultyReadChooseStudentByID = asyncHandler(async (req, res) => {
 
  const fetchStudentID = await Student.findById(req.params.id);

  if (fetchStudentID) {
    res.json(fetchStudentID);
  } 
  else {
    res.status(404).json({ message: "Student is not found" });
  }
});

const facultyUpdateChooseStudentByID = asyncHandler(async (req, res) => {

  const { numAssignedSupervision, supervisorList } = req.body;

  const currentSupervisor = supervisorList;
  const fetchStudentID = await Student.findById(req.params.id);
  const fetchSupervisorID = await Supervisor.findById(currentSupervisor);

  if (numAssignedSupervision < fetchSupervisorID.numSupervision && 
      fetchSupervisorID.numSupervision > fetchSupervisorID.numAssignedSupervision) {
    
      if (currentSupervisor && fetchStudentID) {

        fetchStudentID.supervisorUser = currentSupervisor;
        fetchSupervisorID.numAssignedSupervision = fetchSupervisorID.numAssignedSupervision + 1;
        
        const selectedStudent = await fetchStudentID.save();
        await fetchSupervisorID.save();
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
    res.status(401).json({ message: `Reached the limit of your student supervision's attempts: ${fetchSupervisorID.numSupervision}` });
  }
});


const facultyReadEvaluateRPDApplication = asyncHandler(async (req, res) => {
  const RPDApplicationList = await RPDApplication.find({});

  if(RPDApplicationList) {
    res.json(RPDApplicationList);
  } 
  else {
    res.status(500);
    throw new Error("Internal server error");
  }
});

const facultyReadEvaluateRPDApplicationByID = asyncHandler(async (req, res) => {
 
  const fetchRPDApplicationID = await RPDApplication.findById(req.params.id);

  const fetchRPDApplicationStudentDataID = await RPDApplication.findById(req.params.id)
                                                  .populate('studentUser');

  const fetchRPDApplicationStudentData2ID = await RPDApplication.findById(req.params.id)
                                                    .populate({
                                                      path: 'studentUser',
                                                      model: 'Student',
                                                      populate: {
                                                        path: 'supervisorUser',
                                                        model: 'Supervisor',
                                                      },
                                                  })

  if (fetchRPDApplicationStudentDataID) {
    res.json(fetchRPDApplicationStudentDataID);
  }
  else {
    res.status(401).json({ message: "Error in student .db ref." });
  }

  if (fetchRPDApplicationStudentData2ID) {
    res.json(fetchRPDApplicationStudentData2ID);
  }
  else {
    res.status(401).json({ message: "Error in supervisor .db ref." });
  }
  
  if (fetchRPDApplicationID) {
    res.status(201).json(fetchRPDApplicationID);
  } 
  else {
    res.status(401).json({ message: "RPD Application is not found" });
  }
});

const facultyRejectEvaluateRPDApplicationByID = asyncHandler(async (req, res) => {

  const fetchRPDApplicationID = await RPDApplication.findById(req.params.id);
  
  if (fetchRPDApplicationID) {
    fetchRPDApplicationID.applicationStatus = false;
    const rejectRPDApplicationID = await fetchRPDApplicationID.save();
    res.status(201).json(rejectRPDApplicationID);
  } 
  else {
    res.status(401).json({ message: "Internal server error" });
  }
});

const facultyApproveEvaluateRPDApplicationByID = asyncHandler(async (req, res) => {

  let insertRPD;
  const { dateScheduleRPD } = req.body;

  const fetchRPDApplicationID = await RPDApplication.findById(req.params.id);
  
  if (fetchRPDApplicationID) {
    fetchRPDApplicationID.applicationStatus = true;
    const approveRPDApplicationID = await fetchRPDApplicationID.save();
    
    if (approveRPDApplicationID) {
      const readTrueApplicationStatus = await RPDApplication.findOne({_id: req.params.id, applicationStatus: true});
        if (!dateScheduleRPD) {
          res.status(401).json({ message: "Please pick a date to schedule the student's RPD" });
        } 
        else if (moment(dateScheduleRPD) < moment()) {
          res.status(401).json({message: "Invalid, schedule date is not greater than today's date"});
        } 
        else {
          if (readTrueApplicationStatus) {
            insertRPD = await RPD.create({
              studentRef: readTrueApplicationStatus.studentUser,
              rpdApplication: readTrueApplicationStatus._id,
              fullname: readTrueApplicationStatus.fullName,
              miniThesisTitle: readTrueApplicationStatus.miniThesisTitle,
              dateScheduleRPD,
            })
          } 
          else {
            res.status(401).json({ message: "Error in reading the application with true status" });
          }
        }

        if(insertRPD) {
          res.status(201).json({ 
            _id: insertRPD._id,
            studRef: insertRPD.studentRef,
            fullName: insertRPD.fullName,
            miniThesisTitle: insertRPD.miniThesisTitle,
            dateScheduleRPD: insertRPD.dateScheduleRPD,
            rpdApplicationRef: insertRPD.rpdApplication,
            message: "The application is approved." 
          });
        } else {
          res.status(401).json({ message: "Unable to approve the application" });
        }
    }
    else {
      res.status(404).json({ message: "Unable to update status of the request application to true" });
    }
  } 
  else {
    res.status(404).json({ message: "Internal server error" });
  }
});

export { facultyLogin, facultyPanelRegistration, facultySupervisorRegistration, facultyStudentRegistration, 
         facultyReadAssignSupervision, facultyReadAssignSupervisionByID, facultyUpdateAssignSupervisionByID,
         facultyReadEvaluateRPDApplication, facultyReadEvaluateRPDApplicationByID, facultyRejectEvaluateRPDApplicationByID,
         facultyApproveEvaluateRPDApplicationByID, facultyReadChooseStudent, facultyReadChooseStudentByID, 
         facultyUpdateChooseStudentByID };