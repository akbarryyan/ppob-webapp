import apiRequest from "./api.js";

// Authentication Service
export const authService = {
  // Register new user
  register: async (userData) => {
    return await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Get user profile
  getProfile: async () => {
    return await apiRequest("/auth/profile", {
      method: "GET",
    });
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await apiRequest("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  // Change password
  changePassword: async (passwordData) => {
    return await apiRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    });
  },

  // Logout
  logout: async () => {
    return await apiRequest("/auth/logout", {
      method: "POST",
    });
  },

  // Logout from all devices
  logoutAll: async () => {
    return await apiRequest("/auth/logout-all", {
      method: "POST",
    });
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return !!token;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  },

  // Store token
  setToken: (token, remember = false) => {
    if (remember) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }
  },

  // Remove token
  removeToken: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },

  // Get stored user data
  getUser: () => {
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  // Store user data
  setUser: (user, remember = false) => {
    const userString = JSON.stringify(user);
    if (remember) {
      localStorage.setItem("user", userString);
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", userString);
      localStorage.removeItem("user");
    }
  },

  // Remove user data
  removeUser: () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  },

  // Clear all auth data
  clearAuth: () => {
    authService.removeToken();
    authService.removeUser();
  },
};

export default authService;
