import { Response } from "express";
import { IRequestExtended } from "../types/request";
import {
  remove,
  uploadMultiple,
  uploadSingle,
} from "../services/media.service";
import response from "../utils/response";

export default {
  async single(req: IRequestExtended, res: Response) {
    if (!req.file) {
      return response.notFound(res, "file not found");
    }
    try {
      const result = await uploadSingle(req.file as Express.Multer.File);
      response.success(res, result, "success upload a file");
    } catch (error) {
      response.error(res, error, "failed upload a file");
    }
  },

  async multiple(req: IRequestExtended, res: Response) {
    if (!req.files || req.files.length === 0) {
      return response.notFound(res, "files not found");
    }
    try {
      const result = await uploadMultiple(req.files as Express.Multer.File[]);
      response.success(res, result, "success upload files");
    } catch (error) {
      response.error(res, error, "failed upload files");
    }
  },

  async remove(req: IRequestExtended, res: Response) {
    if (!req.body) {
      return response.badRequest(res, "request body is required");
    }

    const { fileUrl } = req.body as { fileUrl: string };
    if (!fileUrl) {
      return response.badRequest(res, "fileUrl is required");
    }

    try {
      const result = await remove(fileUrl);

      if (!(result.result === "ok")) {
        return response.notFound(res, "file not found");
      }
      response.success(res, result, "success remove a file");
    } catch (error) {
      response.error(res, error, "failed remove file");
    }
  },
};
