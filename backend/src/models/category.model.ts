import { model, Schema } from "mongoose";
import { Category } from "../schemas/category.zod";

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    icon: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model("Category", CategorySchema);
