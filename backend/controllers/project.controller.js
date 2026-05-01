import Project from "../models/Project.js";
import Task from "../models/Task.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User already added" });
    }

    project.members.push(userId);
    await project.save();

    res.json({ message: "Member added", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 DASHBOARD (COUNTS)
export const getProjectDashboard = async (req, res) => {
  try {
    const { projectId } = req.params;

    const totalTasks = await Task.countDocuments({ project: projectId });
    const todo = await Task.countDocuments({
      project: projectId,
      status: "todo",
    });
    const inProgress = await Task.countDocuments({
      project: projectId,
      status: "in-progress",
    });
    const done = await Task.countDocuments({
      project: projectId,
      status: "done",
    });

    res.json({
      totalTasks,
      todo,
      inProgress,
      done,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};