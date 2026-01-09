import jwt, { SignOptions } from "jsonwebtoken";
import env from "../config/env";
import { JwtMeta, JwtPayloadMap } from "../types/jwt";

export type TokenType = keyof JwtPayloadMap;

type GenerateTokenInput<T extends TokenType> = {
  type: T;
  payload: JwtPayloadMap[T];
  options?: SignOptions;
};

const getJwtSecret = (type: TokenType): string => {
  switch (type) {
    case "access":
      return env.JWT_ACCESS_SECRET;
    case "email":
      return env.JWT_EMAIL_SECRET;
    default:
      throw new Error("Invalid token type");
  }
};

export const generateToken = <T extends TokenType>({
  type,
  payload,
  options,
}: GenerateTokenInput<T>): string => {
  const secret = getJwtSecret(type);
  return jwt.sign(payload, secret, options);
};

export const verifyToken = <T extends TokenType>(
  type: T,
  token: string
): JwtPayloadMap[T] & JwtMeta => {
  const secret = getJwtSecret(type);
  return jwt.verify(token, secret) as JwtPayloadMap[T] & JwtMeta;
};
