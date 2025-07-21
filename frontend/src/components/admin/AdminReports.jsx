import React, { useState, useEffect } from "react";
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import adminService from "../../services/adminService";

const AdminReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reportData, setReportData] = useState({
    overview: {
      totalRevenue: 0,
      totalTransactions: 0,
      totalUsers: 0,
      successRate: 0,
      revenueGrowth: 0,
      transactionGrowth: 0,
      userGrowth: 0,
      successRateChange: 0,
    },
    sales: [],
    daily: [],
    topUsers: [],
  });

  // Fetch all reports data
  const fetchReportsData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching reports data for period:", selectedPeriod);

      // Fetch overview data
      const overviewResponse = await adminService.getReports(selectedPeriod);
      console.log("Overview response:", overviewResponse);

      // Fetch top products
      const productsResponse = await adminService.getTopProducts(
        selectedPeriod,
        5
      );
      console.log("Products response:", productsResponse);

      // Fetch top users
      const usersResponse = await adminService.getTopUsers(selectedPeriod, 5);
      console.log("Users response:", usersResponse);

      // Fetch daily revenue
      const dailyResponse = await adminService.getDailyRevenue(selectedPeriod);
      console.log("Daily response:", dailyResponse);

      if (
        overviewResponse.success &&
        productsResponse.success &&
        usersResponse.success &&
        dailyResponse.success
      ) {
        setReportData({
          overview: overviewResponse.data.overview,
          sales: productsResponse.data,
          topUsers: usersResponse.data,
          daily: dailyResponse.data,
        });
        console.log("Final report data set:", {
          overview: overviewResponse.data.overview,
          sales: productsResponse.data,
          topUsers: usersResponse.data,
          daily: dailyResponse.data,
        });
      } else {
        throw new Error("Failed to fetch reports data");
      }
    } catch (err) {
      setError(err.message || "Failed to load reports data");
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or period changes
  useEffect(() => {
    fetchReportsData();
  }, [selectedPeriod]);

  const formatCurrency = (amount) => {
    // For mobile, show shorter format
    if (window.innerWidth < 640) {
      if (amount >= 1000000000) {
        return `Rp ${(amount / 1000000000).toFixed(1)}B`;
      } else if (amount >= 1000000) {
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
    subtitle = null,
  }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col space-y-3 sm:space-y-4">
          {/* Header with icon */}
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                {title}
              </p>
            </div>
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>
          </div>

          {/* Value */}
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
              {isAmount
                ? formatCurrency(value)
                : isPercentage
                ? `${value}%`
                : value.toLocaleString()}
            </p>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {subtitle}
              </p>
            )}

            {/* Growth indicator */}
            {selectedPeriod !== "all" && (
              <div className="flex items-center space-x-2">
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                    growth > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {growth > 0 ? (
                    <ArrowTrendingUpIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    {Math.abs(growth)}%
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                  vs last period
                </span>
                <span className="text-xs text-gray-500 sm:hidden">vs prev</span>
              </div>
            )}
            {selectedPeriod === "all" && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-700">
                  <span className="text-xs sm:text-sm font-semibold">
                    All Time Total
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            {selectedPeriod === "all"
              ? "Complete business overview - All time data"
              : "Comprehensive business insights and performance metrics"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="365days">Last Year</option>
          </select>
          <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-3 sm:px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg text-sm">
            <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="border-b border-gray-200">
          {/* Mobile Tab Selector */}
          <div className="block sm:hidden p-4">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option value="overview">Overview</option>
              <option value="sales">Sales Report</option>
              <option value="revenue">Revenue Trend</option>
              <option value="users">User Analytics</option>
            </select>
          </div>

          {/* Desktop Tab Navigation */}
          <nav className="hidden sm:flex space-x-4 lg:space-x-8 px-4 sm:px-6 overflow-x-auto">
            {[
              { key: "overview", label: "Overview" },
              { key: "sales", label: "Sales Report" },
              { key: "revenue", label: "Revenue Trend" },
              { key: "users", label: "User Analytics" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedReport(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
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

        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading reports...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchReportsData}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <>
              {selectedReport === "overview" && (
                <div className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
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
                      subtitle={`${reportData.overview.successfulTransactions} successful (${reportData.overview.successRate}%)`}
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
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4">
                      Performance Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="text-center p-3 sm:p-0">
                        <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                          {reportData.overview.totalTransactions > 0
                            ? formatCurrency(
                                reportData.overview.totalRevenue /
                                  reportData.overview.totalTransactions
                              )
                            : "Rp 0"}
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-700 mt-1">
                          Average Transaction Value
                        </p>
                      </div>
                      <div className="text-center p-3 sm:p-0">
                        <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                          {reportData.overview.totalUsers > 0
                            ? formatCurrency(
                                reportData.overview.totalRevenue /
                                  reportData.overview.totalUsers
                              )
                            : "Rp 0"}
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-700 mt-1">
                          Revenue per User
                        </p>
                      </div>
                      <div className="text-center p-3 sm:p-0">
                        <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                          {reportData.overview.totalUsers > 0
                            ? (
                                reportData.overview.totalTransactions /
                                reportData.overview.totalUsers
                              ).toFixed(1)
                            : "0"}
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-700 mt-1">
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
                  <div className="space-y-3 sm:space-y-4">
                    {reportData.sales.length > 0 ? (
                      reportData.sales.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors space-y-3 sm:space-y-0"
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                {item.product}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {item.sales} sales
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-bold text-gray-900 text-sm sm:text-base">
                              {formatCurrency(item.revenue)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {formatCurrency(item.revenue / item.sales)} avg
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No sales data available for this period
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedReport === "revenue" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Daily Revenue Trend
                    </h3>
                    <div className="text-sm text-gray-600">
                      {reportData.daily.length > 0 && (
                        <span>
                          Showing {reportData.daily.length} days of data
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Revenue Summary Cards */}
                  {reportData.daily.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-600">
                              Total Revenue
                            </p>
                            <p className="text-xl font-bold text-blue-900">
                              {formatCurrency(
                                reportData.daily.reduce(
                                  (sum, day) => sum + day.revenue,
                                  0
                                )
                              )}
                            </p>
                          </div>
                          <CurrencyDollarIcon className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-600">
                              Total Transactions
                            </p>
                            <p className="text-xl font-bold text-green-900">
                              {reportData.daily
                                .reduce((sum, day) => sum + day.transactions, 0)
                                .toLocaleString()}
                            </p>
                          </div>
                          <CreditCardIcon className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-purple-600">
                              Daily Average
                            </p>
                            <p className="text-xl font-bold text-purple-900">
                              {formatCurrency(
                                reportData.daily.reduce(
                                  (sum, day) => sum + day.revenue,
                                  0
                                ) / reportData.daily.length
                              )}
                            </p>
                          </div>
                          <ChartBarIcon className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Daily Revenue List */}
                  <div className="space-y-3 sm:space-y-4">
                    {reportData.daily.length > 0 ? (
                      reportData.daily
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending (newest first)
                        .map((day, index) => {
                          const maxRevenue = Math.max(
                            ...reportData.daily.map((d) => d.revenue)
                          );
                          const percentageWidth =
                            maxRevenue > 0
                              ? (day.revenue / maxRevenue) * 100
                              : 0;

                          return (
                            <div
                              key={day.date}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors space-y-3 sm:space-y-0"
                            >
                              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <CalendarDaysIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                    {new Date(day.date).toLocaleDateString(
                                      "id-ID",
                                      {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </p>
                                  <p className="text-xs sm:text-sm text-gray-600">
                                    {day.transactions} transaction
                                    {day.transactions !== 1 ? "s" : ""}
                                    {day.transactions > 0 && (
                                      <span className="ml-2">
                                        • Avg:{" "}
                                        {formatCurrency(
                                          day.revenue / day.transactions
                                        )}
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="w-full sm:w-auto sm:text-right sm:min-w-[200px]">
                                <p className="font-bold text-gray-900 text-sm sm:text-base mb-2">
                                  {formatCurrency(day.revenue)}
                                </p>
                                <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                                    style={{
                                      width: `${percentageWidth}%`,
                                    }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-right">
                                  {percentageWidth.toFixed(1)}% of max day
                                </p>
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className="text-center py-12">
                        <CalendarDaysIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-2">
                          No revenue data available
                        </p>
                        <p className="text-gray-400 text-sm">
                          {selectedPeriod === "all"
                            ? "No transaction data found in the database"
                            : `No transactions found for the selected ${
                                selectedPeriod === "7days"
                                  ? "week"
                                  : selectedPeriod === "30days"
                                  ? "month"
                                  : selectedPeriod === "90days"
                                  ? "3 months"
                                  : selectedPeriod === "365days"
                                  ? "year"
                                  : "period"
                              }`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedReport === "users" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Top Customers Analytics
                    </h3>
                    <div className="text-sm text-gray-600">
                      {reportData.topUsers.length > 0 && (
                        <span>
                          Top {reportData.topUsers.length} customers by spending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User Analytics Summary Cards */}
                  {reportData.topUsers.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-600">
                              Top Customer Spent
                            </p>
                            <p className="text-xl font-bold text-blue-900">
                              {formatCurrency(
                                Math.max(
                                  ...reportData.topUsers.map((u) => u.spent)
                                )
                              )}
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              {reportData.topUsers[0]?.name || "N/A"}
                            </p>
                          </div>
                          <UsersIcon className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-600">
                              Total Customers
                            </p>
                            <p className="text-xl font-bold text-green-900">
                              {reportData.topUsers.length}
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                              Active customers shown
                            </p>
                          </div>
                          <CreditCardIcon className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-purple-600">
                              Avg Spending
                            </p>
                            <p className="text-xl font-bold text-purple-900">
                              {formatCurrency(
                                reportData.topUsers.reduce(
                                  (sum, user) => sum + user.spent,
                                  0
                                ) / reportData.topUsers.length
                              )}
                            </p>
                            <p className="text-xs text-purple-700 mt-1">
                              Per customer average
                            </p>
                          </div>
                          <CurrencyDollarIcon className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top Customers List */}
                  <div className="space-y-3 sm:space-y-4">
                    {reportData.topUsers.length > 0 ? (
                      reportData.topUsers.map((user, index) => {
                        const maxSpent = Math.max(
                          ...reportData.topUsers.map((u) => u.spent)
                        );
                        const spentPercentage =
                          maxSpent > 0 ? (user.spent / maxSpent) * 100 : 0;

                        // Determine tier based on ranking
                        const getTierInfo = (idx) => {
                          if (idx === 0)
                            return {
                              tier: "VIP",
                              color: "from-yellow-500 to-orange-500",
                              bgColor:
                                "bg-gradient-to-tr from-yellow-500 to-orange-500",
                            };
                          if (idx < 3)
                            return {
                              tier: "Gold",
                              color: "from-yellow-400 to-yellow-600",
                              bgColor:
                                "bg-gradient-to-tr from-yellow-400 to-yellow-600",
                            };
                          if (idx < 5)
                            return {
                              tier: "Silver",
                              color: "from-gray-400 to-gray-600",
                              bgColor:
                                "bg-gradient-to-tr from-gray-400 to-gray-600",
                            };
                          return {
                            tier: "Bronze",
                            color: "from-orange-400 to-red-500",
                            bgColor:
                              "bg-gradient-to-tr from-orange-400 to-red-500",
                          };
                        };

                        const tierInfo = getTierInfo(index);

                        return (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors space-y-3 sm:space-y-0"
                          >
                            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                              <div
                                className={`w-12 h-12 ${tierInfo.bgColor} rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg`}
                              >
                                <span className="text-white font-bold text-xs">
                                  #{index + 1}
                                </span>
                                <span className="text-white font-bold text-[10px]">
                                  {tierInfo.tier}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                  {user.name}
                                </p>
                                <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
                                  <span>
                                    {user.transactions} transaction
                                    {user.transactions !== 1 ? "s" : ""}
                                  </span>
                                  <span>•</span>
                                  <span>
                                    Avg:{" "}
                                    {formatCurrency(
                                      user.spent / user.transactions
                                    )}
                                  </span>
                                </div>

                                {/* Customer tier badge */}
                                <div className="mt-1">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${tierInfo.color} text-white`}
                                  >
                                    {tierInfo.tier} Customer
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="w-full sm:w-auto sm:text-right sm:min-w-[220px]">
                              <p className="font-bold text-gray-900 text-sm sm:text-base mb-2">
                                {formatCurrency(user.spent)}
                              </p>

                              {/* Spending progress bar */}
                              <div className="w-full sm:w-44 bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                  className={`bg-gradient-to-r ${tierInfo.color} h-2 rounded-full transition-all duration-500 ease-out`}
                                  style={{
                                    width: `${spentPercentage}%`,
                                  }}
                                ></div>
                              </div>

                              <div className="flex justify-between text-xs text-gray-500">
                                <span>
                                  {spentPercentage.toFixed(1)}% of top
                                </span>
                                <span>
                                  {(
                                    (user.spent /
                                      reportData.topUsers.reduce(
                                        (sum, u) => sum + u.spent,
                                        0
                                      )) *
                                    100
                                  ).toFixed(1)}
                                  % share
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12">
                        <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-2">
                          No customer data available
                        </p>
                        <p className="text-gray-400 text-sm">
                          {selectedPeriod === "all"
                            ? "No customer transaction data found in the database"
                            : `No customer transactions found for the selected ${
                                selectedPeriod === "7days"
                                  ? "week"
                                  : selectedPeriod === "30days"
                                  ? "month"
                                  : selectedPeriod === "90days"
                                  ? "3 months"
                                  : selectedPeriod === "365days"
                                  ? "year"
                                  : "period"
                              }`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Customer Insights */}
                  {reportData.topUsers.length > 0 && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-4 sm:p-6 mt-6">
                      <h4 className="text-lg font-bold text-indigo-900 mb-4">
                        Customer Insights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-3">
                          <p className="text-2xl font-bold text-indigo-600">
                            {reportData.topUsers.reduce(
                              (sum, user) => sum + user.transactions,
                              0
                            )}
                          </p>
                          <p className="text-sm text-indigo-700 mt-1">
                            Total Transactions
                          </p>
                        </div>
                        <div className="text-center p-3">
                          <p className="text-2xl font-bold text-indigo-600">
                            {formatCurrency(
                              reportData.topUsers.reduce(
                                (sum, user) => sum + user.spent,
                                0
                              )
                            )}
                          </p>
                          <p className="text-sm text-indigo-700 mt-1">
                            Total Revenue
                          </p>
                        </div>
                        <div className="text-center p-3">
                          <p className="text-2xl font-bold text-indigo-600">
                            {(
                              reportData.topUsers.reduce(
                                (sum, user) => sum + user.transactions,
                                0
                              ) / reportData.topUsers.length
                            ).toFixed(1)}
                          </p>
                          <p className="text-sm text-indigo-700 mt-1">
                            Avg Transactions per Customer
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Insights
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-green-900">
                  Revenue {selectedPeriod === "all" ? "Performance" : "Growth"}
                </p>
                <p className="text-xs sm:text-sm text-green-700">
                  {selectedPeriod === "all"
                    ? `Total: ${formatCurrency(
                        reportData.overview.totalRevenue
                      )} earned`
                    : `${reportData.overview.revenueGrowth > 0 ? "+" : ""}${
                        reportData.overview.revenueGrowth
                      }% from last period`}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <UsersIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-blue-900">
                  {selectedPeriod === "all" ? "Total Users" : "New Users"}
                </p>
                <p className="text-xs sm:text-sm text-blue-700">
                  {selectedPeriod === "all"
                    ? `${reportData.overview.totalUsers} registered users in total`
                    : `${reportData.overview.userGrowth > 0 ? "+" : ""}${
                        reportData.overview.userGrowth
                      }% increase in user registrations`}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-xl">
              <ChartBarIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-purple-900">
                  Success Rate
                </p>
                <p className="text-xs sm:text-sm text-purple-700">
                  {reportData.overview.successRate}% transaction success rate
                  {selectedPeriod === "all" ? " overall" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recommendations
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm font-semibold text-yellow-900 mb-1">
                Monitor Growth
              </p>
              <p className="text-xs sm:text-sm text-yellow-700">
                Track revenue trends and optimize high-performing products
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <p className="text-sm font-semibold text-indigo-900 mb-1">
                User Engagement
              </p>
              <p className="text-xs sm:text-sm text-indigo-700">
                Focus on retaining top customers and increasing transaction
                frequency
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-900 mb-1">
                Performance
              </p>
              <p className="text-xs sm:text-sm text-green-700">
                Maintain high success rates and expand successful product
                categories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
