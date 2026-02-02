import { Response } from "express";
import mongoose from "mongoose";
import * as z from "zod";
import { extractZodErrors, TreeNode } from "./zodErrorToObject";
import { JsonWebTokenError } from "jsonwebtoken";

// type Pagination = {
//   totalPages: number;
//   current: number;
//   total: number;
// };

export default {
  success(
    res: Response,
    data: any,
    message: string = "success",
    status: number = 200
  ) {
    return res.status(status).json({
      meta: {
        status: status,
        message,
      },
      data,
    });
  },

  error(res: Response, error: unknown, message: string) {
    if (error instanceof z.ZodError) {
      const tree = z.treeifyError(error) as unknown as TreeNode;
      const errors = extractZodErrors(tree.properties?.body ?? {});
      return this.badRequest(res, message, errors);
    }

    if (error instanceof JsonWebTokenError) {
      return this.gone(res, `${message}, invalid or expired activation token`);
    }

    if (error instanceof mongoose.Error) {
      return res.status(500).json({
        meta: {
          status: 500,
          message: error.message,
        },
        data: error.name,
      });
    }

    if ((error as any)?.code) {
      const _err = error as any;
      return res.status(500).json({
        meta: {
          status: 500,
          message: _err?.errorResponse?.errmsg || "server error",
        },
        data: _err,
      });
    }

    res.status(500).json({
      meta: {
        status: 500,
        message,
      },
      data: error,
    });
  },

  badRequest(res: Response, message: string = "bad request", data: any = null) {
    res.status(400).json({
      meta: {
        status: 400,
        message,
      },
      data: data,
    });
  },

  unauthorized(
    res: Response,
    message: string = "unauthorized",
    data: any = null
  ) {
    res.status(401).json({
      meta: {
        status: 401,
        message,
      },
      data: data,
    });
  },

  forbidden(res: Response, message: string = "forbidden", data: any = null) {
    res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: data,
    });
  },

  notFound(res: Response, message: string = "not found", data: any = null) {
    res.status(404).json({
      meta: {
        status: 404,
        message,
      },
      data: data,
    });
  },

  gone(
    res: Response,
    message: string = "resource is no longer available",
    data: any = null
  ) {
    return res.status(410).json({
      meta: {
        status: 410,
        message,
      },
      data,
    });
  },

  // pagination(
  //   res: Response,
  //   data: any[],
  //   pagination: Pagination,
  //   message: string
  // ) {
  //   res.status(200).json({
  //     meta: {
  //       status: 200,
  //       message,
  //     },
  //     data,
  //     pagination,
  //   });
  // },
};
