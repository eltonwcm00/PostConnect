import express from "express";
import {
    facultyLogin,
} from "../controllers/FacultyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/facultyLogin").post(facultyLogin);

export default router;

