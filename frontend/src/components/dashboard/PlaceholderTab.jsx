import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const PlaceholderTab = ({ activeTab, menuItems }) => {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Cog6ToothIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {menuItems.find((item) => item.key === activeTab)?.label}
      </h3>
      <p className="text-gray-600 text-lg mb-6">
        Fitur ini sedang dalam pengembangan dan akan segera tersedia
      </p>
      <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
        Segera Hadir
      </div>
    </div>
  );
};

export default PlaceholderTab;
