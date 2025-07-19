import { Link } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  Square3Stack3DIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  menuItems,
  onLogout,
}) => {
  const iconMap = {
    HomeIcon,
    UsersIcon,
    CreditCardIcon,
    CubeIcon: Square3Stack3DIcon,
    ServerIcon,
    ChartBarIcon,
    BellIcon,
    Cog6ToothIcon,
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-xl flex flex-col h-screen transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between lg:justify-center h-16 px-6 border-b border-gray-100 flex-shrink-0">
          <Link to="/admin" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800">
                Admin Panel
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Management System
              </span>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Info */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Super Admin
              </div>
              <div className="text-xs text-gray-500 truncate">
                Full Access • Online
              </div>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-4 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {menuItems.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  // Auto close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 group transform hover:scale-[1.02] ${
                  activeTab === item.key
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
                }`}
                style={{
                  animationDelay: sidebarOpen ? `${index * 50}ms` : "0ms",
                  animation: sidebarOpen
                    ? "slideInFromLeft 0.3s ease-out forwards"
                    : "none",
                }}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
                {/* Active indicator */}
                {activeTab === item.key && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 p-4 space-y-4 border-t border-gray-100">
          {/* System Status */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  System Health
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                99.9%
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              All services operational
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 group"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Sign Out
            <div className="ml-auto w-0 group-hover:w-2 h-2 bg-red-500 rounded-full transition-all duration-200"></div>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
