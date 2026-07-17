import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  getUsers,
  getProfile,
  updateProfile,
  getNotificationSettings,
  updateNotificationSettings,
} from "../controllers/userController.js";

const router = Router();

router.use(protect);

router.get("/", getUsers);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get(
  "/notifications",
  getNotificationSettings
);

router.put(
  "/notifications",
  updateNotificationSettings
);

export default router;