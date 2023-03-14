import express from "express";
import { supervisorLogin, supervisorReadChooseStudent, supervisorReadChooseStudentByID, supervisorUpdateChooseStudentByID } from "../controllers/SupervisorController.js";
import { protectSupervisor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/supervisorLogin", supervisorLogin);
router.route("/supervisorReadChooseStudent").get(protectSupervisor, supervisorReadChooseStudent)
router.route("/supervisorReadChooseStudent/:id").get(supervisorReadChooseStudentByID)
                                                .put(protectSupervisor,supervisorUpdateChooseStudentByID)

export default router;

