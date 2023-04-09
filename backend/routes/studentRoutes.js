import express from "express";
import { studentLogin, studentViewDataRequestRPD, studentRequestRPD, 
         studentViewRPDApplication,studentSubmitMeetingLog, studentViewMeetingLog,
         studentRequestWCD } from "../controllers/StudentController.js";
import { protectStudent } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js"

const router = express.Router();

router.post("/studentLogin", studentLogin);
router.route("/studentViewDataRequestRPD").get(protectStudent, studentViewDataRequestRPD);
router.route("/studentRequestRPD").post(protectStudent, upload.single('myFile'), studentRequestRPD);
router.route("/studentSubmitMeetingLog").post(protectStudent, studentSubmitMeetingLog);
router.route("/studentRPDApplicationStatus").get(protectStudent, studentViewRPDApplication);
router.route("/studentMeetingLogStatus").get(protectStudent, studentViewMeetingLog);

router.route("/studentRequestWCD").post(protectStudent, upload.single('myFile'), studentRequestWCD);


export default router;

