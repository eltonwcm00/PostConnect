import express from "express";
import { studentLogin, studentRequestRPD } from "../controllers/StudentController.js";
import { protectStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/studentLogin", studentLogin);
router.route("/studentRequestRPD").post(protectStudent, studentRequestRPD);

export default router;

