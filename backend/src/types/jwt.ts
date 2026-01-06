import { Types } from "mongoose";
import { UserDocument } from "../models/user.model";

export type JwtUser = Pick<UserDocument, "role"> & {
  sub: Types.ObjectId | string;
};

export interface JwtPayload extends JwtUser {
  iat: number;
  exp: number;
}
