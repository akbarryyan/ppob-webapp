import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  BoltIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  TrophyIcon,
  FireIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  PhoneIcon,
  WifiIcon,
  TvIcon,
  ComputerDesktopIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const FeaturesSection = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Aman & Terpercaya",
      description:
        "Transaksi dilindungi dengan sistem keamanan berlapis dan enkripsi SSL 256-bit",
      stats: "99.9% Success Rate",
    },
    {
      icon: BoltIcon,
      title: "Proses Super Cepat",
      description:
        "Transaksi diproses dalam hitungan detik dengan teknologi real-time terdepan",
      stats: "< 10 Detik",
    },
    {
      icon: CurrencyDollarIcon,
      title: "Harga Terbaik",
      description:
        "Dapatkan harga kompetitif dan cashback menarik untuk semua layanan",
      stats: "Up to 15% Cashback",
    },
    {
      icon: UserGroupIcon,
      title: "Support 24/7",
      description:
        "Tim customer service profesional siap membantu Anda kapan saja",
      stats: "24/7 Available",
    },
    {
      icon: ChartBarIcon,
      title: "Dashboard Lengkap",
      description:
        "Pantau semua transaksi, riwayat, dan statistik dalam satu dashboard",
      stats: "Real-time Analytics",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Mobile Friendly",
      description:
        "Akses mudah dari smartphone, tablet, atau desktop dengan tampilan responsif",
      stats: "All Devices",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Features Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <TrophyIcon className="w-4 h-4 mr-2" />
                Fitur Unggulan Platform
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Mengapa Ribuan Orang
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Memilih Bayaraja?
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Nikmati pengalaman transaksi digital yang tak tertandingi dengan
                teknologi terdepan dan layanan terpercaya yang telah dipercaya
                jutaan pengguna
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm mb-3">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {feature.stats}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FireIcon className="w-5 h-5 mr-2" />
                Bergabung Sekarang
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Features Dashboard */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Riwayat Transaksi
                    </h3>
                    <p className="text-gray-500 text-sm">Update real-time</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">
                      Live
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      type: "Pulsa Telkomsel",
                      amount: "Rp 50.000",
                      time: "2 menit lalu",
                      status: "success",
                      number: "0812-xxxx-7890",
                      icon: PhoneIcon,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      type: "Token PLN",
                      amount: "Rp 100.000",
                      time: "5 menit lalu",
                      status: "success",
                      number: "123xxxxxxx890",
                      icon: BoltIcon,
                      color: "from-yellow-500 to-orange-500",
                    },
                    {
                      type: "Paket Data XL",
                      amount: "Rp 85.000",
                      time: "10 menit lalu",
                      status: "success",
                      number: "0817-xxxx-5432",
                      icon: WifiIcon,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      type: "Netflix Premium",
                      amount: "Rp 186.000",
                      time: "15 menit lalu",
                      status: "success",
                      number: "user@email.com",
                      icon: TvIcon,
                      color: "from-red-500 to-rose-500",
                    },
                  ].map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${transaction.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <transaction.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {transaction.type}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.number}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {transaction.amount}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center text-green-600">
                          <CheckCircleIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Stats */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-blue-100 text-sm">
                        Transaksi Bulan Ini
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Rp 850K</div>
                      <div className="text-blue-100 text-sm">
                        Total Transaksi
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">5%</div>
                      <div className="text-blue-100 text-sm">Cashback</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-1/3 -right-6 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ComputerDesktopIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Multi-Platform
            </h3>
            <p className="text-gray-600">
              Akses dari web, mobile app, atau API untuk developer
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Live Chat</h3>
            <p className="text-gray-600">
              Customer service responsif siap membantu 24/7
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HandThumbUpIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Reward Program
            </h3>
            <p className="text-gray-600">
              Kumpulkan poin dan tukar dengan hadiah menarik
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
