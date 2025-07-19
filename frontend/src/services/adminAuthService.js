import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// Create axios instance for admin API calls
const adminApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to include admin token
adminApiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("adminAuthToken") ||
      sessionStorage.getItem("adminAuthToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
adminApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminAuthToken");
      sessionStorage.removeItem("adminUser");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const adminAuthService = {
  // Admin login
  async login(credentials) {
    try {
      console.log("Admin login attempt:", credentials);

      const response = await adminApiClient.post("/admin/login", credentials);
      console.log("Login response:", response.data);

      // Backend returns: { success: true, data: { user, token }, message }
      const responseData = response.data;

      if (responseData.success) {
        const { user, token } = responseData.data;

        // Store in localStorage or sessionStorage based on rememberMe
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem("adminAuthToken", token);
        storage.setItem("adminUser", JSON.stringify(user));
        storage.setItem("adminEmail", user.email);

        console.log("Admin login successful:", {
          userId: user.id,
          email: user.email,
          role: user.role,
        });

        return {
          success: true,
          user,
          token,
          message: responseData.message || "Login successful",
        };
      } else {
        return {
          success: false,
          message: responseData.message || "Login failed",
          errors: responseData.errors || {},
        };
      }
    } catch (error) {
      console.error("Admin login error:", error);

      if (error.response?.data) {
        const errorData = error.response.data;
        return {
          success: false,
          message: errorData.message || "Login failed",
          errors: errorData.errors || {},
        };
      }

      return {
        success: false,
        message: "Network error. Please check your connection.",
        errors: {},
      };
    }
  },

  // Get admin profile
  async getProfile() {
    try {
      const response = await adminApiClient.get("/admin/profile");
      return {
        success: true,
        user: response.data.user,
      };
    } catch (error) {
      console.error("Get admin profile error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to get profile",
      };
    }
  },

  // Admin logout
  async logout() {
    try {
      await adminApiClient.post("/admin/logout");

      // Clear all storage
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminEmail");
      sessionStorage.removeItem("adminAuthToken");
      sessionStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminEmail");

      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error) {
      console.error("Admin logout error:", error);

      // Even if API call fails, clear local storage
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminEmail");
      sessionStorage.removeItem("adminAuthToken");
      sessionStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminEmail");

      return {
        success: true,
        message: "Logged out",
      };
    }
  },

  // Logout from all devices
  async logoutAll() {
    try {
      await adminApiClient.post("/admin/logout-all");

      // Clear all storage
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminEmail");
      sessionStorage.removeItem("adminAuthToken");
      sessionStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminEmail");

      return {
        success: true,
        message: "Logged out from all devices",
      };
    } catch (error) {
      console.error("Admin logout all error:", error);

      // Even if API call fails, clear local storage
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminEmail");
      sessionStorage.removeItem("adminAuthToken");
      sessionStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminEmail");

      return {
        success: true,
        message: "Logged out from all devices",
      };
    }
  },

  // Check if admin is authenticated
  isAuthenticated() {
    const token =
      localStorage.getItem("adminAuthToken") ||
      sessionStorage.getItem("adminAuthToken");
    const user =
      localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser");

    if (!token || !user) return false;

    try {
      const userData = JSON.parse(user);
      return userData.role === "admin" || userData.role === "super_admin";
    } catch (error) {
      console.error("Error parsing admin user data:", error);
      return false;
    }
  },

  // Get current admin user
  getCurrentUser() {
    const user =
      localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser");

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing admin user data:", error);
      return null;
    }
  },

  // Get admin token
  getToken() {
    return (
      localStorage.getItem("adminAuthToken") ||
      sessionStorage.getItem("adminAuthToken")
    );
  },

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      console.log("Making API call to /admin/dashboard/stats");
      const response = await adminApiClient.get("/admin/dashboard/stats");
      console.log("API response:", response.data);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Dashboard stats error:", error);
      console.error("Error response:", error.response?.data);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch dashboard stats",
      };
    }
  },
};

// Export the configured axios instance for other admin services
export { adminApiClient };

export default adminAuthService;
