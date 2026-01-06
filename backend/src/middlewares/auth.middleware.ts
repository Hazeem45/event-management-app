import { NextFunction, Response } from "express";
import { getUserData } from "../services/jwt.service";
import { IRequestUser } from "../types/request";

export default (req: IRequestUser, res: Response, next: NextFunction) => {
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
    const userData = getUserData(token);
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};
