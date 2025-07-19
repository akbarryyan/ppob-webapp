import React, { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  Square3Stack3DIcon,
  TagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import "../../styles/scrollbar.css";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProductType, setFilterProductType] = useState("all"); // New filter
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("adminAuthToken") ||
        sessionStorage.getItem("adminAuthToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Fetch both prepaid and postpaid products
      const [prepaidResponse, postpaidResponse] = await Promise.all([
        fetch("http://localhost:8000/api/digiflazz/prepaid-price-list", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
        fetch("http://localhost:8000/api/digiflazz/postpaid-price-list", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
      ]);

      if (!prepaidResponse.ok) {
        throw new Error(`Prepaid API error! status: ${prepaidResponse.status}`);
      }

      if (!postpaidResponse.ok) {
        throw new Error(
          `Postpaid API error! status: ${postpaidResponse.status}`
        );
      }

      const [prepaidData, postpaidData] = await Promise.all([
        prepaidResponse.json(),
        postpaidResponse.json(),
      ]);

      const allProducts = [];

      // Transform prepaid data
      if (prepaidData.success && prepaidData.data) {
        const transformedPrepaid = prepaidData.data.map((item) => ({
          id: `prepaid_${item.id}`,
          name: item.product_name,
          category: item.category || "Unknown",
          provider: item.brand || "Unknown",
          price: parseInt(item.price) || 0,
          cost:
            parseInt(item.original_price) ||
            Math.floor(parseInt(item.price) * 0.95) ||
            0,
          profit:
            (parseInt(item.price) || 0) -
            (parseInt(item.original_price) ||
              Math.floor(parseInt(item.price) * 0.95) ||
              0),
          status:
            item.buyer_product_status && item.seller_product_status
              ? "active"
              : "inactive",
          stock: item.unlimited_stock ? 999 : item.stock || 0,
          sold: Math.floor(Math.random() * 100), // Random sold count for demo
          createdAt: item.created_at
            ? new Date(item.created_at).toLocaleDateString()
            : "Unknown",
          description: item.desc || "No description available",
          buyer_sku_code: item.buyer_sku_code,
          type: item.type,
          multi: item.multi,
          last_updated: item.last_updated,
          product_type: "prepaid", // Add product type
          commission: item.commission || 0,
        }));
        allProducts.push(...transformedPrepaid);
      }

      // Transform postpaid data
      if (postpaidData.success && postpaidData.data) {
        const transformedPostpaid = postpaidData.data.map((item) => ({
          id: `postpaid_${item.id}`,
          name: item.product_name,
          category: item.category || "Unknown",
          provider: item.brand || "Unknown",
          price:
            parseInt(item.price) ||
            parseInt(item.admin_fee) ||
            parseInt(item.admin) ||
            0,
          cost: parseInt(item.original_price) || parseInt(item.admin) || 0,
          profit:
            (parseInt(item.price) || parseInt(item.admin_fee) || 0) -
            (parseInt(item.original_price) || parseInt(item.admin) || 0),
          status:
            item.buyer_product_status && item.seller_product_status
              ? "active"
              : "inactive",
          stock: 999, // Postpaid usually unlimited
          sold: Math.floor(Math.random() * 50), // Random sold count for demo (lower for postpaid)
          createdAt: item.created_at
            ? new Date(item.created_at).toLocaleDateString()
            : "Unknown",
          description: item.desc || "No description available",
          buyer_sku_code: item.buyer_sku_code,
          type: "postpaid",
          seller_name: item.seller_name,
          last_updated: item.last_updated,
          product_type: "postpaid", // Add product type
          admin_fee: parseInt(item.admin_fee) || parseInt(item.admin) || 0,
          commission: item.commission || 0,
        }));
        allProducts.push(...transformedPostpaid);
      }

      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
  };

  const formatCurrency = (amount) => {
    // For mobile, show shorter format
    if (window.innerWidth < 640) {
      if (amount >= 1000000) {
        return `Rp ${(amount / 1000000).toFixed(1)}M`;
      } else if (amount >= 1000) {
        return `Rp ${(amount / 1000).toFixed(0)}K`;
      }
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || product.status === filterStatus;
    const matchesProductType =
      filterProductType === "all" || product.product_type === filterProductType;

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesProductType
    );
  });

  // Get unique categories from products for filter dropdown
  const uniqueCategories = [
    ...new Set(
      products.map((p) => p.category).filter((c) => c && c !== "Unknown")
    ),
  ];

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <svg
              className="animate-spin h-6 w-6 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-600 font-medium">
              Loading products...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-medium mb-2">
              Error loading products
            </p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const ProductModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Square3Stack3DIcon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h4>
              <p className="text-gray-600 mb-2">{product.provider}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.buyer_sku_code && (
                <p className="text-sm text-gray-500 mb-2">
                  SKU: {product.buyer_sku_code}
                </p>
              )}
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    statusColors[product.status]
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() +
                    product.status.slice(1)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    product.product_type === "prepaid"
                      ? "bg-purple-100 text-purple-800 border-purple-200"
                      : "bg-orange-100 text-orange-800 border-orange-200"
                  }`}
                >
                  {product.product_type === "prepaid" ? "Prepaid" : "Postpaid"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-blue-100 text-blue-800 border-blue-200">
                  {product.category}
                </span>
                {product.type && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-gray-800 border-gray-200">
                    {product.type}
                  </span>
                )}
                {product.seller_name && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-indigo-100 text-indigo-800 border-indigo-200">
                    {product.seller_name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {product.product_type === "postpaid"
                    ? "Admin Fee"
                    : "Selling Price"}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {product.product_type === "postpaid"
                    ? "Base Admin"
                    : "Cost Price"}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(product.cost)}
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm font-medium text-green-600 mb-1">
                  {product.product_type === "postpaid"
                    ? "Markup per Transaction"
                    : "Profit per Sale"}
                </p>
                <p className="text-xl font-bold text-green-900">
                  {formatCurrency(product.profit)}
                </p>
              </div>
              {product.product_type === "postpaid" &&
                product.commission > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-medium text-blue-600 mb-1">
                      Commission
                    </p>
                    <p className="text-xl font-bold text-blue-900">
                      {formatCurrency(product.commission)}
                    </p>
                  </div>
                )}
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">Stock</p>
                <p className="text-xl font-bold text-gray-900">
                  {product.product_type === "postpaid"
                    ? "∞ (Unlimited)"
                    : product.stock}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {product.product_type === "postpaid"
                    ? "Transactions"
                    : "Total Sold"}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {product.sold}
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm font-medium text-blue-600 mb-1">
                  Total Revenue
                </p>
                <p className="text-xl font-bold text-blue-900">
                  {formatCurrency(product.sold * product.price)}
                </p>
              </div>
              {product.last_updated && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm text-gray-900">
                    {new Date(product.last_updated).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Edit Product
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              View Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog from Digiflazz API (
            {products.filter((p) => p.product_type === "prepaid").length}{" "}
            prepaid,{" "}
            {products.filter((p) => p.product_type === "postpaid").length}{" "}
            postpaid products loaded)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh Data</span>
          </button>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
            <PlusIcon className="w-5 h-5" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                Total Products
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {products.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {products.filter((p) => p.product_type === "prepaid").length}{" "}
                prepaid,{" "}
                {products.filter((p) => p.product_type === "postpaid").length}{" "}
                postpaid
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Square3Stack3DIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                Active Products
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {products.filter((p) => p.status === "active").length}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                Total Sales
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {products.reduce((sum, p) => sum + p.sold, 0)}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <TagIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                Total Revenue
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {formatCurrency(
                  products.reduce((sum, p) => sum + p.sold * p.price, 0)
                )}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <CurrencyDollarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <select
              value={filterProductType}
              onChange={(e) => setFilterProductType(e.target.value)}
              className="px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm min-w-0 sm:min-w-[140px]"
            >
              <option value="all">All Types</option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm min-w-0 sm:min-w-[160px]"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm min-w-0 sm:min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Table Info Header */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50/50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold">{filteredProducts.length}</span>{" "}
              product{filteredProducts.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterProductType !== "all" && ` (${filterProductType})`}
              {filterCategory !== "all" && ` in ${filterCategory}`}
              {filterStatus !== "all" && ` with ${filterStatus} status`}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="hidden sm:flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Scroll to view more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="p-4 max-h-[70vh] overflow-y-auto table-scroll">
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Product Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Square3Stack3DIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {product.provider}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                        statusColors[product.status]
                      } flex-shrink-0`}
                    >
                      {product.status.charAt(0).toUpperCase() +
                        product.status.slice(1)}
                    </span>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Type</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-medium border mt-1 ${
                          product.product_type === "prepaid"
                            ? "bg-purple-100 text-purple-800 border-purple-200"
                            : "bg-orange-100 text-orange-800 border-orange-200"
                        }`}
                      >
                        {product.product_type === "prepaid"
                          ? "Prepaid"
                          : "Postpaid"}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Category</p>
                      <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 mt-1">
                        {product.category}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Price</p>
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Stock</p>
                      <p
                        className={`font-semibold ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.product_type === "postpaid"
                          ? "∞"
                          : product.stock}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductModal(true);
                      }}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh] table-scroll">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[250px]">
                    Product
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[100px]">
                    Type
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                    Category
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                    Price
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[80px]">
                    Stock
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[80px]">
                    Sold
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[100px]">
                    Status
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 xl:px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Square3Stack3DIcon className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs xl:text-sm font-semibold text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {product.provider}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span
                        className={`px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                          product.product_type === "prepaid"
                            ? "bg-purple-100 text-purple-800 border-purple-200"
                            : "bg-orange-100 text-orange-800 border-orange-200"
                        }`}
                      >
                        {product.product_type === "prepaid"
                          ? "Prepaid"
                          : "Postpaid"}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span className="px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border bg-blue-100 text-blue-800 border-blue-200 whitespace-nowrap">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {formatCurrency(product.price)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span
                        className={`text-xs xl:text-sm font-semibold whitespace-nowrap ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.product_type === "postpaid"
                          ? "∞"
                          : product.stock}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {product.sold}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span
                        className={`px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                          statusColors[product.status]
                        }`}
                      >
                        {product.status.charAt(0).toUpperCase() +
                          product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <div className="flex items-center space-x-1 xl:space-x-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductModal(true);
                          }}
                          className="p-1.5 xl:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                        <button className="p-1.5 xl:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <PencilIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                        <button className="p-1.5 xl:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <TrashIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Square3Stack3DIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No products found
            </p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
