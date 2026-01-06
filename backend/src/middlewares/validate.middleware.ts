import { Request, Response, NextFunction } from "express";
import * as z from "zod";
import { extractZodErrors } from "../utils/zodErrorToObject";

export const validate =
  (schema: z.ZodType<{ body: unknown }>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      const errors = extractZodErrors(tree.properties?.body ?? {});

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
