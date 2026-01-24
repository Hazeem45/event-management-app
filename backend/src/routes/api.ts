import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { USER_ROLE_VALUES } from "../constants/roles";

const router = Router();

router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register
);
router.post("/auth/login", validate(loginSchema), authController.login);
router.post("/auth/activation", authController.activation);
router.get("/auth/me", authMiddleware, authController.me);

router.get(
  "/test-acl",
  authMiddleware,
  aclMiddleware(USER_ROLE_VALUES),
  (req, res) => {
    res.status(200).json({
      message: "Success",
      status: "OK",
    });
  }
);

export default router;
