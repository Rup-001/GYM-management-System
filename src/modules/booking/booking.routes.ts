import { Router } from "express";
import { bookClassController ,cancelBookingController  } from "./booking.controller";
import { isUnauthorized, isAdmin, isTrainer, isTrainee } from "../../middlewares/auth.middleware";

const router = Router();

router.patch(
    "/book-schedule",
    isUnauthorized,
    isTrainee,
    bookClassController 
  );
router.patch(
    "/cancel-booking",
    isUnauthorized,
    isTrainee,
    cancelBookingController 
  );
export default router;
