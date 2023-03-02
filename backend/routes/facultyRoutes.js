import express from "express";
import {
    facultyLogin, facultyRegister,
} from "../controllers/FacultyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/facultyLogin", facultyLogin);
router.route("/facultyRegister").post(facultyRegister);

export default router;

