import {
  UsersIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  CalendarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ServerIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const AdminOverview = () => {
  const [stats] = useState({
    totalUsers: 12543,
    totalTransactions: 8765,
    totalProducts: 234,
    totalRevenue: 875432100,
    userGrowth: 12.5,
    transactionGrowth: 8.3,
    productGrowth: 15.2,
    revenueGrowth: 23.7,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: "user",
      title: "New user registration",
      description: "User budi.santoso@email.com registered",
      time: "2 minutes ago",
      icon: UsersIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      type: "transaction",
      title: "High-value transaction",
      description: "Rp 500,000 transaction completed",
      time: "5 minutes ago",
      icon: CreditCardIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      type: "product",
      title: "New product added",
      description: "Steam Wallet 250K added to catalog",
      time: "15 minutes ago",
      icon: ShoppingBagIcon,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      type: "system",
      title: "System backup completed",
      description: "Daily backup successfully completed",
      time: "1 hour ago",
      icon: ServerIcon,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ]);

  const [systemHealth] = useState({
    uptime: "99.9%",
    responseTime: "125ms",
    throughput: "1.2K req/min",
    errorRate: "0.01%",
  });

  const [quickActions] = useState([
    {
      title: "Add New Product",
      description: "Add a new game or voucher",
      icon: ShoppingBagIcon,
      color: "from-blue-500 to-cyan-500",
      action: "/admin/products",
    },
    {
      title: "View Transactions",
      description: "Monitor all transactions",
      icon: CreditCardIcon,
      color: "from-green-500 to-emerald-500",
      action: "/admin/transactions",
    },
    {
      title: "User Management",
      description: "Manage user accounts",
      icon: UsersIcon,
      color: "from-purple-500 to-pink-500",
      action: "/admin/users",
    },
    {
      title: "System Reports",
      description: "View detailed analytics",
      icon: ChartBarIcon,
      color: "from-orange-500 to-red-500",
      action: "/admin/reports",
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const StatCard = ({
    title,
    value,
    growth,
    icon: Icon,
    color,
    isAmount = false,
  }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {isAmount ? formatCurrency(value) : formatNumber(value)}
            </p>
            <div className="flex items-center space-x-1">
              {growth > 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-semibold ${
                  growth > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(growth)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, Super Admin! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Here's what's happening with your platform today
            </p>
          </div>
          <div className="flex items-center space-x-4 text-right">
            <div>
              <p className="text-indigo-100 text-sm">Current Time</p>
              <p className="text-xl font-bold">
                {currentTime.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          growth={stats.userGrowth}
          icon={UsersIcon}
          color="bg-gradient-to-tr from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions}
          growth={stats.transactionGrowth}
          icon={CreditCardIcon}
          color="bg-gradient-to-tr from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          growth={stats.productGrowth}
          icon={ShoppingBagIcon}
          color="bg-gradient-to-tr from-purple-500 to-pink-500"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          growth={stats.revenueGrowth}
          icon={ArrowTrendingUpIcon}
          color="bg-gradient-to-tr from-orange-500 to-red-500"
          isAmount={true}
        />
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* System Health */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">System Health</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-600">
                  All Systems Operational
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Uptime
                  </span>
                </div>
                <span className="text-sm font-bold text-green-600">
                  {systemHealth.uptime}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Response Time
                  </span>
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {systemHealth.responseTime}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Throughput
                  </span>
                </div>
                <span className="text-sm font-bold text-purple-600">
                  {systemHealth.throughput}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Error Rate
                  </span>
                </div>
                <span className="text-sm font-bold text-yellow-600">
                  {systemHealth.errorRate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="group p-4 rounded-xl border-2 border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 text-left"
                  style={{
                    background: `linear-gradient(135deg, white 0%, white 100%)`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${action.color
                      .replace("from-", "")
                      .replace("to-", "")
                      .split(" ")
                      .map((c) => c.replace("-500", ""))
                      .join(", ")})`;
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, white 0%, white 100%)";
                    e.target.style.color = "inherit";
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-tr ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                        {action.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <button className="flex items-center space-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              <EyeIcon className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <DocumentTextIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
