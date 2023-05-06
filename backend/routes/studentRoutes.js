import express from "express";
import { studentLogin, studentProfileList, studentProfileListByID, studentUpdatedProfile,
         systemVerifyStudentStatus, systemReadVerifyStudentStatus, 
         studentViewDataRequestRPD, studentRequestRPD, studentViewRPDApplication,
         studentSubmitMeetingLog, studentViewMeetingLog,
         studentRequestWCD, studentViewWCDApplication, studentRegisterPR, studentRegisterPRLandingPage,
         studentSubmitPR, studentViewPR } from "../controllers/StudentController.js";
import { protectStudent } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js"

const router = express.Router();

router.post("/studentLogin", studentLogin);
router.route("/studentProfileList").get(studentProfileList);
router.route('/studentProfileList/:id').get(studentProfileListByID)
                                       .put(studentUpdatedProfile);
router.route("/systemReadVerifyStudentStatus").get(protectStudent, systemReadVerifyStudentStatus)
router.route("/systemVerifyStudentStatus").put(protectStudent, systemVerifyStudentStatus);
router.route("/studentViewDataRequestRPD").get(protectStudent, studentViewDataRequestRPD);
router.route("/studentRequestRPD").post(protectStudent, upload.single('myFile'), studentRequestRPD);
router.route("/studentRPDApplicationStatus").get(protectStudent, studentViewRPDApplication);

router.route("/studentSubmitMeetingLog").post(protectStudent, studentSubmitMeetingLog);
router.route("/studentMeetingLogStatus").get(protectStudent, studentViewMeetingLog);

router.route("/studentRequestWCD").post(protectStudent, upload.single('myFile'), studentRequestWCD);
router.route("/studentWCDApplicationStatus").get(protectStudent, studentViewWCDApplication);

router.route("/studentRegisterPRLandingPage").get(protectStudent, studentRegisterPRLandingPage);
router.route("/studentRegisterPR").post(protectStudent, studentRegisterPR);
router.route("/studentSubmitPR").put(protectStudent, upload.single('myFile'), studentSubmitPR);
router.route("/studentViewPRStatus").get(protectStudent, studentViewPR);

export default router;

