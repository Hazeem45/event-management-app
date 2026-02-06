import { Request, Response } from "express";
import response from "../utils/response";
import { IRequestExtended } from "../types/request";
import { TEvent } from "../schemas/event.zod";
import { Types } from "mongoose";
import { EventModel } from "../models/event.model";
import { IPaginationQuery } from "../types/query";
import { CategoryModel } from "../models/category.model";
import {
  CreateEventInput,
  UpdateEventInput,
} from "../validators/event.validator";

export default {
  async createEvent(
    req: IRequestExtended<{}, {}, CreateEventInput>,
    res: Response
  ) {
    const input = req.body;
    if (!Types.ObjectId.isValid(input.category)) {
      return response.notFound(res, "invalid, category not found");
    }

    try {
      const payload = { ...input, createdBy: req.user?.sub } as TEvent;

      const category = await CategoryModel.findById(input.category);
      if (!category) {
        return response.notFound(res, "category not found");
      }
      const event = await EventModel.create(payload);
      response.success(res, event, "success created an event", 201);
    } catch (error) {
      response.error(res, error, "failed create an event");
    }
  },

  async findAllEvent(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as unknown as IPaginationQuery;

    try {
      const query: object = {};
      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }
      const events = await EventModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      const count = await EventModel.countDocuments(query);
      response.pagination(
        res,
        events,
        {
          total: count,
          totalPages: Math.ceil(count / limit),
          current: page,
        },
        "success get all events"
      );
    } catch (error) {
      response.error(res, error, "failed get all event");
    }
  },

  async findEventById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return response.notFound(res, "event not found");
    }

    try {
      const event = await EventModel.findById(id);
      if (!event) {
        return response.notFound(res, "event not found");
      }
      response.success(res, event, "success get an event");
    } catch (error) {
      response.error(res, error, "failed get an event");
    }
  },

  async findEventBySlug(req: Request<{ slug: object }>, res: Response) {
    const { slug } = req.params;

    try {
      const event = await EventModel.findOne({ slug });
      if (!event) {
        return response.notFound(res, "event not found");
      }
      response.success(res, event, "success get an event by slug");
    } catch (error) {
      response.error(res, error, "failed get an event by slug");
    }
  },

  async updateEvent(
    req: Request<{ id: string }, {}, UpdateEventInput>,
    res: Response
  ) {
    const { id } = req.params;
    const input = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return response.notFound(res, "event not found");
    }

    if (Object.keys(input).length === 0) {
      return response.success(res, null, "no data provided, nothing to update");
    }

    try {
      const event = await EventModel.findByIdAndUpdate(
        id,
        { ...input, slug: input.name?.split(" ").join("-").toLowerCase() },
        {
          new: true,
        }
      );
      if (!event) {
        return response.notFound(res, "event not found");
      }
      response.success(res, event, "success updated an event");
    } catch (error) {
      response.error(res, error, "failed update an event");
    }
  },

  async removeEvent(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return response.notFound(res, "event not found");
    }

    try {
      const event = await EventModel.findByIdAndDelete(id, {
        new: true,
      });
      if (!event) {
        return response.notFound(res, "event not found");
      }
      response.success(res, event, "success removed an event");
    } catch (error) {
      response.error(res, error, "failed remove an event");
    }
  },
};
