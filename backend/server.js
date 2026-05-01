import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

import { protectRoute } from "./middleware/auth.middleware.js";
import { authorizeRoles } from "./middleware/role.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


app.use("/api/users", userRoutes);

// test routes
app.get("/api/protected", protectRoute, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

app.get("/api/admin", protectRoute, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});