import {
  PhoneIcon,
  BoltIcon,
  WifiIcon,
  TvIcon,
  CreditCardIcon,
  PuzzlePieceIcon, // untuk Game
  ShoppingBagIcon, // untuk E-Commerce
  BookOpenIcon, // untuk Pendidikan
  HeartIcon as HeartIconOutline, // untuk Kesehatan
  HomeIcon,
  TruckIcon, // untuk Transportasi
  GiftIcon,
} from "@heroicons/react/24/outline";

const QuickActions = () => {
  const quickActions = [
    {
      icon: PhoneIcon,
      title: "Pulsa",
      description: "Isi pulsa semua operator",
      color: "from-blue-500 to-cyan-500",
      popular: true,
    },
    {
      icon: BoltIcon,
      title: "Token PLN",
      description: "Beli token listrik PLN",
      color: "from-yellow-500 to-orange-500",
      popular: true,
    },
    {
      icon: WifiIcon,
      title: "Paket Data",
      description: "Paket internet unlimited",
      color: "from-green-500 to-emerald-500",
      popular: true,
    },
    {
      icon: TvIcon,
      title: "Streaming",
      description: "Netflix, Disney+, dll",
      color: "from-purple-500 to-pink-500",
      popular: true,
    },
    {
      icon: CreditCardIcon,
      title: "E-Wallet",
      description: "Top up OVO, GoPay, DANA",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: PuzzlePieceIcon,
      title: "Game Voucher",
      description: "Mobile Legends, PUBG, FF",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: ShoppingBagIcon,
      title: "E-Commerce",
      description: "Voucher Shopee, Tokopedia",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BookOpenIcon,
      title: "Pendidikan",
      description: "Ruangguru, Zenius, dll",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: HeartIconOutline,
      title: "Kesehatan",
      description: "Halodoc, Alodokter",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: HomeIcon,
      title: "Internet & TV",
      description: "IndiHome, MyRepublic",
      color: "from-slate-500 to-gray-500",
    },
    {
      icon: TruckIcon,
      title: "Transportasi",
      description: "Gojek, Grab, KRL",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: GiftIcon,
      title: "Voucher",
      description: "Gift card & voucher lainnya",
      color: "from-violet-500 to-purple-500",
    },
  ];

  // Pisahkan kategori popular dan kategori lainnya
  const popularActions = quickActions.filter((action) => action.popular);
  const otherActions = quickActions.filter((action) => !action.popular);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Kategori Popular - Mobile First Design */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <div className="mb-3 sm:mb-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Kategori Popular
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Layanan yang paling sering digunakan
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              🔥 Trending
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {popularActions.map((action, index) => (
            <button
              key={`popular-${index}`}
              className="group relative bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 overflow-hidden"
            >
              {/* Popular Badge */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <span className="text-white text-xs">⭐</span>
                </span>
              </div>

              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${action.color} rounded-lg sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-lg`}
              >
                <action.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-center text-sm sm:text-base">
                {action.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed hidden sm:block">
                {action.description}
              </p>
              {/* Mobile description - shorter */}
              <p className="text-xs text-gray-600 text-center leading-relaxed sm:hidden">
                {action.description.split(" ").slice(0, 3).join(" ")}...
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Semua Kategori */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <div className="mb-3 sm:mb-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Semua Kategori
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Jelajahi semua layanan yang tersedia
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 hover:underline self-start sm:self-center">
            <span>Lihat Semua</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
          {quickActions.map((action, index) => (
            <button
              key={`all-${index}`}
              className="group bg-white p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5"
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${action.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-1 sm:mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto`}
              >
                <action.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-center text-xs sm:text-sm leading-tight">
                {action.title}
              </h4>

              {/* Description - hidden on mobile for cleaner look */}
              <p
                className="text-xs text-gray-500 text-center leading-relaxed overflow-hidden text-ellipsis hidden sm:block"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {action.description}
              </p>

              {/* Popular indicator for popular items */}
              {action.popular && (
                <div className="mt-1 sm:mt-2 flex justify-center">
                  <span className="inline-flex items-center px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                    <span className="hidden sm:inline">Popular</span>
                    <span className="sm:hidden">⭐</span>
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2 sm:pt-4">
        <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          <PhoneIcon className="w-5 h-5 mr-2" />
          Mulai Transaksi
        </button>
        <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          Riwayat Transaksi
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
