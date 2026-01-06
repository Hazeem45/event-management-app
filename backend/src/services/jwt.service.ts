import jwt from "jsonwebtoken";
import env from "../config/env";
import { JwtPayload, JwtUser } from "../types/jwt";

export const generateToken = (user: JwtUser): string => {
  const token = jwt.sign(user, env.SECRET_KEY, {
    expiresIn: "10h",
  });
  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, env.SECRET_KEY) as JwtPayload;
  return user;
};
