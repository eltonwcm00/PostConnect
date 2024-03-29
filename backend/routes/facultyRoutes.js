import express from "express";
import {
   facultySelfRegistration, facultyLogin, facultyViewOwnProfile, facultyProfileCountPanel, facultyProfileCountSupervisor, facultyProfileCountStudent,
   facultyPanelRegistration, facultySupervisorRegistration, facultyStudentRegistration, 
   facultyReadAssignSupervision, facultyReadAssignSupervisionByID, facultyUpdateAssignSupervisionByID,
   facultyReadEvaluateRPDApplication, facultyReadEvaluateRPDApplicationByID, facultyRejectEvaluateRPDApplicationByID,
   facultyApproveEvaluateRPDApplicationByID, facultyReadChooseStudent, facultyReadChooseStudentByID, 
   facultyUpdateChooseStudentByID, facultyReadSubjectStudent, facultyReadSubjectStudentByID,
   facultyUpdateSubjectStudentByID, facultyReadEvaluateWCDApplication, facultyReadEvaluateWCDApplicationByID,
   facultyRejectEvaluateWCDApplicationByID, facultyApproveEvaluateWCDApplicationByID, facultySetDatePR,
   facultyReadMonitorStudent, facultyTerminateStudent, facultyActiveStudent, 
   facultyInitDataStudent, facultyFetchDataStudent, facultyFetchDataStudentByID, 
   facultyFetchPastRPDDataStudentByID, facultyFetchPastWCDDataStudentByID, facultyFetchPastPRDataStudentByID, facultyProfileCountFaculty
} from "../controllers/FacultyController.js";
import { protectFaculty, protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.use(protectFaculty);

router.post("/facultyRegistration", facultySelfRegistration);
router.post("/facultyLogin", facultyLogin);
router.route("/facultyViewOwnProfile").get(protectFaculty, facultyViewOwnProfile);
router.route("/facultyProfileCountFaculty").get(facultyProfileCountFaculty);
router.route("/facultyProfileCountPanel").get(facultyProfileCountPanel);
router.route("/facultyProfileCountSupervisor").get(facultyProfileCountSupervisor);
router.route("/facultyProfileCountStudent").get(facultyProfileCountStudent);

router.route("/facultyPanelRegistration").post(protectFaculty, facultyPanelRegistration);
router.route("/facultySupervisorRegistration").post(protectFaculty, facultySupervisorRegistration);
router.route("/facultyStudentRegistration").post(protectFaculty, facultyStudentRegistration);

router.route("/facultyReadAssignSupervision").get(protectFaculty, facultyReadAssignSupervision);
router.route("/facultyReadAssignSupervision/:id").get(facultyReadAssignSupervisionByID)
                                                 .put(protectFaculty, facultyUpdateAssignSupervisionByID);
router.route("/facultyReadChooseStudent").get(protectFaculty, facultyReadChooseStudent);
router.route("/facultyReadChooseStudent/:id").get(facultyReadChooseStudentByID)
                                             .put(protectFaculty,facultyUpdateChooseStudentByID);
router.route("/facultyReadEvaluateRPDApplication").get(protectFaculty,facultyReadEvaluateRPDApplication);
router.route("/facultyReadEvaluateRPDApplication2/:id").get(facultyReadEvaluateRPDApplicationByID)
                                                      .put(protectFaculty, facultyApproveEvaluateRPDApplicationByID);
router.route("/facultyReadEvaluateRPDApplication/:id").get(facultyReadEvaluateRPDApplicationByID)
                                                      .put(protectFaculty, facultyRejectEvaluateRPDApplicationByID); 

router.route("/facultyReadSubjectStudent").get(protectFaculty, facultyReadSubjectStudent);
router.route("/facultyReadSubjectStudent/:id").get(facultyReadSubjectStudentByID).put(protectFaculty, facultyUpdateSubjectStudentByID);
router.route("/facultyReadEvaluateWCDApplication").get(protectFaculty,facultyReadEvaluateWCDApplication);
router.route("/facultyReadEvaluateWCDApplication2/:id").get(facultyReadEvaluateWCDApplicationByID).put(protectFaculty, facultyApproveEvaluateWCDApplicationByID);
router.route("/facultyReadEvaluateWCDApplication/:id").get(facultyReadEvaluateWCDApplicationByID)
                                                      .put(protectFaculty, facultyRejectEvaluateWCDApplicationByID); 
router.route("/facultySetDatePR").put(protectFaculty, facultySetDatePR);
router.route("/facultyReadMonitorStudent").get(protectFaculty, facultyReadMonitorStudent);
router.route("/facultyReadMonitorStudent/:id").get(facultyReadChooseStudentByID)
                                              .put(protectFaculty, facultyTerminateStudent); 
router.route("/facultyReadMonitorStudent2/:id").get(facultyReadChooseStudentByID)
                                               .put(protectFaculty, facultyActiveStudent); 
router.route("/facultyInitDataStudent").post(facultyInitDataStudent);
router.route("/facultyFetchDataStudent").get(protectFaculty, protectSupervisor, facultyFetchDataStudent);

router.route("/facultyFetchDataStudent/:id").get(protectFaculty, protectSupervisor, facultyFetchDataStudentByID);

router.route("/facultyFetchPastRPDDataStudent/:id").get(facultyFetchPastRPDDataStudentByID);
router.route("/facultyFetchPastWCDDataStudent/:id").get(facultyFetchPastWCDDataStudentByID);
router.route("/facultyFetchPastPRDataStudent/:id").get(facultyFetchPastPRDataStudentByID);

export default router;

