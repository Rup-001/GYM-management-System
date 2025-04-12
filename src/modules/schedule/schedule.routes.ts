import { Router } from "express";
import { createClassSchedule,assignTrainer, getAllSchedules  } from "./schedule.controller";
import { isUnauthorized, isAdmin, isTrainer, isTrainee } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
    "/",
    isUnauthorized,
    isAdmin,
    createClassSchedule
  );
router.get(
    "/all",
    isUnauthorized,
    getAllSchedules 
  );
router.patch(
    "/assign-trainer",
    isUnauthorized,
    isAdmin,
    assignTrainer
  );
export default router;
