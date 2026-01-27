import { Response } from "express";
import { AuthenticatedRequest } from "../types/request";
import {
  remove,
  uploadMultiple,
  uploadSingle,
} from "../services/media.service";

export default {
  async single(req: AuthenticatedRequest, res: Response) {
    if (!req.file) {
      return res.status(400).json({
        message: "File is not exist",
      });
    }
    try {
      const result = await uploadSingle(req.file as Express.Multer.File);
      res.status(200).json({
        message: "Success upload a file",
        data: result,
      });
    } catch {
      res.status(500).json({
        message: "Failed upload a file",
      });
    }
  },

  async multiple(req: AuthenticatedRequest, res: Response) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Files are not exist",
      });
    }
    try {
      const result = await uploadMultiple(req.files as Express.Multer.File[]);
      res.status(200).json({
        message: "Success upload files",
        data: result,
      });
    } catch {
      res.status(500).json({
        message: "Failed upload files",
      });
    }
  },

  async remove(req: AuthenticatedRequest, res: Response) {
    try {
      const { fileUrl } = req.body as { fileUrl: string };
      const result = await remove(fileUrl);
      res.status(200).json({
        message: "Succes remove a file",
        data: result,
      });
    } catch {
      res.status(500).json({
        message: "Failed remove file",
      });
    }
  },
};
