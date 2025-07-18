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
} from "@heroicons/react/24/outline";

const TransactionsList = ({ recentTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    { value: "all", label: "Semua Status", count: recentTransactions.length },
    {
      value: "success",
      label: "Berhasil",
      count: recentTransactions.filter((t) => t.status === "success").length,
    },
    {
      value: "pending",
      label: "Pending",
      count: recentTransactions.filter((t) => t.status === "pending").length,
    },
    {
      value: "failed",
      label: "Gagal",
      count: recentTransactions.filter((t) => t.status === "failed").length,
    },
  ];

  const filteredTransactions = recentTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-emerald-700 bg-emerald-100 border-emerald-200";
      case "pending":
        return "text-amber-700 bg-amber-100 border-amber-200";
      case "failed":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIconBg = (status) => {
    switch (status) {
      case "success":
        return "bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/25";
      case "pending":
        return "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/25";
      case "failed":
        return "bg-gradient-to-br from-red-500 to-pink-600 shadow-red-500/25";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600 shadow-gray-500/25";
    }
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
      {/* Header with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Riwayat Transaksi
              </h2>
              <p className="text-blue-100">
                Kelola dan pantau semua transaksi Anda dengan mudah
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {recentTransactions.length}
                </div>
                <div className="text-blue-100 text-sm">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">
                  {
                    recentTransactions.filter((t) => t.status === "success")
                      .length
                  }
                </div>
                <div className="text-blue-100 text-sm">Berhasil</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-300">
                  {
                    recentTransactions.filter((t) => t.status === "pending")
                      .length
                  }
                </div>
                <div className="text-blue-100 text-sm">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari ID, jenis, atau target transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 bg-white min-w-40"
              >
                <div className="flex items-center">
                  <FunnelIcon className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {filterOptions.find((f) => f.value === filterStatus)?.label}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl z-50 py-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterStatus(option.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        filterStatus === option.value
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Periode</span>
            </button>
            <button className="flex items-center px-4 py-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 border border-green-200">
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg">
        <div className="p-4 border-b border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900">
            Daftar Transaksi ({filteredTransactions.length})
          </h3>
        </div>

        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada transaksi ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau filter yang dipilih
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction, index) => {
                const StatusIcon = getStatusIcon(transaction.status);
                return (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50/50 transition-all duration-200 group"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${getStatusIconBg(
                            transaction.status
                          )}`}
                        >
                          <StatusIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                            {transaction.type}
                          </div>
                          <div className="text-gray-600 text-sm truncate">
                            {transaction.target}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <CalendarDaysIcon className="w-3 h-3 mr-1" />
                            {transaction.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div
                            className={`font-bold text-lg ${
                              transaction.amount > 0
                                ? "text-emerald-600"
                                : "text-gray-900"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}Rp{" "}
                            {Math.abs(transaction.amount).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {transaction.id}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status === "success"
                              ? "✓ Berhasil"
                              : transaction.status === "pending"
                              ? "⏳ Pending"
                              : "✗ Gagal"}
                          </div>

                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex lg:hidden items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${getStatusIconBg(
                          transaction.status
                        )}`}
                      >
                        <StatusIcon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                              {transaction.type}
                            </h4>
                            <p className="text-gray-600 text-xs truncate">
                              {transaction.target}
                            </p>
                          </div>
                          <div className="text-right ml-3">
                            <div
                              className={`font-bold text-sm ${
                                transaction.amount > 0
                                  ? "text-emerald-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}Rp{" "}
                              {Math.abs(transaction.amount).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
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
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200">
                            <EyeIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="mt-1 text-xs text-gray-500 flex items-center">
                          <CalendarDaysIcon className="w-3 h-3 mr-1" />
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        {filteredTransactions.length > 6 && (
          <div className="p-3 bg-gray-50/50 border-t border-gray-200/50 text-center">
            <p className="text-xs text-gray-500">
              Scroll untuk melihat lebih banyak transaksi
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredTransactions.length > 10 && (
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-md text-sm">
            Muat Lebih Banyak Transaksi
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
