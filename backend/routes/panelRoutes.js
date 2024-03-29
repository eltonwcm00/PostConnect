import express from "express";
import {panelLogin, panelProfileList, panelProfileListByID, panelUpdatedProfile,
        panelCountEvaluatedRPD, panelCountEvaluatedWCD, panelCountEvaluatedPR,
        panelReadRPD, panelReadRPDByID, panelEvaluatePassRPD, panelEvaluateFailRPD, 
        panelReadWCD, panelReadWCDByID, panelEvaluatePassWCD, panelEvaluateFailWCD, 
        panelReadPRDateSetPR, panelReadPR, panelReadPRByID, panelEvaluatePR } from "../controllers/PanelController.js";
import { protectPanel } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/panelLogin", panelLogin);
router.route("/panelProfileList").get(panelProfileList);
router.route('/panelProfileList/:id').get(panelProfileListByID)
                                     .put(panelUpdatedProfile);
router.route("/panelCountEvaluatedRPD").get(panelCountEvaluatedRPD);
router.route("/panelCountEvaluatedWCD").get(panelCountEvaluatedWCD);
router.route("/panelCountEvaluatedPR").get(panelCountEvaluatedPR);
router.route("/panelReadRPD").get(protectPanel, panelReadRPD);
router.route("/panelEvaluateRPD/:id").get(panelReadRPDByID)
                                     .put(protectPanel, panelEvaluatePassRPD);
router.route("/panelEvaluateRPD2/:id").get(panelReadRPDByID)
                                      .put(protectPanel, panelEvaluateFailRPD);
router.route("/panelReadWCD").get(protectPanel, panelReadWCD);
router.route("/panelEvaluateWCD/:id").get(panelReadWCDByID)
                                     .put(protectPanel, panelEvaluatePassWCD);
router.route("/panelEvaluateWCD2/:id").get(panelReadWCDByID)
                                      .put(protectPanel, panelEvaluateFailWCD);
router.route("/panelReadPRSetDate").get(panelReadPRDateSetPR);
router.route("/panelReadPR").get(protectPanel, panelReadPR);
router.route("/panelEvaluatePR/:id").get(panelReadPRByID)
                                    .put(protectPanel, panelEvaluatePR);
                                     
export default router;

