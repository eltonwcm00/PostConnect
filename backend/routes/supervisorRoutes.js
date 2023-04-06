import express from "express";
import { supervisorLogin, supervisorReadMeetingLog, supervisorReadMeetingLogByID, supervisorReadRPDResult } from "../controllers/SupervisorController.js";
import { protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/supervisorLogin", supervisorLogin);
router.route('/supervisorReadMeetingLog').get(protectSupervisor, supervisorReadMeetingLog);
router.route('/supervisorReadMeetingLog/:id').get(supervisorReadMeetingLogByID);
router.route('/supervisorReadRPDResult').get(protectSupervisor, supervisorReadRPDResult);

export default router;

