import express from "express";
import {
    facultyLogin, facultyRegister,
} from "../controllers/FacultyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.use(protect);

router.post("/facultyLogin", facultyLogin);
router.route("/facultyRegister").post(protect, facultyRegister);

export default router;

