import { Link } from "react-router-dom";
import {
  SparklesIcon,
  TrophyIcon,
  ArrowRightIcon,
  PlayIcon,
  FireIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  CreditCardIcon,
  PhoneIcon,
  BoltIcon,
  WifiIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

const HeroSection = () => {
  const stats = [
    { number: "50K+", label: "Pengguna Aktif", icon: UserGroupIcon },
    { number: "2M+", label: "Transaksi Berhasil", icon: CheckCircleIcon },
    { number: "99.9%", label: "Uptime System", icon: ClockIcon },
    { number: "4.9/5", label: "Rating Pengguna", icon: StarIcon },
  ];

  const popularProducts = [
    {
      name: "Pulsa Telkomsel 50K",
      price: "Rp 49.500",
      discount: "5%",
      icon: PhoneIcon,
    },
    {
      name: "Token PLN 100K",
      price: "Rp 99.000",
      discount: "1%",
      icon: BoltIcon,
    },
    {
      name: "Paket Data XL 30GB",
      price: "Rp 85.000",
      discount: "15%",
      icon: WifiIcon,
    },
    {
      name: "Netflix Premium",
      price: "Rp 186.000",
      discount: "7%",
      icon: TvIcon,
    },
  ];

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Platform PPOB Terpercaya #1 di Indonesia
                <TrophyIcon className="w-4 h-4 ml-2" />
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Bayar Semua
                </span>
                <br />
                <span className="text-gray-900">Jadi Mudah</span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-normal">
                  dalam Satu Aplikasi
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Pulsa, paket data, token listrik, streaming, gaming, dan 50+
                layanan digital lainnya.
                <span className="text-blue-600 font-semibold">
                  {" "}
                  Hemat waktu, hemat uang, transaksi aman!
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <FireIcon className="w-5 h-5 mr-2" />
                  Mulai Gratis Sekarang
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 bg-white text-gray-700 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                <PlayIcon className="w-5 h-5 mr-2" />
                Lihat Demo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="relative z-10">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Dashboard Bayaraja
                      </h3>
                      <p className="text-gray-500">
                        Kelola semua transaksi Anda
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">
                        Online
                      </span>
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-100 text-sm">Saldo Anda</p>
                        <p className="text-3xl font-bold">Rp 850.000</p>
                        <p className="text-blue-100 text-xs mt-1">
                          +Rp 50.000 hari ini
                        </p>
                      </div>
                      <CreditCardIcon className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>

                  {/* Popular Services */}
                  <div className="grid grid-cols-2 gap-4">
                    {popularProducts.slice(0, 4).map((product, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group"
                      >
                        <product.icon className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-sm font-semibold text-gray-900">
                          {product.name}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-blue-600 font-bold text-sm">
                            {product.price}
                          </span>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            -{product.discount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Transaction */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center text-green-700">
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        Transaksi Berhasil
                      </span>
                      <span className="ml-auto text-xs text-green-600">
                        2 menit lalu
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mt-2">
                      Pulsa Telkomsel 50K
                    </div>
                    <div className="text-sm text-green-700">
                      ke 0812-3456-7890
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
