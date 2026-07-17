import api from "./api";

export const userService = {
  getAll: () => api.get("/users"),

  getProfile: () => api.get("/users/profile"),

  updateProfile: (data) => api.put("/users/profile", data),
  getNotificationSettings: () =>
  api.get("/users/notifications"),

updateNotificationSettings: (payload) =>
  api.put("/users/notifications", payload),
};