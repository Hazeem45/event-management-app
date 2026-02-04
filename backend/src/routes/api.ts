import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { USER_ROLE_VALUES, USER_ROLES } from "../constants/roles";
import mediaMiddleware from "../middlewares/media.middleware";
import mediaController from "../controllers/media.controller";
import categoryController from "../controllers/category.controller";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";
import regionController from "../controllers/region.controller";

const router = Router();

// auth
router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register
);
router.post("/auth/login", validate(loginSchema), authController.login);
router.post("/auth/activation", authController.activation);
router.get("/auth/me", authMiddleware, authController.me);

// category
router.post(
  "/category/create",
  authMiddleware,
  aclMiddleware([USER_ROLES.ADMIN]),
  validate(createCategorySchema),
  categoryController.create
);
router.get("/category/find-all", categoryController.findAll);
router.get("/category/find-one/:id", categoryController.findOne);
router.put(
  "/category/update/:id",
  authMiddleware,
  aclMiddleware([USER_ROLES.ADMIN]),
  validate(updateCategorySchema),
  categoryController.update
);
router.delete(
  "/category/remove/:id",
  authMiddleware,
  aclMiddleware([USER_ROLES.ADMIN]),
  categoryController.remove
);

// region
// Get All Provinces
router.get("/regions/provinces", regionController.getAllProvinces);
// Get Province by id with Regencies
router.get("/regions/province/:id", regionController.getProvince);
// Get Regency by id with Districts
router.get("/regions/regency/:id", regionController.getRegency);
// Get District by id with Villages
router.get("/regions/district/:id", regionController.getDistrict);
// Get Village by id
router.get("/regions/village/:id", regionController.getVillage);
// Get Region by city name
router.get("/regions/search", regionController.findByCity);

// media
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
