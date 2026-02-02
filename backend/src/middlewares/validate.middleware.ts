import { Request, Response, NextFunction } from "express";
import * as z from "zod";
import response from "../utils/response";

export const validate =
  (schema: z.ZodType<{ body: unknown }>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return response.error(res, result.error, "validation error");
    }

    next();
  };
