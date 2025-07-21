import React, { useState, useEffect } from "react";
import {
  CreditCardIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import adminService from "../../services/adminService";
import "../../styles/scrollbar.css";

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Add state for API data
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 100, // Default to 100 transactions per page
    total: 0,
    last_page: 1,
  });

  // Add state for overall stats
  const [stats, setStats] = useState({
    total_transactions: 0,
    total_value: 0,
    success_rate: 0,
    success_count: 0,
    pending_count: 0,
    failed_count: 0,
  });

  // Add debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTransactions(true); // Pass true to indicate this is a search/filter operation
      fetchStats(); // Also fetch stats when search changes
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Separate effect for other filters (no debounce needed)
  useEffect(() => {
    fetchTransactions(true); // Pass true to indicate this is a filter operation
    fetchStats(); // Also fetch stats when filters change
  }, [
    filterStatus,
    filterType,
    filterDateRange,
    pagination.current_page,
    pagination.per_page,
  ]);

  // Initial load effect
  useEffect(() => {
    fetchTransactions(false); // Pass false for initial load
    fetchStats();
  }, []); // Empty dependency array for initial load only

  const fetchTransactions = async (isFilter = false) => {
    try {
      // Use different loading states for initial load vs filter/search
      if (isFilter) {
        setTransactionsLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
      };

      if (searchTerm) params.search = searchTerm;
      if (filterStatus !== "all") params.status = filterStatus;
      if (filterType !== "all") params.type = filterType;

      // Add date range filter
      if (filterDateRange !== "all") {
        const now = new Date();
        let dateFrom;

        switch (filterDateRange) {
          case "today":
            dateFrom = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            break;
          case "week":
            dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "month":
            dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          default:
            dateFrom = null;
        }

        if (dateFrom) {
          params.date_from = dateFrom.toISOString().split("T")[0];
          params.date_to = now.toISOString().split("T")[0];
        }
      }

      const response = await adminService.getTransactions(params);

      if (response.success) {
        setTransactions(response.data.data);
        setPagination({
          current_page: response.data.current_page,
          per_page: response.data.per_page,
          total: response.data.total,
          last_page: response.data.last_page,
        });
      } else {
        setError(response.message || "Failed to fetch transactions");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching transactions");
      console.error("Error fetching transactions:", err);
    } finally {
      // Reset the appropriate loading state
      if (isFilter) {
        setTransactionsLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchStats = async () => {
    try {
      const params = {};

      if (searchTerm) params.search = searchTerm;
      if (filterStatus !== "all") params.status = filterStatus;
      if (filterType !== "all") params.type = filterType;

      // Add date range filter
      if (filterDateRange !== "all") {
        const now = new Date();
        let dateFrom;

        switch (filterDateRange) {
          case "today":
            dateFrom = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            break;
          case "week":
            dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "month":
            dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          default:
            dateFrom = null;
        }

        if (dateFrom) {
          params.date_from = dateFrom.toISOString().split("T")[0];
          params.date_to = now.toISOString().split("T")[0];
        }
      }

      const response = await adminService.getTransactionStats(params);

      if (response.success) {
        const statsData = {
          total_transactions: response.data.total_transactions || 0,
          total_value: response.data.total_value || 0,
          success_rate: response.data.success_rate || 0,
          success_count: response.data.success_count || 0,
          pending_count: response.data.pending_count || 0,
          failed_count: response.data.failed_count || 0,
        };
        setStats(statsData);
      } else {
        console.error("Stats API error:", response.message);
      }
    } catch (err) {
      console.error("Error fetching transaction stats:", err);
      // Keep default stats values in case of error
    }
  };

  const handleStatusChange = async (transactionId, newStatus, notes = "") => {
    try {
      const response = await adminService.updateTransactionStatus(
        transactionId,
        {
          status: newStatus,
          notes,
        }
      );

      if (response.success) {
        // Refresh transactions list and stats
        fetchTransactions();
        fetchStats();
        setShowTransactionModal(false);
      } else {
        alert("Failed to update transaction status: " + response.message);
      }
    } catch (err) {
      alert("Error updating transaction status: " + err.message);
      console.error("Error updating transaction status:", err);
    }
  };

  const handleViewTransaction = async (transactionId) => {
    try {
      const response = await adminService.getTransaction(transactionId);

      if (response.success) {
        setSelectedTransaction(response.data);
        setShowTransactionModal(true);
      } else {
        alert("Failed to fetch transaction details: " + response.message);
      }
    } catch (err) {
      alert("Error fetching transaction details: " + err.message);
      console.error("Error fetching transaction details:", err);
    }
  };

  const statusConfig = {
    completed: {
      label: "Completed",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircleIcon,
      iconColor: "text-green-600",
    },
    success: {
      label: "Completed",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircleIcon,
      iconColor: "text-green-600",
    },
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: ClockIcon,
      iconColor: "text-yellow-600",
    },
    processing: {
      label: "Processing",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: ArrowDownTrayIcon,
      iconColor: "text-blue-600",
    },
    failed: {
      label: "Failed",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircleIcon,
      iconColor: "text-red-600",
    },
  };

  // Helper function to get status config with fallback
  const getStatusConfig = (status) => {
    return statusConfig[status] || statusConfig.pending; // Fallback to pending if status not found
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  // Loading and error states - only for initial load
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error && !transactionsLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchTransactions(false)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const TransactionModal = ({ transaction, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Transaction Details
                </h3>
                <p className="text-sm text-gray-600">{transaction.id}</p>
              </div>
            </div>
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
          {/* Status */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                getStatusConfig(transaction.status).color
              }`}
            >
              {React.createElement(getStatusConfig(transaction.status).icon, {
                className: `w-5 h-5 ${
                  getStatusConfig(transaction.status).iconColor
                }`,
              })}
              <span className="font-semibold">
                {getStatusConfig(transaction.status).label}
              </span>
            </div>
          </div>

          {/* Transaction Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Customer Information
              </h4>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.userName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Product Information
              </h4>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <ShoppingBagIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.productName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.productCategory}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Payment Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">Amount</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">Profit</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(transaction.profit || 0)}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                <p className="text-sm font-medium text-indigo-600 mb-1">
                  Total Amount
                </p>
                <p className="text-lg font-bold text-indigo-900">
                  {formatCurrency(transaction.totalAmount)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Payment Method
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {transaction.paymentMethod}
                </p>
                <p className="text-sm text-gray-600">
                  {transaction.paymentChannel}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Reference
                </p>
                <p className="text-sm font-mono font-semibold text-gray-900">
                  {transaction.reference}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Timeline
            </h4>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Transaction Created
                  </p>
                  <p className="text-sm text-blue-700">
                    {formatDateTime(transaction.createdAt)}
                  </p>
                </div>
              </div>

              {transaction.completedAt && (
                <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      Transaction Completed
                    </p>
                    <p className="text-sm text-green-700">
                      {formatDateTime(transaction.completedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {transaction.notes && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                Notes
              </h4>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700">{transaction.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            {transaction.status === "pending" && (
              <>
                <button
                  onClick={() =>
                    handleStatusChange(
                      transaction.id,
                      "success",
                      "Transaction approved by admin"
                    )
                  }
                  className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Approve Transaction
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(
                      transaction.id,
                      "failed",
                      "Transaction rejected by admin"
                    )
                  }
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Reject Transaction
                </button>
              </>
            )}
            {(transaction.status === "completed" ||
              transaction.status === "success") && (
              <button className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                Generate Receipt
              </button>
            )}
            {transaction.status === "failed" && (
              <button
                onClick={() =>
                  handleStatusChange(
                    transaction.id,
                    "pending",
                    "Transaction retried by admin"
                  )
                }
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Retry Transaction
              </button>
            )}
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
            Transaction Management
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage all transactions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors shadow-lg">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Transactions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.total_transactions.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Revenue
              </p>
              <p className="text-xs text-gray-500 mb-2">
                (Successful transactions only)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.total_value)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <BanknotesIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Success Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.success_rate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pending_count}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, user, product, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Types</option>
              <option value="Game Top Up">Game Top Up</option>
              <option value="Game Voucher">Game Voucher</option>
            </select>

            <select
              value={pagination.per_page}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  per_page: parseInt(e.target.value),
                  current_page: 1, // Reset to first page when changing per_page
                }))
              }
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
              <option value="170">All transactions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Table Info Header */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50/50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold">{transactions.length}</span>{" "}
              transaction{transactions.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterStatus !== "all" && ` with ${filterStatus} status`}
              {filterType !== "all" && ` of type ${filterType}`}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="hidden sm:flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Scroll to view more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State for Transactions */}
        {transactionsLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Loading transactions...</p>
            </div>
          </div>
        )}

        {/* Error State for Transactions (when filtering/searching) */}
        {error &&
          transactionsLoading === false &&
          transactions.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto mb-3" />
                <p className="text-red-600 text-sm mb-3">{error}</p>
                <button
                  onClick={() => fetchTransactions(true)}
                  className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

        {/* Show content only when not loading */}
        {!transactionsLoading && (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden">
              <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      {/* Transaction Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-sm">
                            {transaction.id}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {transaction.paymentChannel}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {React.createElement(
                            getStatusConfig(transaction.status).icon,
                            {
                              className: `w-4 h-4 ${
                                getStatusConfig(transaction.status).iconColor
                              }`,
                            }
                          )}
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                              getStatusConfig(transaction.status).color
                            }`}
                          >
                            {getStatusConfig(transaction.status).label}
                          </span>
                        </div>
                      </div>

                      {/* Customer & Product Info */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {transaction.userName}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {transaction.userEmail}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ShoppingBagIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {transaction.productName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {transaction.productCategory}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details Grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Amount</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(transaction.totalAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Date</p>
                          <p className="font-semibold text-gray-900 text-xs">
                            {formatDateTime(transaction.createdAt)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {getTimeAgo(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleViewTransaction(transaction.id)}
                          className="flex items-center space-x-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-sm"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[180px]">
                        Transaction
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[180px]">
                        Customer
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[200px]">
                        Product
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                        Amount
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                        Status
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[150px]">
                        Date
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[100px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 xl:px-6 py-4">
                          <div>
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 truncate">
                              {transaction.id}
                            </p>
                            <p className="text-xs text-gray-600">
                              {transaction.paymentChannel}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div>
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 truncate">
                              {transaction.userName}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {transaction.userEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div>
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 truncate">
                              {transaction.productName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {transaction.productCategory}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <p className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                            {formatCurrency(transaction.totalAmount)}
                          </p>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {React.createElement(
                              getStatusConfig(transaction.status).icon,
                              {
                                className: `w-3.5 h-3.5 xl:w-4 xl:h-4 ${
                                  getStatusConfig(transaction.status).iconColor
                                }`,
                              }
                            )}
                            <span
                              className={`px-2 xl:px-2 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                                getStatusConfig(transaction.status).color
                              }`}
                            >
                              {getStatusConfig(transaction.status).label}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div>
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                              {formatDateTime(transaction.createdAt)}
                            </p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">
                              {getTimeAgo(transaction.createdAt)}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <button
                            onClick={() =>
                              handleViewTransaction(transaction.id)
                            }
                            className="p-1.5 xl:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <EyeIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* No Results */}
            {transactions.length === 0 && (
              <div className="text-center py-12">
                <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">
                  No transactions found
                </p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.last_page > 1 && (
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing {(pagination.current_page - 1) * pagination.per_page + 1}{" "}
              to{" "}
              {Math.min(
                pagination.current_page * pagination.per_page,
                pagination.total
              )}{" "}
              of {pagination.total} transactions
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  current_page: Math.max(1, prev.current_page - 1),
                }))
              }
              disabled={pagination.current_page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, pagination.last_page) },
                (_, i) => {
                  let pageNum;
                  if (pagination.last_page <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.current_page <= 3) {
                    pageNum = i + 1;
                  } else if (
                    pagination.current_page >=
                    pagination.last_page - 2
                  ) {
                    pageNum = pagination.last_page - 4 + i;
                  } else {
                    pageNum = pagination.current_page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          current_page: pageNum,
                        }))
                      }
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        pagination.current_page === pageNum
                          ? "bg-indigo-600 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  current_page: Math.min(prev.last_page, prev.current_page + 1),
                }))
              }
              disabled={pagination.current_page === pagination.last_page}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Transaction Detail Modal */}
      {showTransactionModal && selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setShowTransactionModal(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminTransactions;
