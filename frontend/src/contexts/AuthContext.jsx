import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = authService.getToken();
      const storedUser = authService.getUser();

      if (token && storedUser) {
        // Verify token with backend
        const response = await authService.getProfile();
        if (response.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear auth data
          authService.clearAuth();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      authService.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success) {
      setUser(response.data.user);
      setIsAuthenticated(true);
      authService.setToken(response.data.token);
      authService.setUser(response.data.user);
    }
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response.success) {
      setUser(response.data.user);
      setIsAuthenticated(true);
      authService.setToken(response.data.token);
      authService.setUser(response.data.user);
    }
    return response;
  };

  const logout = async () => {
    try {
      // Call logout API
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Clear local state regardless of API response
      authService.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    authService.setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
