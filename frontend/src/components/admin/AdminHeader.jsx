import {
  BellIcon,
  UserIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ChartBarSquareIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/scrollbar.css";

const AdminHeader = ({ activeTab, setSidebarOpen, menuItems, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: "New User Registration",
      message: "5 new users registered in the last hour",
      time: "2 min ago",
      type: "info",
      unread: true,
    },
    {
      id: 2,
      title: "High Transaction Volume",
      message: "Transaction volume increased by 25% today",
      time: "15 min ago",
      type: "success",
      unread: true,
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "Scheduled maintenance in 2 hours",
      time: "1 hour ago",
      type: "warning",
      unread: false,
    },
  ]);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  const currentTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getNotificationIcon = (type) => {
    const icons = {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    };
    return icons[type] || "📢";
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-5">
        {/* Main Header Content */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
              {/* Icon - Hidden on small mobile */}
              <div className="hidden sm:flex w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg lg:rounded-xl items-center justify-center shadow-lg flex-shrink-0">
                <ChartBarSquareIcon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>

              {/* Title and Breadcrumb */}
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900 truncate">
                  {menuItems.find((item) => item.key === activeTab)?.label ||
                    "Dashboard"}
                </h1>
                <div className="hidden sm:flex items-center space-x-2 mt-0.5 lg:mt-1">
                  <span className="text-xs lg:text-sm text-gray-500">
                    Admin Panel
                  </span>
                  <span className="text-gray-300">›</span>
                  <span className="text-xs lg:text-sm font-medium text-indigo-600 truncate">
                    {menuItems.find((item) => item.key === activeTab)?.label ||
                      "Overview"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 lg:pl-10 pr-3 lg:pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-48 lg:w-64"
              />
            </div>

            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* System Status - Hidden on mobile */}
            <div className="hidden xl:flex items-center space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
              <GlobeAltIcon className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">
                Live
              </span>
            </div>

            {/* Time Display - Hidden on small mobile */}
            <div className="hidden sm:flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-xs lg:text-sm font-medium text-gray-700">
                {currentTime}
              </span>
            </div>

            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 sm:p-2 lg:p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              >
                <BellIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    </span>
                    <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-400 rounded-full animate-ping opacity-30"></span>
                  </>
                )}
              </button>

              {/* Notifications Dropdown - Mobile Optimized */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl lg:rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl z-50 max-h-80 sm:max-h-96 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>

                  {/* Notifications List - Scrollable */}
                  <div className="max-h-56 sm:max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${
                          notification.unread
                            ? "border-indigo-500 bg-indigo-50/30"
                            : "border-transparent"
                        }`}
                      >
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="text-base lg:text-lg flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 leading-tight">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
                    <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-xs lg:text-sm font-semibold text-gray-900 leading-tight">
                    Super Admin
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 rounded-lg shadow-lg flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
              </button>

              {/* User Menu Dropdown - Mobile Optimized */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl lg:rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl z-50 overflow-hidden">
                  {/* User Info Header */}
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <UserIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          Super Admin
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          admin@bayaraja.com
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full mr-1.5 lg:mr-2 animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1 sm:py-2">
                    <Link
                      to="/admin/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-indigo-200 transition-colors flex-shrink-0">
                        <UserCircleIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-indigo-600" />
                      </div>
                      <span className="font-medium">Profile Settings</span>
                    </Link>

                    <Link
                      to="/admin/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:text-gray-600 transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-gray-200 transition-colors flex-shrink-0">
                        <Cog6ToothIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-600" />
                      </div>
                      <span className="font-medium">System Settings</span>
                    </Link>

                    <div className="border-t border-gray-100 mt-1 sm:mt-2 pt-1 sm:pt-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200 group"
                      >
                        <div className="w-7 h-7 lg:w-8 lg:h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-red-200 transition-colors flex-shrink-0">
                          <ArrowRightOnRectangleIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-red-600" />
                        </div>
                        <span className="font-medium">Sign Out</span>
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

export default AdminHeader;
