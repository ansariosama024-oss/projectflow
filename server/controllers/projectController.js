import Project from '../models/Project.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/errorHandler.js';

export const createProject = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    status,
    priority,
    startDate,
    deadline,
    progress,
    teamMembers,
  } = req.body;

  const project = await Project.create({
    name,
    description,
    category,
    status,
    priority,
    startDate,
    deadline,
    progress,
    teamMembers,
    createdBy: req.user._id,
  });

  await project.populate('teamMembers', 'name email avatar');
  await project.populate('createdBy', 'name email');

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

export const getProjects = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    priority,
    sort,
  } = req.query;

  const query = { createdBy: req.user._id };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) query.status = status;
  if (priority) query.priority = priority;

  const skip = (Number(page) - 1) * Number(limit);

  let sortOption = { createdAt: -1 };
  if (sort === 'deadline-asc') sortOption = { deadline: 1 };
  if (sort === 'deadline-desc') sortOption = { deadline: -1 };
  if (sort === 'name-asc') sortOption = { name: 1 };
  if (sort === 'name-desc') sortOption = { name: -1 };
  if (sort === 'created-desc') sortOption = { createdAt: -1 };
  if (sort === 'created-asc') sortOption = { createdAt: 1 };

  const [projects, total] = await Promise.all([
    Project.find(query)
      .populate('teamMembers', 'name email avatar')
      .populate('createdBy', 'name email')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    Project.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: projects,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('teamMembers', 'name email avatar')
    .populate('createdBy', 'name email');

  if (!project) throw new AppError('Project not found', 404);

  if (project.createdBy._id.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to access this project', 403);
  }

  res.json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) throw new AppError('Project not found', 404);

  if (project.createdBy.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to update this project', 403);
  }

  const updates = req.body;
  Object.keys(updates).forEach((key) => {
    project[key] = updates[key];
  });

  await project.save();
  await project.populate('teamMembers', 'name email avatar');
  await project.populate('createdBy', 'name email');

  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) throw new AppError('Project not found', 404);

  if (project.createdBy.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to delete this project', 403);
  }

  await project.deleteOne();

  res.json({ success: true, message: 'Project deleted successfully' });
});

export const getProjectStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [stats] = await Project.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] },
        },
        completed: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
        },
        planning: {
          $sum: { $cond: [{ $eq: ['$status', 'planning'] }, 1, 0] },
        },
        onHold: {
          $sum: { $cond: [{ $eq: ['$status', 'on-hold'] }, 1, 0] },
        },
        avgProgress: { $avg: '$progress' },
      },
    },
  ]);

  const result = stats || {
    total: 0,
    active: 0,
    completed: 0,
    planning: 0,
    onHold: 0,
    avgProgress: 0,
  };

  res.json({ success: true, data: result });
});
