import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CreditCardIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
  }
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #3b82f6 #f1f5f9;
  }
`;

const RecentTransactions = ({ recentTransactions, setActiveTab }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-700 bg-green-100 border-green-200";
      case "pending":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "failed":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200/50";
      case "pending":
        return "bg-yellow-50 border-yellow-200/50";
      case "failed":
        return "bg-red-50 border-red-200/50";
      default:
        return "bg-gray-50 border-gray-200/50";
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
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Transaksi Terbaru
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {recentTransactions.length} transaksi dalam 7 hari terakhir
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("transactions")}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <EyeIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Semua</span>
              <span className="sm:hidden">Semua</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Scrollable Transaction List */}
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-400">
          <div className="p-6 space-y-4">
            {recentTransactions.slice(0, 8).map((transaction, index) => {
              const StatusIcon = getStatusIcon(transaction.status);
              return (
                <div
                  key={index}
                  className={`group relative p-4 border-2 rounded-2xl transition-all duration-200 hover:shadow-lg hover:scale-[1.01] cursor-pointer ${getStatusBgColor(
                    transaction.status
                  )}`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    {/* Left Side - Transaction Info */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        <StatusIcon className="w-7 h-7" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                          {transaction.type}
                        </div>
                        <div className="text-sm text-gray-600 mb-1 font-medium">
                          {transaction.target}
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                          {transaction.date}
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Amount & Status */}
                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 flex justify-between sm:flex-col items-center sm:items-end">
                      <div>
                        <div
                          className={`font-bold text-xl mb-2 ${
                            transaction.amount > 0
                              ? "text-emerald-600"
                              : "text-gray-900"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}Rp{" "}
                          {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mb-2 font-mono bg-gray-100 px-2 py-1 rounded">
                          {transaction.id}
                        </div>
                      </div>

                      <div
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1.5" />
                        {transaction.status === "success"
                          ? "Berhasil"
                          : transaction.status === "pending"
                          ? "Pending"
                          : "Gagal"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Menampilkan {Math.min(8, recentTransactions.length)} dari{" "}
              {recentTransactions.length} transaksi
            </span>
            <button
              onClick={() => setActiveTab("transactions")}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
            >
              Lihat riwayat lengkap
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentTransactions;
