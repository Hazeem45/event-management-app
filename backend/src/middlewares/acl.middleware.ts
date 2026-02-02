import { NextFunction, Response } from "express";
import { IRequestExtended } from "../types/request";
import response from "../utils/response";

export default (roles: string[]) => {
  return (req: IRequestExtended, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !roles.includes(role)) {
      return response.forbidden(res, "access denied");
    }

    next();
  };
};

// Access Control List(Role Based)
