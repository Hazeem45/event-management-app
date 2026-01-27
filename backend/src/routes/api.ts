import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { USER_ROLE_VALUES } from "../constants/roles";
import mediaMiddleware from "../middlewares/media.middleware";
import mediaController from "../controllers/media.controller";

const router = Router();

router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register
);
router.post("/auth/login", validate(loginSchema), authController.login);
router.post("/auth/activation", authController.activation);
router.get("/auth/me", authMiddleware, authController.me);

router.post(
  "/media/upload-single",
  authMiddleware,
  aclMiddleware(USER_ROLE_VALUES),
  mediaMiddleware.single("file"),
  mediaController.single
);
router.post(
  "/media/upload-multiple",
  authMiddleware,
  aclMiddleware(USER_ROLE_VALUES),
  mediaMiddleware.multiple("files"),
  mediaController.multiple
);
router.delete(
  "/media/remove",
  authMiddleware,
  aclMiddleware(USER_ROLE_VALUES),
  mediaController.remove
);

export default router;
