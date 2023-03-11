import express from "express";
import {
   facultyLogin, facultyPanelRegistration, facultySupervisorRegistration, facultyStudentRegistration, facultyReadAssignSupervision
} from "../controllers/FacultyController.js";
import { protectFaculty,} from "../middleware/authMiddleware.js";

const router = express.Router();
//router.use(protectFaculty);

router.post("/facultyLogin", facultyLogin);
router.route("/facultyPanelRegistration").post(protectFaculty, facultyPanelRegistration);
router.route("/facultySupervisorRegistration").post(protectFaculty, facultySupervisorRegistration);
router.route("/facultyStudentRegistration").post(protectFaculty, facultyStudentRegistration);

router.route("/facultyReadAssignSupervision").get(protectFaculty, facultyReadAssignSupervision);

export default router;

