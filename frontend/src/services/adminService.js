import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance for admin API calls
const adminApi = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
adminApi.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("adminAuthToken") ||
    sessionStorage.getItem("adminAuthToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminAuthToken");
      sessionStorage.removeItem("adminUser");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

const adminService = {
  // Dashboard methods
  getDashboardStats: async () => {
    try {
      const response = await adminApi.get("/admin/dashboard/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Transactions methods
  getTransactions: async (params = {}) => {
    try {
      const response = await adminApi.get("/admin/transactions", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  getTransaction: async (id) => {
    try {
      const response = await adminApi.get(`/admin/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw error;
    }
  },

  updateTransactionStatus: async (id, data) => {
    try {
      const response = await adminApi.patch(
        `/admin/transactions/${id}/status`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating transaction status:", error);
      throw error;
    }
  },

  // Users methods
  getUsers: async (params = {}) => {
    try {
      const response = await adminApi.get("/admin/users", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await adminApi.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await adminApi.post("/admin/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await adminApi.put(`/admin/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await adminApi.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Price list synchronization methods
  syncPrepaidPriceList: async () => {
    try {
      const response = await adminApi.post("/admin/digiflazz/sync-prepaid");
      return response.data;
    } catch (error) {
      console.error("Error syncing prepaid price list:", error);
      throw error;
    }
  },

  syncPostpaidPriceList: async () => {
    try {
      const response = await adminApi.post("/admin/digiflazz/sync-postpaid");
      return response.data;
    } catch (error) {
      console.error("Error syncing postpaid price list:", error);
      throw error;
    }
  },

  getPriceLists: async (params = {}) => {
    try {
      const response = await adminApi.get("/admin/digiflazz/price-lists", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching price lists:", error);
      throw error;
    }
  },
};

export default adminService;
