import { Request, Response } from "express";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { UserModel } from "../models/user.model";

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

    return res.status(200).json({
      message: "Login success",
      data: existedUser,
    });
  },
};
