import express from "express";
import { supervisorLogin, supervisorReadMeetingLog } from "../controllers/SupervisorController.js";
import { protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/supervisorLogin", supervisorLogin);
router.route('/supervisorReadMeetingLog').get(protectSupervisor, supervisorReadMeetingLog);

export default router;

