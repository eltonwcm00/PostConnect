import express from "express";
import {
    facultyLogin, facultyPanelRegistration,
} from "../controllers/FacultyController.js";
import { protectFaculty, protectPanel } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.use(protectFaculty);

router.post("/facultyLogin", facultyLogin);
router.route("/facultyPanelRegistration").post(protectFaculty, facultyPanelRegistration);

export default router;

