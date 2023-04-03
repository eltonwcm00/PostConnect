import express from "express";
import {panelLogin,panelReadRPD } from "../controllers/PanelController.js";
import { protectPanel } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/panelLogin", panelLogin);
router.route("/panelReadRPD").get(protectPanel, panelReadRPD);

export default router;

