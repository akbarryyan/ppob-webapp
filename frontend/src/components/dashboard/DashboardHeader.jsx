import { BellIcon, UserIcon } from "@heroicons/react/24/outline";

const DashboardHeader = ({ activeTab, setSidebarOpen, menuItems }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
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
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-900">
              {menuItems.find((item) => item.key === activeTab)?.label ||
                "Dashboard"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Kelola transaksi digital Anda dengan mudah
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
