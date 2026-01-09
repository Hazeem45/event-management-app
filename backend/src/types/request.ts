import { Request } from "express";
import { AccessTokenPayload, JwtMeta } from "./jwt";

export interface AuthenticatedRequest extends Request {
  user?: AccessTokenPayload & JwtMeta;
}
