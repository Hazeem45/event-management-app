import { Types } from "mongoose";
import { UserRole } from "../constants/roles";

export interface BaseJwtSubject {
  sub: Types.ObjectId | string;
}

export interface AccessTokenPayload extends BaseJwtSubject {
  role: UserRole;
}

export interface EmailVerificationPayload extends BaseJwtSubject {
  email: string;
}

export type JwtPayloadMap = {
  access: AccessTokenPayload;
  email: EmailVerificationPayload;
};

export interface JwtMeta {
  iat: number;
  exp: number;
}
