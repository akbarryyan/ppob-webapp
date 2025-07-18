import { useState } from "react";
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
} from "@heroicons/react/24/outline";

const TransactionsList = ({ recentTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // 'card' atau 'table'

  const filterOptions = [
    {
      value: "all",
      label: "Semua Status",
      count: recentTransactions.length,
      color: "bg-gray-100",
    },
    {
      value: "success",
      label: "Berhasil",
      count: recentTransactions.filter((t) => t.status === "success").length,
      color: "bg-emerald-100",
    },
    {
      value: "pending",
      label: "Pending",
      count: recentTransactions.filter((t) => t.status === "pending").length,
      color: "bg-amber-100",
    },
    {
      value: "failed",
      label: "Gagal",
      count: recentTransactions.filter((t) => t.status === "failed").length,
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

  const filteredTransactions = recentTransactions.filter((transaction) => {
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
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-200/50">
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
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
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-72 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
              <div className="relative">
                <button
                  onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}
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
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
              <div className="relative">
                <button
                  onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
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
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Daftar Transaksi
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Menampilkan {filteredTransactions.length} dari{" "}
                {recentTransactions.length} transaksi
              </p>
            </div>
            {filteredTransactions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Urut berdasarkan:</span>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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

        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MagnifyingGlassIcon className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tidak ada transaksi ditemukan
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
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
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                      className="p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 group cursor-pointer"
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

                      {/* Mobile Card Layout */}
                      <div className="lg:hidden">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${getStatusIconBg(
                                transaction.status
                              )}`}
                            >
                              <StatusIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <TransactionIcon className="w-2.5 h-2.5 text-gray-600" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-base truncate mb-1">
                                  {transaction.type}
                                </h4>
                                <p className="text-gray-600 text-sm truncate">
                                  {transaction.target}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <div
                                  className={`font-bold text-lg ${
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
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
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
                                </div>
                                <span className="text-xs text-gray-500 font-mono">
                                  {transaction.id}
                                </span>
                              </div>
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="mt-2 text-xs text-gray-500 flex items-center">
                              <CalendarDaysIcon className="w-3 h-3 mr-1" />
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Table View
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Transaksi
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Target
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Tanggal
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">
                            Jumlah
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
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
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusIconBg(
                                      transaction.status
                                    )}`}
                                  >
                                    <StatusIcon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {transaction.type}
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">
                                      {transaction.id}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {transaction.target}
                              </td>
                              <td className="py-4 px-4 text-gray-600 text-sm">
                                {transaction.date}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <span
                                  className={`font-bold ${
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
                              <td className="py-4 px-4 text-center">
                                <div
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                    transaction.status
                                  )}`}
                                >
                                  {transaction.status === "success"
                                    ? "✓ Berhasil"
                                    : transaction.status === "pending"
                                    ? "⏳ Pending"
                                    : "✗ Gagal"}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                  <EyeIcon className="w-4 h-4" />
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

        {/* Footer with pagination info */}
        {filteredTransactions.length > 0 && (
          <div className="p-6 bg-gray-50/50 border-t border-gray-200/50 rounded-b-3xl">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Menampilkan{" "}
                <span className="font-semibold">
                  {filteredTransactions.length}
                </span>{" "}
                transaksi
                {searchTerm && <span> untuk "{searchTerm}"</span>}
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Sebelumnya
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Load More Section */}
      {filteredTransactions.length > 10 && (
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-gray-200/50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <ChartBarSquareIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ada Lebih Banyak Transaksi
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-md">
                Muat lebih banyak transaksi untuk melihat riwayat lengkap
                aktivitas akun Anda
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Muat Lebih Banyak
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
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
