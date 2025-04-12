// src/validation/auth.validation.ts
import { body } from "express-validator";

// Validation for the login fields
export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail() //This stops running further validations on this field if the previous one failed.
    .isEmail()
    .withMessage("Must be a valid email address"),
    
  
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
];
export const validateResigration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .bail(), //This stops running further validations on this field if the previous one failed.
   
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail() //This stops running further validations on this field if the previous one failed.
    .isEmail()
    .withMessage("Must be a valid email address"),
    
  
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),

    body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(['admin', 'trainer', 'trainee'])
    .withMessage("Role must be one of: admin, trainer, trainee")
];
