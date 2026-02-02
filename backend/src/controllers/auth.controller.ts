import { Request, Response } from "express";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { UserModel } from "../models/user.model";
import { generateToken, verifyToken } from "../services/jwt.service";
import { IRequestExtended } from "../types/request";
import { renderHtml, sendMail } from "../services/mail.service";
import { hashData } from "../utils/crypto";
import response from "../utils/response";

export default {
  async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const { fullName, username, email, password } = req.body;

    try {
      const user = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      const verifyEmailToken = generateToken({
        type: "email",
        payload: {
          sub: user._id,
          email: user.email,
        },
        options: { expiresIn: "15m" },
      });

      user.activationCode = hashData(verifyEmailToken);
      user.activationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();

      const verifyUrl = `${process.env.CLIENT_URL}/auth/activation?token=${verifyEmailToken}`;

      const html = await renderHtml({
        template: "verify-email",
        data: {
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt.toDateString(),
          verifyUrl,
          expiresIn: 15,
        },
      });

      sendMail({
        to: user.email,
        subject: "Activate Your Account - ACARA",
        html,
      }).catch(console.error);

      const data = {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
      };

      response.success(
        res,
        data,
        "registration successful. please check your email.",
        201
      );
    } catch (error) {
      response.error(res, error, "failed registration");
    }
  },

  async login(req: Request<{}, {}, LoginInput>, res: Response) {
    const { identifier, password } = req.body;

    try {
      const existedUser = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      }).select("+password");

      if (!existedUser) {
        return response.unauthorized(res, "invalid credentials");
      }

      const isMatch = await existedUser.comparePassword(password);

      if (!isMatch) {
        return response.unauthorized(res, "invalid credentials");
      }

      if (!existedUser.isActive) {
        return response.unauthorized(
          res,
          "account not activated, please check your email"
        );
      }

      const accessToken = generateToken({
        type: "access",
        payload: {
          sub: existedUser._id,
          role: existedUser.role,
        },
        options: { expiresIn: "10m" },
      });

      response.success(res, accessToken, "login success");
    } catch (error) {
      response.error(res, error, "failed login");
    }
  },

  async activation(req: Request, res: Response) {
    if (!req.body) {
      return response.badRequest(res, "request body is required");
    }

    const { token } = req.body as { token: string };
    if (!token) {
      return response.badRequest(res, "activation token is required");
    }

    try {
      const payload = verifyToken("email", token);
      const hashedToken = hashData(token);
      const user = await UserModel.findOneAndUpdate(
        {
          _id: payload.sub,
          activationCode: hashedToken,
          activationCodeExpiresAt: { $gt: new Date() },
          isActive: false,
        },
        {
          $set: {
            isActive: true,
          },
          $unset: {
            activationCode: "",
            activationCodeExpiresAt: "",
          },
        },
        { new: true }
      );

      if (!user) {
        return response.gone(res, "invalid or expired activation token");
      }

      response.success(res, user, "account successfully activated");
    } catch (error) {
      response.error(res, error, "failed activation account");
    }
  },

  async me(req: IRequestExtended, res: Response) {
    const user = req.user;

    try {
      const result = await UserModel.findById(user?.sub);

      if (!result) {
        return response.notFound(res, "user not found");
      }

      response.success(res, result, "success get user profile");
    } catch (error) {
      response.error(res, error, "failed get user profile");
    }
  },
};
