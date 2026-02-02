import { NextFunction, Response } from "express";
import { verifyToken } from "../services/jwt.service";
import { IRequestExtended } from "../types/request";
import response from "../utils/response";

export default (req: IRequestExtended, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return response.unauthorized(res, "authorization header is missing");
  }

  const [prefix, token] = authorization.split(" ");
  if (!(prefix === "Bearer" && token)) {
    return response.unauthorized(res, "invalid token format");
  }

  try {
    const payload = verifyToken("access", token);
    req.user = payload;
    next();
  } catch {
    return response.unauthorized(res, "invalid or expired token");
  }
};
