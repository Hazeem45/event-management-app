import { NextFunction, Response } from "express";
import { verifyToken } from "../services/jwt.service";
import { AuthenticatedRequest } from "../types/request";

export default (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  const [prefix, token] = authorization.split(" ");
  if (!(prefix === "Bearer" && token)) {
    return res.status(401).json({
      message: "Invalid token format",
    });
  }

  try {
    const payload = verifyToken("access", token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};
