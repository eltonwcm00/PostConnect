import express from "express";
import { supervisorLogin, supervisorViewOwnProfile, supervisorViewCurrentSupervisingStudent,
         supervisorProfileList, supervisorProfileListByID, 
         supervisorUpdatedProfile,supervisorReadMeetingLog, supervisorReadMeetingLogByID, 
         supervisorReadRPDResult, supervisorReadWCDResult,
         supervisorReadPR, supervisorReadPRByID, supervisorEvaluatePR, supervisorReadPRResult } from "../controllers/SupervisorController.js";
import { protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/supervisorLogin", supervisorLogin);
router.route("/supervisorViewOwnProfile").get(protectSupervisor, supervisorViewOwnProfile);
router.route("/supervisorViewSupervisingStudent").get(protectSupervisor, supervisorViewCurrentSupervisingStudent);
router.route('/supervisorProfileList').get(supervisorProfileList);
router.route('/supervisorProfileList/:id').get(supervisorProfileListByID)
                                          .put(supervisorUpdatedProfile);
router.route('/supervisorReadMeetingLog').get(protectSupervisor, supervisorReadMeetingLog);
router.route('/supervisorReadMeetingLog/:id').get(supervisorReadMeetingLogByID);
router.route('/supervisorReadRPDResult').get(protectSupervisor, supervisorReadRPDResult);
router.route('/supervisorReadWCDResult').get(protectSupervisor, supervisorReadWCDResult);
router.route("/supervisorReadPR").get(protectSupervisor, supervisorReadPR);
router.route("/supervisorEvaluatePR/:id").get(supervisorReadPRByID)
                                         .put(protectSupervisor, supervisorEvaluatePR);
router.route('/supervisorReadPRResult').get(protectSupervisor, supervisorReadPRResult);


export default router;

