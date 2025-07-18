import React, { useState } from "react";
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const AdminReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedReport, setSelectedReport] = useState("overview");

  const [reportData] = useState({
    overview: {
      totalRevenue: 15750000,
      totalTransactions: 342,
      totalUsers: 89,
      successRate: 96.5,
      revenueGrowth: 12.5,
      transactionGrowth: 8.3,
      userGrowth: 15.2,
      successRateChange: 2.1,
    },
    sales: [
      { product: "PUBG Mobile UC 1800", sales: 45, revenue: 11250000 },
      { product: "Free Fire Diamond 2180", sales: 38, revenue: 11400000 },
      { product: "Steam Wallet 500K", sales: 12, revenue: 6000000 },
      { product: "Mobile Legends Diamond 5000", sales: 8, revenue: 6000000 },
      { product: "Genshin Impact Genesis Crystal", sales: 5, revenue: 7495000 },
    ],
    daily: [
      { date: "2024-01-14", revenue: 850000, transactions: 18 },
      { date: "2024-01-15", revenue: 1200000, transactions: 25 },
      { date: "2024-01-16", revenue: 750000, transactions: 15 },
      { date: "2024-01-17", revenue: 1100000, transactions: 22 },
      { date: "2024-01-18", revenue: 950000, transactions: 19 },
      { date: "2024-01-19", revenue: 1350000, transactions: 28 },
      { date: "2024-01-20", revenue: 1250000, transactions: 24 },
    ],
    topUsers: [
      { name: "Budi Santoso", transactions: 12, spent: 3250000 },
      { name: "Sari Melati", transactions: 8, spent: 2150000 },
      { name: "Andi Prakoso", transactions: 6, spent: 1850000 },
      { name: "Maya Sari", transactions: 9, spent: 2750000 },
      { name: "Rudi Hermawan", transactions: 7, spent: 1950000 },
    ],
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const StatCard = ({
    title,
    value,
    growth,
    icon: Icon,
    color,
    isAmount = false,
    isPercentage = false,
  }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {isAmount
                ? formatCurrency(value)
                : isPercentage
                ? `${value}%`
                : value.toLocaleString()}
            </p>
            <div className="flex items-center space-x-1">
              {growth > 0 ? (
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-semibold ${
                  growth > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(growth)}%
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          </div>
          <div
            className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="365days">Last Year</option>
          </select>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: "overview", label: "Overview" },
              { key: "sales", label: "Sales Report" },
              { key: "revenue", label: "Revenue Trend" },
              { key: "users", label: "User Analytics" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedReport(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedReport === tab.key
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedReport === "overview" && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={reportData.overview.totalRevenue}
                  growth={reportData.overview.revenueGrowth}
                  icon={CurrencyDollarIcon}
                  color="bg-gradient-to-tr from-green-500 to-emerald-500"
                  isAmount={true}
                />
                <StatCard
                  title="Total Transactions"
                  value={reportData.overview.totalTransactions}
                  growth={reportData.overview.transactionGrowth}
                  icon={CreditCardIcon}
                  color="bg-gradient-to-tr from-blue-500 to-cyan-500"
                />
                <StatCard
                  title="Total Users"
                  value={reportData.overview.totalUsers}
                  growth={reportData.overview.userGrowth}
                  icon={UsersIcon}
                  color="bg-gradient-to-tr from-purple-500 to-pink-500"
                />
                <StatCard
                  title="Success Rate"
                  value={reportData.overview.successRate}
                  growth={reportData.overview.successRateChange}
                  icon={ChartBarIcon}
                  color="bg-gradient-to-tr from-orange-500 to-red-500"
                  isPercentage={true}
                />
              </div>

              {/* Performance Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-4">
                  Performance Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatCurrency(
                        reportData.overview.totalRevenue /
                          reportData.overview.totalTransactions
                      )}
                    </p>
                    <p className="text-sm text-indigo-700">
                      Average Transaction Value
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatCurrency(
                        reportData.overview.totalRevenue /
                          reportData.overview.totalUsers
                      )}
                    </p>
                    <p className="text-sm text-indigo-700">Revenue per User</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {(
                        reportData.overview.totalTransactions /
                        reportData.overview.totalUsers
                      ).toFixed(1)}
                    </p>
                    <p className="text-sm text-indigo-700">
                      Transactions per User
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === "sales" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">
                Top Selling Products
              </h3>
              <div className="space-y-4">
                {reportData.sales.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.product}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(item.revenue)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.revenue / item.sales)} avg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport === "revenue" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">
                Daily Revenue Trend
              </h3>
              <div className="space-y-4">
                {reportData.daily.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <CalendarDaysIcon className="w-6 h-6 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {formatDate(day.date)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {day.transactions} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(day.revenue)}
                      </p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (day.revenue /
                                Math.max(
                                  ...reportData.daily.map((d) => d.revenue)
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport === "users" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Top Customers</h3>
              <div className="space-y-4">
                {reportData.topUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.transactions} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(user.spent)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(user.spent / user.transactions)} avg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Revenue Growth
                </p>
                <p className="text-sm text-green-700">
                  12.5% increase from last period
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <UsersIcon className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-blue-900">New Users</p>
                <p className="text-sm text-blue-700">
                  15.2% increase in user registrations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-xl">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-purple-900">
                  Success Rate
                </p>
                <p className="text-sm text-purple-700">
                  96.5% transaction success rate
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recommendations
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm font-semibold text-yellow-900 mb-1">
                Inventory Alert
              </p>
              <p className="text-sm text-yellow-700">
                Mobile Legends products are low in stock
              </p>
            </div>
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <p className="text-sm font-semibold text-indigo-900 mb-1">
                Growth Opportunity
              </p>
              <p className="text-sm text-indigo-700">
                Consider expanding Steam products catalog
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-900 mb-1">
                Performance
              </p>
              <p className="text-sm text-green-700">
                PUBG Mobile products showing strong growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
