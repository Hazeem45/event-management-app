import { Request } from "express";
import { AccessTokenPayload, JwtMeta } from "./jwt";

export interface IRequestExtended extends Request {
  user?: AccessTokenPayload & JwtMeta;
}
