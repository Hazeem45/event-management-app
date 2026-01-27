import { Request, Response } from "express";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { UserModel } from "../models/user.model";
import { generateToken, verifyToken } from "../services/jwt.service";
import { IRequestExtended } from "../types/request";
import { renderHtml, sendMail } from "../services/mail.service";
import { hashData } from "../utils/crypto";

export default {
  async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const { fullName, username, email, password } = req.body;

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

    res.status(201).json({
      message: "Registration successful. Please check your email.",
      data: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
      },
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

    if (!existedUser.isActive) {
      return res.status(403).json({
        message: "Account not activated. Please check your email.",
        email: existedUser.email,
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

  async activation(req: Request, res: Response) {
    const { token }: { token: string } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Activation token is required",
      });
    }

    const payload = verifyToken("email", token);

    if (!payload) {
      return res.status(400).json({
        message: "Invalid or expired activation token",
      });
    }

    const hashedToken = hashData(token);

    const user = await UserModel.findOneAndUpdate(
      {
        _id: payload.sub,
        activationCode: hashedToken,
        activationCodeExpiresAt: { $gt: new Date() },
        isActive: false,
      },
      {
        isActive: true,
        activationCode: undefined,
        activationCodeExpiresAt: undefined,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "Activation failed or token already used",
      });
    }

    return res.status(200).json({
      message: "Account successfully activated",
      data: user,
    });
  },

  async me(req: IRequestExtended, res: Response) {
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
