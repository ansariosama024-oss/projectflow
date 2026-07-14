export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const APP_NAME = 'ProjectFlow';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  TASKS: '/tasks',
  TEAM: '/team',
  CALENDAR: '/calendar',
  REPORTS: '/reports',
  SETTINGS: '/settings',
};

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const TASK_STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', color: 'neutral' },
  { value: 'in-progress', label: 'In Progress', color: 'blue' },
  { value: 'review', label: 'In Review', color: 'amber' },
  { value: 'done', label: 'Done', color: 'green' },
];

export const TASK_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'neutral' },
  { value: 'medium', label: 'Medium', color: 'blue' },
  { value: 'high', label: 'High', color: 'amber' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
];

export const PROJECT_STATUS_OPTIONS = [
  { value: 'planning', label: 'Planning', color: 'neutral' },
  { value: 'active', label: 'Active', color: 'blue' },
  { value: 'on-hold', label: 'On Hold', color: 'amber' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
];

export const PROJECT_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'neutral' },
  { value: 'medium', label: 'Medium', color: 'blue' },
  { value: 'high', label: 'High', color: 'amber' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
];

export const PROJECT_CATEGORY_OPTIONS = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'research', label: 'Research' },
  { value: 'internal', label: 'Internal' },
  { value: 'other', label: 'Other' },
];

export const STORAGE_KEYS = {
  TOKEN: 'pf_token',
  USER: 'pf_user',
  REMEMBER: 'pf_remember',
  THEME: 'pf_theme',
};
