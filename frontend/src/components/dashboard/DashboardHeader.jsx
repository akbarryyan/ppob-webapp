import { BellIcon, UserIcon } from "@heroicons/react/24/outline";

const DashboardHeader = ({ activeTab, setSidebarOpen, menuItems }) => {
  const currentTime = new Date().toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <svg
              className="w-6 h-6"
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
          
          {/* Page Title & Description */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {menuItems.find((item) => item.key === activeTab)?.label || "Dashboard"}
              </h1>
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{currentTime}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-1 hidden sm:block">
              {currentDate} • Kelola transaksi digital Anda dengan mudah
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notification Button */}
          <button className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md group">
            <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-20"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:rotate-3">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
