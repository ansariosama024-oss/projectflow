import api from "./api";

export const teamService = {
  getAll: () => api.get("/team"),

  getById: (id) => api.get(`/team/${id}`),

  create: (payload) => api.post("/team", payload),

  update: (id, payload) => api.put(`/team/${id}`, payload),

  delete: (id) => api.delete(`/team/${id}`),
};