import { STORAGE_KEYS } from '../constants';

const storageFor = (remember) =>
  remember ? localStorage : sessionStorage;

export const getToken = () =>
  localStorage.getItem(STORAGE_KEYS.TOKEN) ||
  sessionStorage.getItem(STORAGE_KEYS.TOKEN);

export const setToken = (token, remember = true) =>
  storageFor(remember).setItem(STORAGE_KEYS.TOKEN, token);

export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const getUser = () => {
  const raw =
    localStorage.getItem(STORAGE_KEYS.USER) ||
    sessionStorage.getItem(STORAGE_KEYS.USER);
  return raw ? JSON.parse(raw) : null;
};

export const setUser = (user, remember = true) =>
  storageFor(remember).setItem(STORAGE_KEYS.USER, JSON.stringify(user));

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  sessionStorage.removeItem(STORAGE_KEYS.USER);
};

export const clearAuth = () => {
  removeToken();
  removeUser();
};

export const getRemember = () =>
  localStorage.getItem(STORAGE_KEYS.REMEMBER) === 'true';

export const setRemember = (value) =>
  localStorage.setItem(STORAGE_KEYS.REMEMBER, String(value));

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const getInitials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const cn = (...classes) => classes.filter(Boolean).join(' ');
