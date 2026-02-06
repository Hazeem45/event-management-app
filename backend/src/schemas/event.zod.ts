import { Types } from "mongoose";
import z from "zod";

export const eventZodSchema = z.object({
  name: z.string().nonempty(),
  banner: z.string().nonempty(),
  category: z.string().nonempty(),
  description: z.string().nonempty(),
  startDate: z.string().nonempty(),
  endDate: z.string().nonempty(),
  slug: z.string().optional(),
  location: z.object({
    region: z.number(),
    coordinates: z.array(z.number()),
    address: z.string().optional(),
  }),
  createdBy: z.string(),
  isOnline: z.boolean(),
  isFeatured: z.boolean(),
  isPublish: z.boolean().optional(),
});

export type TEvent = z.infer<typeof eventZodSchema>;

export interface IEvent extends Omit<TEvent, "category" | "createdBy"> {
  category: Types.ObjectId;
  createdBy: Types.ObjectId;
}
