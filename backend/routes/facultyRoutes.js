import express from "express";
import {
    facultyLogin,
} from "../controllers/FacultyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/facultyLogin", facultyLogin);

export default router;

