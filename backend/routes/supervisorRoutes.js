import express from "express";
import { supervisorLogin, supervisorReadChooseStudent } from "../controllers/SupervisorController.js";
import { protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/supervisorLogin", supervisorLogin);
router.route("/supervisorReadChooseStudent").get(protectSupervisor, supervisorReadChooseStudent)

export default router;

