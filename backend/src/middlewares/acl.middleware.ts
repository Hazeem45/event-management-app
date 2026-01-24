import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/request";

export default (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !roles.includes(role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};

// Access Control List(Role Based)
