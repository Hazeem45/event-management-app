import { Request } from "express";
import { JwtPayload } from "./jwt";

export interface IRequestUser extends Request {
  user?: JwtPayload;
}
