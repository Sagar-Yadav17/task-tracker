import Task from "../models/Task.js";
import User from "../models/user.js";

// ✅ CREATE TASK (EMAIL → OBJECTID)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    // 🔥 email se user find karo
    const user = await User.findOne({ email: assignedTo });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo: user._id, // ✅ ObjectId save
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET TASKS (ROLE BASED)
export const getTasks = async (req, res) => {
  try {
    const { projectId, status } = req.query;

    let filter = {};

    if (projectId) filter.project = projectId;
    if (status) filter.status = status;

    // 🔥 ROLE BASED FILTER
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user._id;
    }

    const tasks = await Task.find(filter).populate("assignedTo", "email name");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE TASK STATUS (SECURE)
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 SECURITY CHECK
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Status updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE TASK (SECURE)
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE TASK (EMAIL → OBJECTID)
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 SECURITY CHECK
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.title = title || task.title;
    task.description = description || task.description;

    // 🔥 email → ObjectId (only admin)
    if (assignedTo && req.user.role === "admin") {
      const user = await User.findOne({ email: assignedTo });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      task.assignedTo = user._id;
    }

    await task.save();

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};