import { z } from "zod";
import { categoryZodSchema } from "../schemas/category.zod";

export const createCategorySchema = z.object({
  body: categoryZodSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>["body"];

export const updateCategorySchema = z.object({
  body: categoryZodSchema.partial(),
});

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>["body"];
