// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

const secret = process.env.SECRET_KEY as string;

export const signToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secret, { expiresIn: "2d" });
  
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
