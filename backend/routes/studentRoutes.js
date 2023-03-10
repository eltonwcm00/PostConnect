import express from "express";
import { studentLogin } from "../controllers/StudentController.js";
import { protectStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/studentLogin", studentLogin);

export default router;

