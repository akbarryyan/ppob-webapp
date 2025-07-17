import {
  PhoneIcon,
  BoltIcon,
  WifiIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

const QuickActions = () => {
  const quickActions = [
    {
      icon: PhoneIcon,
      title: "Pulsa",
      description: "Isi pulsa semua operator",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BoltIcon,
      title: "Token PLN",
      description: "Beli token listrik PLN",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: WifiIcon,
      title: "Paket Data",
      description: "Paket internet unlimited",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TvIcon,
      title: "Streaming",
      description: "Netflix, Disney+, dll",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Kategori Produk</h3>
        <span className="text-sm text-gray-500">
          Pilih layanan yang dibutuhkan
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
            >
              <action.icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-center">
              {action.title}
            </h4>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
