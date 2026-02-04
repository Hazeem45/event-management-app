import z from "zod";

export const categoryZodSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  icon: z.string().nonempty(),
});

export type Category = z.infer<typeof categoryZodSchema>;
