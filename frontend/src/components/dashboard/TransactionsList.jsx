import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarSquareIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const TransactionsList = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // 'card' atau 'table'

  // Function to get auth token
  const getAuthToken = () => {
    // Check multiple possible token keys for debugging
    const tokenKeys = ["token", "authToken", "access_token", "bearerToken"];
    const storageTypes = [localStorage, sessionStorage];

    console.log("=== Token Debug Info ===");
    for (const storage of storageTypes) {
      const storageName =
        storage === localStorage ? "localStorage" : "sessionStorage";
      console.log(`${storageName} contents:`);
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        const value = storage.getItem(key);
        console.log(`  ${key}: ${value?.substring(0, 20)}...`);
      }
    }
    console.log("========================");

    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      console.log("Token found:", token ? "✓ Yes" : "✗ No"); // Debug log
      console.log("Token value:", token?.substring(0, 10) + "..."); // Debug log (first 10 chars)

      if (!token) {
        throw new Error("Authentication token not found");
      }

      console.log("Fetching transactions for user:", user?.name); // Debug log

      const response = await fetch("http://localhost:8000/api/transactions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response status:", response.status); // Debug log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response data:", data); // Debug log

      if (data.success) {
        // Transform API data to match our component structure
        const transformedTransactions = data.data.map((transaction) => ({
          id: transaction.transaction_code || transaction.id,
          type: transaction.product_name || transaction.type || "Unknown",
          amount: parseFloat(transaction.amount) || 0,
          status: transaction.status || "pending",
          date: new Date(transaction.created_at).toLocaleString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          target: transaction.target_number || transaction.customer_id || "N/A",
          description: transaction.message || "",
          fee: transaction.admin_fee || 0,
          total: transaction.total_amount || transaction.amount,
        }));

        console.log("Transformed transactions:", transformedTransactions); // Debug log
        setTransactions(transformedTransactions);
      } else {
        throw new Error(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setError(error.message);
      toast.error("Gagal memuat data transaksi");
    } finally {
      setLoading(false);
    }
  };

  // Load transactions on component mount
  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else {
      console.log("No user found, skipping transaction fetch");
    }
  }, [user]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      if (!event.target.closest(".dropdown-container")) {
        setIsFilterOpen(false);
        setIsTypeFilterOpen(false);
        setIsDateFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterOptions = [
    {
      value: "all",
      label: "Semua Status",
      count: transactions.length,
      color: "bg-gray-100",
    },
    {
      value: "success",
      label: "Berhasil",
      count: transactions.filter((t) => t.status === "success").length,
      color: "bg-emerald-100",
    },
    {
      value: "pending",
      label: "Pending",
      count: transactions.filter((t) => t.status === "pending").length,
      color: "bg-amber-100",
    },
    {
      value: "failed",
      label: "Gagal",
      count: transactions.filter((t) => t.status === "failed").length,
      color: "bg-red-100",
    },
  ];

  const typeOptions = [
    { value: "all", label: "Semua Jenis" },
    { value: "pulsa", label: "Pulsa" },
    { value: "token", label: "Token PLN" },
    { value: "topup", label: "Top Up" },
    { value: "paket", label: "Paket Data" },
    { value: "streaming", label: "Streaming" },
  ];

  const dateOptions = [
    { value: "all", label: "Semua Periode" },
    { value: "today", label: "Hari Ini" },
    { value: "week", label: "7 Hari Terakhir" },
    { value: "month", label: "30 Hari Terakhir" },
    { value: "custom", label: "Periode Kustom" },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    const matchesType =
      filterType === "all" ||
      transaction.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });

  // Statistics calculation
  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );
  const successCount = filteredTransactions.filter(
    (t) => t.status === "success"
  ).length;
  const pendingCount = filteredTransactions.filter(
    (t) => t.status === "pending"
  ).length;
  const failedCount = filteredTransactions.filter(
    (t) => t.status === "failed"
  ).length;
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-emerald-700 bg-emerald-50 border-emerald-200 ring-emerald-500/20";
      case "pending":
        return "text-amber-700 bg-amber-50 border-amber-200 ring-amber-500/20";
      case "failed":
        return "text-red-700 bg-red-50 border-red-200 ring-red-500/20";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200 ring-gray-500/20";
    }
  };

  const getStatusIconBg = (status) => {
    switch (status) {
      case "success":
        return "bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30";
      case "pending":
        return "bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30";
      case "failed":
        return "bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-500/30";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg shadow-gray-500/30";
    }
  };

  const getTransactionIcon = (type) => {
    if (type.toLowerCase().includes("pulsa")) return CreditCardIcon;
    if (type.toLowerCase().includes("token")) return BanknotesIcon;
    if (type.toLowerCase().includes("top up")) return BanknotesIcon;
    return CreditCardIcon;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return CheckCircleIcon;
      case "pending":
        return ClockIcon;
      case "failed":
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <ArrowPathIcon className="w-12 h-12 text-white animate-spin" />
              <p className="text-white/90 text-lg font-medium">
                Memuat data transaksi...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-red-600 via-pink-600 to-red-700 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <XCircleIcon className="w-16 h-16 text-white/90" />
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Gagal Memuat Data</h3>
              <p className="text-white/90 mb-6">{error}</p>
              <button
                onClick={fetchTransactions}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-colors border border-white/30"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Advanced Stats */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <ChartBarSquareIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    Riwayat Transaksi
                  </h2>
                  <p className="text-blue-100 text-sm lg:text-base">
                    Kelola dan pantau semua transaksi Anda dengan mudah
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 min-w-0 lg:min-w-max">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {filteredTransactions.length}
                </div>
                <div className="text-blue-100 text-xs lg:text-sm font-medium">
                  Total
                </div>
              </div>
              <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-emerald-300/30">
                <div className="text-2xl lg:text-3xl font-bold text-emerald-200">
                  {successCount}
                </div>
                <div className="text-emerald-100 text-xs lg:text-sm font-medium">
                  Berhasil
                </div>
              </div>
              <div className="bg-amber-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-amber-300/30">
                <div className="text-2xl lg:text-3xl font-bold text-amber-200">
                  {pendingCount}
                </div>
                <div className="text-amber-100 text-xs lg:text-sm font-medium">
                  Pending
                </div>
              </div>
              <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-red-300/30">
                <div className="text-2xl lg:text-3xl font-bold text-red-200">
                  {failedCount}
                </div>
                <div className="text-red-100 text-xs lg:text-sm font-medium">
                  Gagal
                </div>
              </div>
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SparklesIcon className="w-6 h-6 text-yellow-300" />
                <span className="text-blue-100 font-medium">Total Volume</span>
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-2xl font-bold text-white">
                  Rp {totalAmount.toLocaleString()}
                </div>
                <div className="text-blue-200 text-sm">
                  Dari {filteredTransactions.length} transaksi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Controls */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-200/50 relative z-50">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari berdasarkan ID transaksi, jenis layanan, atau nomor tujuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 text-sm lg:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-[100]">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Status Filter */}
              <div className="relative dropdown-container z-[200]">
                <button
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                    // Close other dropdowns
                    setIsTypeFilterOpen(false);
                    setIsDateFilterOpen(false);
                  }}
                  className="flex items-center justify-between w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 min-w-40 shadow-sm"
                >
                  <div className="flex items-center">
                    <FunnelIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-gray-700 font-medium">
                      {
                        filterOptions.find((f) => f.value === filterStatus)
                          ?.label
                      }
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isFilterOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-72 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-[99999] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilterStatus(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          filterStatus === option.value
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span
                          className={`text-sm px-2 py-1 rounded-full font-medium ${
                            option.color || "bg-gray-100"
                          } text-gray-700`}
                        >
                          {option.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Type Filter */}
              <div className="relative dropdown-container z-[200]">
                <button
                  onClick={() => {
                    setIsTypeFilterOpen(!isTypeFilterOpen);
                    // Close other dropdowns
                    setIsFilterOpen(false);
                    setIsDateFilterOpen(false);
                  }}
                  className="flex items-center justify-between w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 min-w-40 shadow-sm"
                >
                  <div className="flex items-center">
                    <CreditCardIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-gray-700 font-medium">
                      {typeOptions.find((t) => t.value === filterType)?.label}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isTypeFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isTypeFilterOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-[99999] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {typeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilterType(option.value);
                          setIsTypeFilterOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          filterType === option.value
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Filter */}
              <div className="relative dropdown-container z-[200]">
                <button
                  onClick={() => {
                    setIsDateFilterOpen(!isDateFilterOpen);
                    // Close other dropdowns
                    setIsFilterOpen(false);
                    setIsTypeFilterOpen(false);
                  }}
                  className="flex items-center justify-between w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 min-w-40 shadow-sm"
                >
                  <div className="flex items-center">
                    <CalendarDaysIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-gray-700 font-medium">
                      {dateOptions.find((d) => d.value === dateRange)?.label}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isDateFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDateFilterOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-[99999] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {dateOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setDateRange(option.value);
                          setIsDateFilterOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          dateRange === option.value
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "card"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Table
                </button>
              </div>

              <button className="flex items-center px-4 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300 shadow-sm">
                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline font-medium">Filter</span>
              </button>
              <button className="flex items-center px-4 py-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 border border-green-200 hover:border-green-300 shadow-sm">
                <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Transactions List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl">
        <div className="p-4 sm:p-6 border-b border-gray-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Daftar Transaksi
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Menampilkan {filteredTransactions.length} dari{" "}
                {transactions.length} transaksi
              </p>
            </div>
            {filteredTransactions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                  Urut berdasarkan:
                </span>
                <select className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 sm:px-3 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto">
                  <option>Tanggal Terbaru</option>
                  <option>Tanggal Terlama</option>
                  <option>Jumlah Terbesar</option>
                  <option>Jumlah Terkecil</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #1e40af);
          }
        `}</style>

        <div className="max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <MagnifyingGlassIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Tidak ada transaksi ditemukan
              </h3>
              <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
                Coba ubah kata kunci pencarian atau filter yang dipilih untuk
                menemukan transaksi yang Anda cari
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setFilterType("all");
                  setDateRange("all");
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div
              className={viewMode === "card" ? "divide-y divide-gray-100" : ""}
            >
              {viewMode === "card" ? (
                // Card View
                filteredTransactions.map((transaction, index) => {
                  const StatusIcon = getStatusIcon(transaction.status);
                  const TransactionIcon = getTransactionIcon(transaction.type);
                  return (
                    <div
                      key={index}
                      className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 group cursor-pointer"
                    >
                      {/* Desktop Card Layout */}
                      <div className="hidden lg:flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="relative">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getStatusIconBg(
                                transaction.status
                              )}`}
                            >
                              <StatusIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                              <TransactionIcon className="w-3 h-3 text-gray-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                                {transaction.type}
                              </h4>
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ring-1 ${getStatusColor(
                                  transaction.status
                                )}`}
                              >
                                {transaction.status === "success"
                                  ? "✓ Berhasil"
                                  : transaction.status === "pending"
                                  ? "⏳ Pending"
                                  : "✗ Gagal"}
                              </div>
                            </div>
                            <div className="text-gray-600 font-medium mb-1">
                              Target: {transaction.target}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarDaysIcon className="w-4 h-4 mr-2" />
                              {transaction.date}
                              <span className="mx-3">•</span>
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {transaction.id}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${
                                transaction.amount > 0
                                  ? "text-emerald-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}Rp{" "}
                              {Math.abs(transaction.amount).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.amount > 0 ? "Masuk" : "Keluar"}
                            </div>
                          </div>

                          <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Enhanced Mobile Card Layout */}
                      <div className="lg:hidden">
                        <div className="flex items-start space-x-3">
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${getStatusIconBg(
                                transaction.status
                              )}`}
                            >
                              <StatusIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                              <TransactionIcon className="w-2 h-2 text-gray-600" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 space-y-3">
                            {/* Header Row */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0 pr-3">
                                <h4 className="font-bold text-gray-900 text-sm leading-tight truncate">
                                  {transaction.type}
                                </h4>
                                <p className="text-gray-600 text-xs mt-0.5 truncate">
                                  {transaction.target}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div
                                  className={`font-bold text-base leading-tight ${
                                    transaction.amount > 0
                                      ? "text-emerald-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {transaction.amount > 0 ? "+" : ""}Rp{" "}
                                  {Math.abs(
                                    transaction.amount
                                  ).toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {transaction.amount > 0 ? "Masuk" : "Keluar"}
                                </div>
                              </div>
                            </div>

                            {/* Status and ID Row */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                    transaction.status
                                  )}`}
                                >
                                  {transaction.status === "success"
                                    ? "✓"
                                    : transaction.status === "pending"
                                    ? "⏳"
                                    : "✗"}
                                  <span className="ml-1 hidden sm:inline">
                                    {transaction.status === "success"
                                      ? "Berhasil"
                                      : transaction.status === "pending"
                                      ? "Pending"
                                      : "Gagal"}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 font-mono bg-gray-50 px-1.5 py-0.5 rounded">
                                  {transaction.id}
                                </span>
                              </div>
                              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Date Row */}
                            <div className="flex items-center text-xs text-gray-500">
                              <CalendarDaysIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                              <span className="truncate">
                                {transaction.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Enhanced Table View with Mobile Responsiveness
                <div className="p-3 sm:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                            Transaksi
                          </th>
                          <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm hidden sm:table-cell">
                            Target
                          </th>
                          <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm hidden md:table-cell">
                            Tanggal
                          </th>
                          <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                            Jumlah
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                            Status
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm hidden sm:table-cell">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction, index) => {
                          const StatusIcon = getStatusIcon(transaction.status);
                          return (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-3 sm:py-4 px-2 sm:px-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <div
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${getStatusIconBg(
                                      transaction.status
                                    )}`}
                                  >
                                    <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                                      {transaction.type}
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono truncate">
                                      {transaction.id}
                                    </div>
                                    {/* Show target on mobile */}
                                    <div className="text-xs text-gray-600 truncate sm:hidden mt-0.5">
                                      {transaction.target}
                                    </div>
                                    {/* Show date on mobile */}
                                    <div className="text-xs text-gray-500 truncate md:hidden mt-0.5">
                                      {transaction.date}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                                <div className="truncate max-w-32">
                                  {transaction.target}
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden md:table-cell">
                                {transaction.date}
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-right">
                                <span
                                  className={`font-bold text-xs sm:text-sm ${
                                    transaction.amount > 0
                                      ? "text-emerald-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {transaction.amount > 0 ? "+" : ""}Rp{" "}
                                  {Math.abs(
                                    transaction.amount
                                  ).toLocaleString()}
                                </span>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                                <div
                                  className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                    transaction.status
                                  )}`}
                                >
                                  {transaction.status === "success"
                                    ? "✓"
                                    : transaction.status === "pending"
                                    ? "⏳"
                                    : "✗"}
                                  <span className="ml-1 hidden sm:inline">
                                    {transaction.status === "success"
                                      ? "Berhasil"
                                      : transaction.status === "pending"
                                      ? "Pending"
                                      : "Gagal"}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center hidden sm:table-cell">
                                <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                  <EyeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Footer with pagination info */}
        {filteredTransactions.length > 0 && (
          <div className="p-4 sm:p-6 bg-gray-50/50 border-t border-gray-200/50 rounded-b-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs sm:text-sm text-gray-600">
                Menampilkan{" "}
                <span className="font-semibold">
                  {filteredTransactions.length}
                </span>{" "}
                transaksi
                {searchTerm && <span> untuk "{searchTerm}"</span>}
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Sebelumnya
                </button>
                <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Load More Section - Mobile Optimized */}
      {filteredTransactions.length > 10 && (
        <div className="text-center px-4">
          <div className="inline-flex flex-col items-center space-y-3 sm:space-y-4 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/50 max-w-md mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <ChartBarSquareIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                Ada Lebih Banyak Transaksi
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 max-w-xs sm:max-w-md px-2">
                Muat lebih banyak transaksi untuk melihat riwayat lengkap
                aktivitas akun Anda
              </p>
            </div>
            <div className="flex flex-col w-full sm:flex-row gap-2 sm:gap-3">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                Muat Lebih Banyak
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-bold rounded-lg sm:rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base">
                Export Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
