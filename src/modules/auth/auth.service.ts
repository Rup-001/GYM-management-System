import { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import { signToken } from "../auth/auth.jwt";
import User from "../models/user.model";

interface LoginResponse {
  user?: IUser;
  error?: { message: string; status?: number };
  token?: string;
}

export const loginUserService = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return {
        error: {
          message: "User not found",
          status: 401,
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        error: {
          message: "Incorrect password",
          status: 401,
        },
      };
    }

    const token = signToken(user);

    return {
      user,
      token,
    };
  } catch (error) {
    console.error("Error during login service:", error);
    return {
      error: {
        message: "Server error during login.",
        status: 500,
      },
    };
  }
};
