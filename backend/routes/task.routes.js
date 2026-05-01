import express from "express";
import {
  createTask,
  updateTaskStatus,
  getTasks,
  deleteTask,
  updateTask
} from "../controllers/task.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE
router.post("/", protectRoute, createTask);

// GET ALL
router.get("/", protectRoute, getTasks);

// UPDATE STATUS
router.put("/:taskId/status", protectRoute, updateTaskStatus);

// 🔥 EDIT TASK
router.put("/:taskId", protectRoute, updateTask);

// 🔥 DELETE TASK
router.delete("/:taskId", protectRoute, deleteTask);

export default router;