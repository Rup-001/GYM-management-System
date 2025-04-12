// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IUser } from "../modules/models/user.model";

// 🛡️ Middleware to check if user is authenticated (JWT)
export const isUnauthorized = (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate("jwt", { session: false }, (err: Error | null, user: Express.User | false, info: any) => {
  
    if (err || !user) {
       
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. You cannot access this resource without proper authentication.",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

// 🔐 Middleware to allow only Admins
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (user && user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Access denied: Admins only" });
  return 
};

// 🔐 Middleware to allow only Trainers
export const isTrainer = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (user && user.role === "trainer") {
    return next();
  }
   res.status(403).json({ message: "Access denied: Trainers only" });
   return
};

// 🔐 Middleware to allow only Trainees
export const isTrainee = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (user && user.role === "trainee") {
    return next();
  }
   res.status(403).json({ message: "Access denied: Trainees only" });
   return
};
