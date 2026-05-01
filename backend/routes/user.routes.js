import express from "express";
import {
  createUserByAdmin,
  getAllUsers,
  updateUserRole
} from "../controllers/user.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// ADMIN ONLY
router.post("/", protectRoute, authorizeRoles("admin"), createUserByAdmin);
router.get("/", protectRoute, authorizeRoles("admin"), getAllUsers);
router.put("/:id/role", protectRoute, authorizeRoles("admin"), updateUserRole);

export default router;