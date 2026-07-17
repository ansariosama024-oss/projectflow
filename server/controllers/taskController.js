import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/errorHandler.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    project,
    assignedTo,
    status,
    priority,
    dueDate,
  } = req.body;

 const projectExists = await Project.findOne({
  _id: project,
  createdBy: req.user._id,
});

  if (!projectExists) {
    throw new AppError("Project not found", 404);
  }

  const task = await Task.create({
    title,
    description,
    project,
    assignedTo,
    status,
    priority,
    dueDate,
    createdBy: req.user._id,
  });

  await task.populate("project", "name");
  await task.populate("assignedTo", "name email");
  await task.populate("createdBy", "name");

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

// Get All Tasks
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    createdBy: req.user._id,
  })
    .populate("project", "name")
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: tasks,
  });
});

// Get Single Task
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate("project", "name")
    .populate("assignedTo", "name email");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  res.json({
    success: true,
    data: task,
  });
});

// Update Task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.createdBy.toString() !== req.user._id.toString()) {
  throw new AppError("Not authorized to update this task", 403);
}

const allowedFields = [
  "title",
  "description",
  "project",
  "assignedTo",
  "status",
  "priority",
  "dueDate",
];

allowedFields.forEach((field) => {
  if (field in req.body) {
    task[field] = req.body[field];
  }
});
  await task.save();
  await task.populate("project", "name");
await task.populate("assignedTo", "name email");
await task.populate("createdBy", "name");

  res.json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.createdBy.toString() !== req.user._id.toString()) {
  throw new AppError("Not authorized to delete this task", 403);
}

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await task.deleteOne();

  res.json({
    success: true,
    message: "Task deleted successfully",
  });
});