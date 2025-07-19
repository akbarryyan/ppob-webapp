// Laravel API configuration
const LARAVEL_API_BASE_URL = "http://localhost:8000/api";

// Get auth token from localStorage/sessionStorage
const getAuthToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Digiflazz API Service (through Laravel backend)
export const digiflazzService = {
  // Get prepaid price list
  getPrepaidPriceList: async (filters = {}) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Build query parameters
      const queryParams = new URLSearchParams(filters);
      const url = `${LARAVEL_API_BASE_URL}/digiflazz/prepaid-price-list${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: data.success,
        data: data.data || [],
        message: data.message,
      };
    } catch (error) {
      console.error("Error fetching prepaid price list:", error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  },

  // Get postpaid price list
  getPostpaidPriceList: async (filters = {}) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Build query parameters
      const queryParams = new URLSearchParams(filters);
      const url = `${LARAVEL_API_BASE_URL}/digiflazz/postpaid-price-list${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: data.success,
        data: data.data || [],
        message: data.message,
      };
    } catch (error) {
      console.error("Error fetching postpaid price list:", error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  },

  // Transform Digiflazz data to our format
  transformPrepaidData: (digiflazzData) => {
    // Debug logging
    console.log("transformPrepaidData received:", digiflazzData);
    console.log("Type:", typeof digiflazzData);
    console.log("Is array:", Array.isArray(digiflazzData));

    // Safety check: ensure we have an array
    if (!Array.isArray(digiflazzData)) {
      console.error(
        "transformPrepaidData: Expected array, got:",
        typeof digiflazzData
      );
      return [];
    }

    const groupedByBrand = {};

    digiflazzData.forEach((item) => {
      const brand = item.brand;

      if (!groupedByBrand[brand]) {
        groupedByBrand[brand] = {
          provider: brand,
          products: [],
        };
      }

      // Determine status based on both buyer and seller status
      let status = "unavailable";
      if (item.buyer_product_status && item.seller_product_status) {
        status = "available";
      } else if (!item.seller_product_status) {
        status = "maintenance";
      }

      groupedByBrand[brand].products.push({
        name: item.product_name,
        price: item.price,
        status: status,
        sku: item.buyer_sku_code,
        description: item.desc,
        category: item.category,
        type: item.type,
        stock: item.unlimited_stock ? "unlimited" : item.stock,
        multi: item.multi,
        cutOff: {
          start: item.start_cut_off,
          end: item.end_cut_off,
        },
      });
    });

    return Object.values(groupedByBrand);
  },

  // Transform postpaid data to our format
  transformPostpaidData: (digiflazzData) => {
    // Debug logging
    console.log("transformPostpaidData received:", digiflazzData);
    console.log("Type:", typeof digiflazzData);
    console.log("Is array:", Array.isArray(digiflazzData));

    // Safety check: ensure we have an array
    if (!Array.isArray(digiflazzData)) {
      console.error(
        "transformPostpaidData: Expected array, got:",
        typeof digiflazzData
      );
      return [];
    }

    const groupedByBrand = {};

    digiflazzData.forEach((item) => {
      const brand = item.brand;

      if (!groupedByBrand[brand]) {
        groupedByBrand[brand] = {
          provider: brand,
          products: [],
        };
      }

      // Determine status based on both buyer and seller status
      let status = "unavailable";
      if (item.buyer_product_status && item.seller_product_status) {
        status = "available";
      }

      groupedByBrand[brand].products.push({
        name: item.product_name,
        price: item.admin, // For postpaid, we show admin fee
        commission: item.commission,
        status: status,
        sku: item.buyer_sku_code,
        description: item.desc,
        category: item.category,
        type: "Pascabayar",
      });
    });

    return Object.values(groupedByBrand);
  },

  // Get categories from prepaid data
  getCategories: (digiflazzData) => {
    const categories = [...new Set(digiflazzData.map((item) => item.category))];
    return categories.sort();
  },

  // Get brands from prepaid data
  getBrands: (digiflazzData) => {
    const brands = [...new Set(digiflazzData.map((item) => item.brand))];
    return brands.sort();
  },

  // Filter data by category
  filterByCategory: (digiflazzData, category) => {
    return digiflazzData.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Filter data by brand
  filterByBrand: (digiflazzData, brand) => {
    return digiflazzData.filter(
      (item) => item.brand.toLowerCase() === brand.toLowerCase()
    );
  },
};

export default digiflazzService;
