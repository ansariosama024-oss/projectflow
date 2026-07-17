import Team from "../models/Team.js";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/errorHandler.js";

// Create Team Member
export const createMember = asyncHandler(async (req, res) => {
  const { user, role, department, status } = req.body;

  const userExists = await User.findById(user);

  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  const member = await Team.create({
    user,
    role,
    department,
    status,
    createdBy: req.user._id,
  });

  await member.populate("user", "name email");

  res.status(201).json({
    success: true,
    message: "Team member added successfully",
    data: member,
  });
});

// Get All Members
export const getMembers = asyncHandler(async (req, res) => {
  const members = await Team.find({
    createdBy: req.user._id,
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: members,
  });
});

// Get Member By Id
export const getMemberById = asyncHandler(async (req, res) => {
  const member = await Team.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!member) {
    throw new AppError("Member not found", 404);
  }

  if (member.createdBy.toString() !== req.user._id.toString()) {
  throw new AppError("Not authorized to access this member", 403);
}

  res.json({
    success: true,
    data: member,
  });
});

// Update Member
export const updateMember = asyncHandler(async (req, res) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    throw new AppError("Member not found", 404);
  }

  if (member.createdBy.toString() !== req.user._id.toString()) {
  throw new AppError("Not authorized to update this member", 403);
}

  const allowedFields = [
  "user",
  "role",
  "department",
  "status",
];

allowedFields.forEach((field) => {
  if (field in req.body) {
    member[field] = req.body[field];
  }
});
  await member.save();

  await member.populate("user", "name email");

  res.json({
    success: true,
    message: "Member updated successfully",
    data: member,
  });
});

// Delete Member
export const deleteMember = asyncHandler(async (req, res) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    throw new AppError("Member not found", 404);
  }

  if (member.createdBy.toString() !== req.user._id.toString()) {
  throw new AppError("Not authorized to delete this member", 403);
}

  await member.deleteOne();

  res.json({
    success: true,
    message: "Member deleted successfully",
  });
});