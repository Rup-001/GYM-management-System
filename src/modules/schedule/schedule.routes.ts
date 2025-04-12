import { Router } from "express";
import { createClassSchedule,assignTrainer } from "./schedule.controller";
import { isUnauthorized, isAdmin, isTrainer, isTrainee } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
    "/",
    isUnauthorized,
    isAdmin,
    createClassSchedule
  );
router.patch(
    "/assign-trainer",
    isUnauthorized,
    isAdmin,
    assignTrainer
  );
export default router;
