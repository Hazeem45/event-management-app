import { z } from "zod";

export const registerSchema = z.object({
  body: z
    .object({
      fullName: z.string().min(1, "Fullname is required"),
      username: z.string().min(1, "Username is required"),
      email: z.email("Invalid email"),
      password: z.string().min(6, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password not match!",
      path: ["confirmPassword"],
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(1, "Identifier is required"),
    password: z.string().min(1, "Password is required"),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>["body"];
