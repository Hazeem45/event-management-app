import { Request, Response } from "express";
import response from "../utils/response";
import { CategoryModel } from "../models/category.model";
import { IPaginationQuery } from "../types/query";
import { Types } from "mongoose";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../validators/category.validator";

export default {
  async create(req: Request<{}, {}, CreateCategoryInput>, res: Response) {
    const { name, description, icon } = req.body;

    try {
      const category = await CategoryModel.create({
        name,
        description,
        icon,
      });
      response.success(res, category, "success created category", 201);
    } catch (error) {
      response.error(res, error, "failed create category");
    }
  },

  async findAll(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as unknown as IPaginationQuery;

    try {
      const query: object = {};
      if (search) {
        Object.assign(query, {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        });
      }
      const categories = await CategoryModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      const count = await CategoryModel.countDocuments(query);
      response.pagination(
        res,
        categories,
        {
          total: count,
          totalPages: Math.ceil(count / limit),
          current: page,
        },
        "success get all categories"
      );
    } catch (error) {
      response.error(res, error, "failed get all categories");
    }
  },

  async findOne(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return response.notFound(res, "category not found");
    }

    try {
      const category = await CategoryModel.findById(id);
      if (!category) {
        return response.notFound(res, "category not found");
      }
      response.success(res, category, "success get category");
    } catch (error) {
      console.log(error);
      response.error(res, error, "failed get category");
    }
  },

  async update(
    req: Request<{ id: string }, {}, UpdateCategoryInput>,
    res: Response
  ) {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return response.notFound(res, "category not found");
    }

    if (Object.keys(req.body).length === 0) {
      return response.success(res, null, "no data provided, nothing to update");
    }

    try {
      const category = await CategoryModel.findByIdAndUpdate(
        id,
        { name, description, icon },
        {
          new: true,
        }
      );
      if (!category) {
        return response.notFound(res, "category not found");
      }
      response.success(res, category, "success updated category");
    } catch (error) {
      response.error(res, error, "failed update category");
    }
  },

  async remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return response.notFound(res, "category not found");
    }

    try {
      const category = await CategoryModel.findByIdAndDelete(id);
      if (!category) {
        return response.notFound(res, "category not found");
      }
      response.success(res, category, "success removed category");
    } catch (error) {
      response.error(res, error, "failed remove category");
    }
  },
};
