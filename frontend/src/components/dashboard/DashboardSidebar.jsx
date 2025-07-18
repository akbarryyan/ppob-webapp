import { Link } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  UserIcon,
  PhoneIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  BellIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const DashboardSidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    { icon: HomeIcon, label: "Overview", key: "overview" },
    { icon: CreditCardIcon, label: "Transaksi", key: "transactions" },
    { icon: BanknotesIcon, label: "Top Up", key: "topup" },
    { icon: ChartBarIcon, label: "Leaderboard", key: "leaderboard" },
    { icon: BellIcon, label: "Notifikasi", key: "notifications" },
    { icon: CurrencyDollarIcon, label: "Daftar Harga", key: "prices" },
    { icon: CodeBracketIcon, label: "API Docs", key: "api-docs" },
    { icon: PhoneIcon, label: "Contact", key: "contact" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
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
        style={{
          boxShadow: sidebarOpen
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "none",
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between lg:justify-center h-16 px-6 border-b border-gray-100 flex-shrink-0">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <CreditCardIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Bayaraja</span>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Navigation Menu */}
        <nav className="mt-8 px-4 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {menuItems.map((item, index) => (
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
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
              }`}
              style={{
                animationDelay: sidebarOpen ? `${index * 50}ms` : "0ms",
                animation: sidebarOpen
                  ? "slideInFromLeft 0.3s ease-out forwards"
                  : "none",
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>{" "}
        {/* Bottom Section */}
        <div className="flex-shrink-0 p-4 space-y-4">
          {/* User Profile Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  Admin User
                </div>
                <div className="text-xs text-gray-500 truncate">
                  admin@bayaraja.com
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 group">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Keluar
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
