import express from "express";
import {panelLogin,panelReadRPD, panelReadRPDByID, panelEvaluatePassRPD, panelEvaluateFailRPD } from "../controllers/PanelController.js";
import { protectPanel } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/panelLogin", panelLogin);
router.route("/panelReadRPD").get(protectPanel, panelReadRPD);
router.route("/panelEvaluateRPD/:id").get(panelReadRPDByID)
                                     .put(protectPanel, panelEvaluatePassRPD);
router.route("/panelEvaluateRPD2/:id").get(panelReadRPDByID)
                                      .put(protectPanel, panelEvaluateFailRPD);

export default router;

