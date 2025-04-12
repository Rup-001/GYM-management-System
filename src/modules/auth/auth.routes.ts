import { Router } from "express";
import { validateLogin, validateResigration } from "../auth/auth.validation";
import { validationResult } from "express-validator";
import { loginUser, registrationUser, home } from "./auth.controller";
import { Request, Response, NextFunction } from "express";
const router = Router();

router.get("/", home);

router.post(
    "/login",
    validateLogin,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors});
        return 
      }
      next();
    },
    loginUser
  );
router.post(
    "/registration",
    validateResigration,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors });
        return 
      }
      next();
    },
    registrationUser
  );


export default router;
