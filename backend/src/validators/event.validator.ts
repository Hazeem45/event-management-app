import { z } from "zod";
import { eventZodSchema } from "../schemas/event.zod";

export const createEventSchema = z.object({
  body: eventZodSchema.omit({
    createdBy: true,
  }),
});

export type CreateEventInput = z.infer<typeof createEventSchema>["body"];

export const updateEventSchema = z.object({
  body: eventZodSchema.omit({ createdBy: true }).partial(),
});

export type UpdateEventInput = z.infer<typeof updateEventSchema>["body"];
