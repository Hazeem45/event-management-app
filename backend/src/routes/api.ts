import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register
);
router.post("/auth/login", validate(loginSchema), authController.login);

export default router;
