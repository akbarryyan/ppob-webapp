import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance for public API calls
const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

const settingsService = {
  // Get general settings (public, no auth needed)
  getPublicSettings: async () => {
    try {
      const response = await publicApi.get("/public/settings/general");
      return response.data;
    } catch (error) {
      console.error("Error fetching public settings:", error);
      return {
        success: false,
        data: {
          siteName: "Bayaraja",
          siteDescription: "Rajanya Pembayaran Digital",
        },
      };
    }
  },
};

export default settingsService;
