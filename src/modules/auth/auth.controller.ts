import { Request, Response, NextFunction  } from "express";
import User from "../models/user.model" 
import { loginUserService } from "../auth/auth.service";
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

export const home = (req: Request, res: Response) => {
    res.send("Welcome to Auth API");
  };


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const result = await loginUserService(email, password);

  if (result.error) {
    res.status(result.error.status || 400).json({
      success: false,
      message: result.error.message,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Logged in as ${result.user!.username}`,
    token: `Bearer ${result.token}`,
    username: result.user!.username,
    role: result.user!.role,
  });
};



export const registrationUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(400).json({ message: "User with this email or username already exists" });
            return;
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
  };













//   export const loginUser = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
//     try {
//         const { email, password } = req.body;
    
//         // Check if email is provided in the request body
//         if (!email) {
//           res.status(400).json({
//             success: false,
//             message: "Email or username is required",
//           });
//           return 
//         }
    
//         // Determine whether the input is an email or username
//         let user;
//         if (email) {
//           // If it contains '@', it's an email
//           user = await User.findOne({ email: email });
//         } 
    
//         if (!user) {
//           res.status(401).json({
//             success: false,
//             message: "User not found",
//           });
//           return 
//         }
    
//         // Verify the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//           res.status(401).json({
//             success: false,
//             message: "Incorrect password",
//           });
//           return 
//         }
    
//         // Create the JWT payload
//         const payload = {
//           id: user._id,              // User's unique ID
//           username: user.username,   // Username
//           email: user.email,         // Email
//           role: user.role,           // Role (e.g., user/admin)
//         };
    
//         // Sign the JWT (create the token)
//         const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });
    
//         // Send the Bearer token to the client
//         res.status(200).json({
//           success: true,
//           message: `Logged in as ${user.username}`,
//           token: `Bearer ${token}`,  // Send token as Bearer token
//           username: user.username,
//           role: user.role
//         });
//       } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Server error during login." });
//       }
//   };