import express from "express";
import { studentLogin, studentRequestRPD } from "../controllers/StudentController.js";
import { protectStudent } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js"

const router = express.Router();

router.post("/studentLogin", studentLogin);
router.route("/studentRequestRPD").post(protectStudent, upload.single('myFile'), studentRequestRPD);

export default router;

