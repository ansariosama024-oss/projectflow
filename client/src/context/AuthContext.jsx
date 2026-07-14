import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';
import {
  getToken,
  setToken,
  clearAuth,
  getUser,
  setUser,
  getRemember,
  setRemember,
} from '../utils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(Boolean(token));

  // On mount, if we have a token, fetch the latest profile to keep it in sync
  useEffect(() => {
    if (!token) {
      setInitializing(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await authService.getProfile();
        if (!cancelled) {
          setUserState(data.data.user);
          setUser(data.data.user, getRemember());
        }
      } catch {
        // Token is invalid — clear auth state
        if (!cancelled) {
          clearAuth();
          setUserState(null);
          setTokenState(null);
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (credentials, remember = true) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      setRemember(remember);
      setToken(data.data.token, remember);
      setUser(data.data.user, remember);
      setUserState(data.data.user);
      setTokenState(data.data.token);
      return data.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      setRemember(true);
      setToken(data.data.token, true);
      setUser(data.data.user, true);
      setUserState(data.data.user);
      setTokenState(data.data.token);
      return data.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUserState(null);
    setTokenState(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    initializing,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
