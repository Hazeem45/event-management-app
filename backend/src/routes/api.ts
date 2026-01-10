import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register
);
router.post("/auth/login", validate(loginSchema), authController.login);
router.post("/auth/activation", authController.activation);
router.get("/auth/me", authMiddleware, authController.me);

export default router;
