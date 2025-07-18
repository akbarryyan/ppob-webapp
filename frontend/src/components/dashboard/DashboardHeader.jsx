import {
  BellIcon,
  UserIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const DashboardHeader = ({
  activeTab,
  setSidebarOpen,
  menuItems,
  onLogout,
}) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isNotificationClosing, setIsNotificationClosing] = useState(false);
  const [isUserMenuClosing, setIsUserMenuClosing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const currentTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock notifications data - in real app, this would come from API
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        user: "Ahmad Rizki",
        transaction: "Pulsa Telkomsel 50k",
        amount: "Rp 52.500",
        time: "2 menit yang lalu",
        status: "success",
        type: "pulsa",
      },
      {
        id: 2,
        user: "Siti Nurhaliza",
        transaction: "Token PLN 100k",
        amount: "Rp 103.000",
        time: "5 menit yang lalu",
        status: "success",
        type: "listrik",
      },
      {
        id: 3,
        user: "Budi Santoso",
        transaction: "BPJS Kesehatan",
        amount: "Rp 80.000",
        time: "8 menit yang lalu",
        status: "pending",
        type: "bpjs",
      },
      {
        id: 4,
        user: "Maya Indira",
        transaction: "Paket Data XL 10GB",
        amount: "Rp 65.000",
        time: "12 menit yang lalu",
        status: "success",
        type: "data",
      },
      {
        id: 5,
        user: "Andi Pratama",
        transaction: "Air PDAM Jakarta",
        amount: "Rp 120.500",
        time: "15 menit yang lalu",
        status: "failed",
        type: "air",
      },
    ]);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        closeNotifications();
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeNotifications = () => {
    setIsNotificationClosing(true);
    setTimeout(() => {
      setShowNotifications(false);
      setIsNotificationClosing(false);
    }, 200); // Match the animation duration
  };

  const closeUserMenu = () => {
    setIsUserMenuClosing(true);
    setTimeout(() => {
      setShowUserMenu(false);
      setIsUserMenuClosing(false);
    }, 200); // Match the animation duration
  };

  const toggleNotifications = () => {
    if (showNotifications) {
      closeNotifications();
    } else {
      setShowNotifications(true);
    }
  };

  const toggleUserMenu = () => {
    if (showUserMenu) {
      closeUserMenu();
    } else {
      setShowUserMenu(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "success":
        return "Berhasil";
      case "pending":
        return "Pending";
      case "failed":
        return "Gagal";
      default:
        return "Unknown";
    }
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      pulsa: "📱",
      data: "📶",
      listrik: "⚡",
      air: "💧",
      bpjs: "🏥",
      internet: "🌐",
    };
    return iconMap[type] || "💳";
  };

  const handleLogout = () => {
    // Close user menu and trigger logout
    closeUserMenu();
    onLogout();
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
        {/* Main Header Content */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Page Title Section */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {/* Icon */}
              <div className="hidden sm:flex w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-lg items-center justify-center shadow-md flex-shrink-0">
                <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white rounded opacity-90"></div>
              </div>

              {/* Title and Subtitle */}
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {menuItems.find((item) => item.key === activeTab)?.label ||
                    "Dashboard"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                  <span className="hidden sm:inline">
                    Kelola transaksi digital Anda dengan mudah
                  </span>
                  <span className="sm:hidden">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    • {currentTime}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Status Indicators */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Time Display */}
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {currentTime}
                </span>
              </div>

              {/* Real-time status */}
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-700">
                  Online
                </span>
              </div>
            </div>

            {/* Mobile status indicator */}
            <div className="flex md:hidden items-center space-x-1 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>

            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotifications}
                className="relative p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                {notifications.length > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {notifications.length}
                      </span>
                    </span>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-30"></span>
                  </>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div
                  className={`fixed sm:absolute top-16 sm:top-auto right-4 sm:right-0 sm:mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl z-50 max-h-96 overflow-hidden ${
                    isNotificationClosing
                      ? "animate-dropdown-out"
                      : "animate-dropdown-in"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifikasi Transaksi
                    </h3>
                    <button
                      onClick={closeNotifications}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BellIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm">
                          Tidak ada notifikasi baru
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification, index) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                              isNotificationClosing
                                ? "animate-slide-out-stagger opacity-100"
                                : `animate-slide-stagger opacity-0 ${
                                    index === 0
                                      ? ""
                                      : index === 1
                                      ? "animate-delay-75"
                                      : index === 2
                                      ? "animate-delay-150"
                                      : index === 3
                                      ? "animate-delay-225"
                                      : "animate-delay-300"
                                  }`
                            }`}
                            style={{ animationFillMode: "forwards" }}
                          >
                            <div className="flex items-start space-x-3">
                              {/* Transaction Icon */}
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg transform transition-transform duration-200 hover:scale-110">
                                {getTypeIcon(notification.type)}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    {notification.user}
                                  </p>
                                  <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                      notification.status
                                    )}`}
                                  >
                                    {getStatusText(notification.status)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.transaction}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {notification.amount}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div
                      className={`p-4 border-t border-gray-100 bg-gray-50 ${
                        isNotificationClosing
                          ? "animate-slide-out-stagger opacity-100"
                          : "animate-slide-stagger opacity-0 animate-delay-300"
                      }`}
                      style={{ animationFillMode: "forwards" }}
                    >
                      <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 hover:bg-blue-50 rounded-lg py-2">
                        Lihat Semua Notifikasi
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="relative group">
                  <button
                    onClick={toggleUserMenu}
                    className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </button>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
              </div>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div
                  className={`fixed sm:absolute top-16 sm:top-auto right-4 sm:right-0 sm:mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl z-50 overflow-hidden ${
                    isUserMenuClosing
                      ? "animate-dropdown-out"
                      : "animate-dropdown-in"
                  }`}
                >
                  {/* User Info Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || "user@example.com"}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/dashboard/profile"
                      onClick={closeUserMenu}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <UserCircleIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">Profil Saya</p>
                        <p className="text-xs text-gray-500">
                          Kelola informasi akun
                        </p>
                      </div>
                      <ArrowRightOnRectangleIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      to="/dashboard/settings"
                      onClick={closeUserMenu}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                        <Cog6ToothIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">Pengaturan</p>
                        <p className="text-xs text-gray-500">
                          Atur preferensi aplikasi
                        </p>
                      </div>
                      <ArrowRightOnRectangleIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-500 transition-colors transform group-hover:translate-x-1" />
                    </Link>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                          <ArrowRightOnRectangleIcon className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">Keluar</p>
                          <p className="text-xs text-red-400">
                            Logout dari akun
                          </p>
                        </div>
                        <div className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors transform group-hover:translate-x-1">
                          →
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
