import { Router } from "express";
import { getTraineeProfile, getTrainerSchedule } from "./user.controller";
import { isUnauthorized, isAdmin, isTrainer, isTrainee } from "../../middlewares/auth.middleware";

const router = Router();

router.get(
    "/trainee-profile",
    isUnauthorized,
    isTrainee,
    getTraineeProfile
  );
router.get(
    "/trainer-profile",
    isUnauthorized,
    isTrainer,
    getTrainerSchedule
  );

export default router;
