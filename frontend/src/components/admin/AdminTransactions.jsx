import React, { useState } from "react";
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
import "../../styles/scrollbar.css";

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const [transactions] = useState([
    {
      id: "TXN-2024-001234",
      userId: 1,
      userName: "Budi Santoso",
      userEmail: "budi.santoso@email.com",
      productName: "PUBG Mobile UC 1800",
      productCategory: "Game Top Up",
      amount: 250000,
      fee: 2500,
      totalAmount: 252500,
      status: "completed",
      paymentMethod: "E-Wallet",
      paymentChannel: "GoPay",
      createdAt: "2024-01-20T10:30:00",
      completedAt: "2024-01-20T10:32:15",
      reference: "GP240120103000001",
      notes: "Auto-processed via payment gateway",
    },
    {
      id: "TXN-2024-001235",
      userId: 2,
      userName: "Sari Melati",
      userEmail: "sari.melati@email.com",
      productName: "Steam Wallet 500K",
      productCategory: "Game Voucher",
      amount: 500000,
      fee: 5000,
      totalAmount: 505000,
      status: "pending",
      paymentMethod: "Bank Transfer",
      paymentChannel: "BCA",
      createdAt: "2024-01-20T11:15:00",
      completedAt: null,
      reference: "BCA240120111500001",
      notes: "Waiting for payment confirmation",
    },
    {
      id: "TXN-2024-001236",
      userId: 3,
      userName: "Andi Prakoso",
      userEmail: "andi.prakoso@email.com",
      productName: "Free Fire Diamond 2180",
      productCategory: "Game Top Up",
      amount: 300000,
      fee: 3000,
      totalAmount: 303000,
      status: "failed",
      paymentMethod: "E-Wallet",
      paymentChannel: "OVO",
      createdAt: "2024-01-20T09:45:00",
      completedAt: null,
      reference: "OV240120094500001",
      notes: "Payment declined by provider",
    },
    {
      id: "TXN-2024-001237",
      userId: 4,
      userName: "Maya Sari",
      userEmail: "maya.sari@email.com",
      productName: "Mobile Legends Diamond 5000",
      productCategory: "Game Top Up",
      amount: 750000,
      fee: 7500,
      totalAmount: 757500,
      status: "processing",
      paymentMethod: "Credit Card",
      paymentChannel: "Visa",
      createdAt: "2024-01-20T11:45:00",
      completedAt: null,
      reference: "VS240120114500001",
      notes: "Processing payment authorization",
    },
    {
      id: "TXN-2024-001238",
      userId: 1,
      userName: "Budi Santoso",
      userEmail: "budi.santoso@email.com",
      productName: "Genshin Impact Genesis Crystal 6480",
      productCategory: "Game Top Up",
      amount: 1499000,
      fee: 14990,
      totalAmount: 1513990,
      status: "completed",
      paymentMethod: "E-Wallet",
      paymentChannel: "Dana",
      createdAt: "2024-01-19T16:20:00",
      completedAt: "2024-01-19T16:22:30",
      reference: "DN240119162000001",
      notes: "Auto-processed via payment gateway",
    },
  ]);

  const statusConfig = {
    completed: {
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
      icon: ClockIcon,
      iconColor: "text-blue-600",
    },
    failed: {
      label: "Failed",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircleIcon,
      iconColor: "text-red-600",
    },
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

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    const matchesType =
      filterType === "all" || transaction.productCategory === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

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
                statusConfig[transaction.status].color
              }`}
            >
              {React.createElement(statusConfig[transaction.status].icon, {
                className: `w-5 h-5 ${
                  statusConfig[transaction.status].iconColor
                }`,
              })}
              <span className="font-semibold">
                {statusConfig[transaction.status].label}
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
                <p className="text-sm font-medium text-gray-500 mb-1">Fee</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(transaction.fee)}
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
                <button className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Approve Transaction
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                  Reject Transaction
                </button>
              </>
            )}
            {transaction.status === "completed" && (
              <button className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                Generate Receipt
              </button>
            )}
            {transaction.status === "failed" && (
              <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
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
                {transactions.length}
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
                Total Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  transactions.reduce((sum, t) => sum + t.totalAmount, 0)
                )}
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
                {Math.round(
                  (transactions.filter((t) => t.status === "completed").length /
                    transactions.length) *
                    100
                )}
                %
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
                {
                  transactions.filter(
                    (t) => t.status === "pending" || t.status === "processing"
                  ).length
                }
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
              <span className="font-semibold">
                {filteredTransactions.length}
              </span>{" "}
              transaction{filteredTransactions.length !== 1 ? "s" : ""}
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

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
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
                        statusConfig[transaction.status].icon,
                        {
                          className: `w-4 h-4 ${
                            statusConfig[transaction.status].iconColor
                          }`,
                        }
                      )}
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                          statusConfig[transaction.status].color
                        }`}
                      >
                        {statusConfig[transaction.status].label}
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
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowTransactionModal(true);
                      }}
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
                {filteredTransactions.map((transaction) => (
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
                          statusConfig[transaction.status].icon,
                          {
                            className: `w-3.5 h-3.5 xl:w-4 xl:h-4 ${
                              statusConfig[transaction.status].iconColor
                            }`,
                          }
                        )}
                        <span
                          className={`px-2 xl:px-2 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                            statusConfig[transaction.status].color
                          }`}
                        >
                          {statusConfig[transaction.status].label}
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
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowTransactionModal(true);
                        }}
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
        {filteredTransactions.length === 0 && (
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
      </div>

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
