import express from "express";
import { supervisorLogin, supervisorReadMeetingLog, supervisorReadMeetingLogByID, supervisorReadRPDResult, supervisorReadWCDResult } from "../controllers/SupervisorController.js";
import { protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/supervisorLogin", supervisorLogin);
router.route('/supervisorReadMeetingLog').get(protectSupervisor, supervisorReadMeetingLog);
router.route('/supervisorReadMeetingLog/:id').get(supervisorReadMeetingLogByID);
router.route('/supervisorReadRPDResult').get(protectSupervisor, supervisorReadRPDResult);
router.route('/supervisorReadWCDResult').get(protectSupervisor, supervisorReadWCDResult);

export default router;

