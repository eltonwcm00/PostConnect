import express from "express";
import {
   facultyLogin, facultyPanelRegistration, facultySupervisorRegistration, facultyStudentRegistration, 
   facultyReadAssignSupervision, facultyReadAssignSupervisionByID, facultyUpdateAssignSupervisionByID,
   facultyReadEvaluateRPDApplication, facultyReadEvaluateRPDApplicationByID, facultyRejectEvaluateRPDApplicationByID,
   facultyApproveEvaluateRPDApplicationByID, facultyReadChooseStudent, facultyReadChooseStudentByID, 
   facultyUpdateChooseStudentByID,
} from "../controllers/FacultyController.js";
import { protectFaculty,} from "../middleware/authMiddleware.js";

const router = express.Router();
//router.use(protectFaculty);

router.post("/facultyLogin", facultyLogin);
router.route("/facultyPanelRegistration").post(protectFaculty, facultyPanelRegistration);
router.route("/facultySupervisorRegistration").post(protectFaculty, facultySupervisorRegistration);
router.route("/facultyStudentRegistration").post(protectFaculty, facultyStudentRegistration);

router.route("/facultyReadAssignSupervision").get(protectFaculty, facultyReadAssignSupervision);
router.route("/facultyReadAssignSupervision/:id").get(facultyReadAssignSupervisionByID)
                                                 .put(protectFaculty, facultyUpdateAssignSupervisionByID);
 router.route("/facultyReadChooseStudent").get(protectFaculty, facultyReadChooseStudent)
router.route("/facultyReadChooseStudent/:id").get(facultyReadChooseStudentByID)
                                             .put(protectFaculty,facultyUpdateChooseStudentByID)
router.route("/facultyReadEvaluateRPDApplication").get(protectFaculty,facultyReadEvaluateRPDApplication);
router.route("/facultyReadEvaluateRPDApplication2/:id").get(facultyReadEvaluateRPDApplicationByID)
                                                      .put(protectFaculty, facultyApproveEvaluateRPDApplicationByID)
router.route("/facultyReadEvaluateRPDApplication/:id").get(facultyReadEvaluateRPDApplicationByID)
                                                      .put(protectFaculty, facultyRejectEvaluateRPDApplicationByID);                                              
export default router;

