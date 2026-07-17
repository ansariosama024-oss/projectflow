import User from "../models/User.js";
import { asyncHandler } from "../utils/errorHandler.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "name email");

  res.json({
    success: true,
    data: users,
  });
});
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  res.json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});
export const getNotificationSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "notificationSettings"
  );

  res.json({
    success: true,
    data: user.notificationSettings,
  });
});

export const updateNotificationSettings = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);

  const user = await User.findById(req.user._id);

  user.notificationSettings = req.body;

  await user.save();

  console.log("SAVED:", user.notificationSettings);

  res.json({
    success: true,
    data: user.notificationSettings,
  });
});