import { Router } from "express";
import { protect } from "../middleware/auth.js";

import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/teamController.js";

const router = Router();

router.use(protect);

router.route("/")
  .get(getMembers)
  .post(createMember);

router.route("/:id")
  .get(getMemberById)
  .put(updateMember)
  .delete(deleteMember);

export default router;