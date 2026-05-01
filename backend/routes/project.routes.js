import express from "express";
import {
  createProject,
  addMember,
  getProjectDashboard,
} from "../controllers/project.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// CREATE PROJECT (ADMIN)
router.post("/", protectRoute, authorizeRoles("admin"), createProject);

// ADD MEMBER (ADMIN)
router.post(
  "/:projectId/add-member",
  protectRoute,
  authorizeRoles("admin"),
  addMember
);

// 🔥 DASHBOARD
router.get(
  "/:projectId/dashboard",
  protectRoute,
  getProjectDashboard
);

export default router;