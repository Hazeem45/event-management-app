import { Request } from "express";
import { AccessTokenPayload, JwtMeta } from "./jwt";

export interface IRequestExtended<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: AccessTokenPayload & JwtMeta;
}
