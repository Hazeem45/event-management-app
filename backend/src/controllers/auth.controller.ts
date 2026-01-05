import { Request, Response } from "express";
import { RegisterInput } from "../validators/auth.validator";
import { UserModel } from "../models/user.model";

export default {
  async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const { fullName, username, email, password } = req.body;

    try {
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
    } catch (error) {}
  },
};
