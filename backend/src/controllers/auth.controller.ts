import { Request, Response } from "express";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { UserModel } from "../models/user.model";
import { generateToken } from "../services/jwt.service";
import { AuthenticatedRequest } from "../types/request";

export default {
  async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const { fullName, username, email, password } = req.body;

    const result = await UserModel.create({
      fullName,
      username,
      email,
      password,
    });
    res.status(200).json({
      message: "Success Registration!",
      data: result,
    });
  },

  async login(req: Request<{}, {}, LoginInput>, res: Response) {
    const { identifier, password } = req.body;

    const existedUser = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!existedUser) {
      return res.status(403).json({
        message: "Invalid credentials",
        data: null,
      });
    }

    const isMatch = await existedUser.comparePassword(password);

    if (!isMatch) {
      return res.status(403).json({
        message: "Invalid credentials",
        data: null,
      });
    }

    const accessToken = generateToken({
      type: "access",
      payload: {
        sub: existedUser._id,
        role: existedUser.role,
      },
      options: { expiresIn: "10m" },
    });

    return res.status(200).json({
      message: "Login success",
      data: accessToken,
    });
  },

  async me(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const id = user.sub;
    const result = await UserModel.findById(id);

    return res.status(200).json({
      message: "User data",
      data: result,
    });
  },
};
