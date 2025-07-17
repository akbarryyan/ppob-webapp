import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  WifiIcon,
  BoltIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TvIcon,
  GlobeAltIcon,
  ChartBarIcon,
  HeartIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon,
  LightBulbIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: PhoneIcon,
      title: "Pulsa & Paket Data",
      description:
        "Isi pulsa dan paket data semua operator dengan harga terbaik dan proses instan",
      color: "from-blue-500 to-cyan-500",
      features: ["Semua Operator", "Harga Terjangkau", "Proses Instan"],
      popular: true,
    },
    {
      icon: BoltIcon,
      title: "Token Listrik PLN",
      description:
        "Beli token listrik PLN dengan proses instan dan aman, tersedia 24/7",
      color: "from-yellow-500 to-orange-500",
      features: ["24/7 Available", "Auto Process", "Secure Payment"],
    },
    {
      icon: WifiIcon,
      title: "Paket Internet",
      description:
        "Paket internet unlimited dari berbagai provider dengan kuota besar",
      color: "from-green-500 to-emerald-500",
      features: ["Unlimited", "High Speed", "All Provider"],
    },
    {
      icon: CreditCardIcon,
      title: "Pembayaran Digital",
      description:
        "Bayar tagihan PDAM, BPJS, asuransi, dan layanan digital lainnya",
      color: "from-purple-500 to-pink-500",
      features: ["Multi Payment", "Auto Reminder", "History Track"],
    },
    {
      icon: TvIcon,
      title: "TV & Streaming",
      description:
        "Bayar tagihan TV kabel, streaming Netflix, Disney+, dan platform lainnya",
      color: "from-red-500 to-rose-500",
      features: ["All Platform", "HD Quality", "Family Plan"],
    },
    {
      icon: GlobeAltIcon,
      title: "Game & Voucher",
      description:
        "Top up game online, voucher digital, dan gift card favorit Anda",
      color: "from-indigo-500 to-blue-500",
      features: ["All Games", "Instant Delivery", "Best Price"],
    },
  ];

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

  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "CEO StartupTech",
      content:
        "Platform yang sangat membantu untuk kebutuhan operasional kantor. Bayar listrik, internet, sampai pulsa karyawan jadi satu tempat. Customer service nya juga responsif banget!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      company: "StartupTech",
    },
    {
      name: "Ahmad Rizki",
      role: "Content Creator",
      content:
        "Sebagai content creator, butuh internet dan pulsa yang stabil. TopUp selalu jadi andalan karena prosesnya cepat dan harganya bersaing. Pokoknya recommended!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      company: "YouTube Creator",
    },
    {
      name: "Ibu Sinta Dewi",
      role: "Ibu Rumah Tangga",
      content:
        "Seneng banget ada TopUp! Sekarang bayar listrik, air, sampai top up game anak-anak bisa dari rumah. Gak perlu repot-repot keluar rumah lagi. Praktis dan aman!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      company: "Happy Customer",
    },
    {
      name: "David Chen",
      role: "Gamer Professional",
      content:
        "Top up game jadi gampang banget! Dari Mobile Legends, PUBG, sampai Steam wallet semua ada. Proses instant, harga murah, dan banyak promo. Gamer wajib punya!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      company: "Pro Gamer",
    },
    {
      name: "Lisa Pratiwi",
      role: "Online Shop Owner",
      content:
        "Sebagai pemilik online shop, TopUp membantu banget untuk bayar internet, listrik toko, dan pulsa untuk koordinasi sama supplier. Dashboardnya juga detail banget!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      company: "LisaShop",
    },
    {
      name: "Budi Santoso",
      role: "Freelancer Designer",
      content:
        "Freelancer kayak saya butuh koneksi internet yang stabil. TopUp jadi solusi terbaik karena bisa bayar paket internet unlimited dengan harga terjangkau. Top!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      company: "Creative Studio",
    },
  ];

  const stats = [
    { number: "50K+", label: "Pengguna Aktif", icon: UserGroupIcon },
    { number: "2M+", label: "Transaksi Berhasil", icon: CheckCircleIcon },
    { number: "99.9%", label: "Uptime System", icon: ClockIcon },
    { number: "4.9/5", label: "Rating Pengguna", icon: StarIcon },
  ];

  const priceComparison = [
    {
      operator: "Telkomsel",
      our_price: "49.500",
      competitor: "52.000",
      savings: "2.500",
    },
    {
      operator: "Indosat",
      our_price: "48.000",
      competitor: "50.500",
      savings: "2.500",
    },
    {
      operator: "XL",
      our_price: "47.500",
      competitor: "49.000",
      savings: "1.500",
    },
    {
      operator: "Tri",
      our_price: "45.000",
      competitor: "47.000",
      savings: "2.000",
    },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-['Hanken_Grotesk']">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TopUp
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Layanan
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Fitur
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Testimoni
              </a>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
              >
                Daftar Gratis
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#services"
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Layanan
                </a>
                <a
                  href="#features"
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Fitur
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Testimoni
                </a>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium"
                >
                  Daftar Gratis
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
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
                          Dashboard TopUp
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

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <LightBulbIcon className="w-4 h-4 mr-2" />
              Layanan Terlengkap & Terpercaya
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Semua Kebutuhan Digital
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                dalam Satu Platform
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dari pulsa hingga gaming, dari streaming hingga pembayaran tagihan
              - semua tersedia dengan harga terbaik dan proses super cepat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULER
                  </div>
                )}

                <div
                  className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <service.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features?.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors cursor-pointer">
                  Mulai Transaksi
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </div>
            ))}
          </div>

          {/* Service Features */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Mengapa Pilih TopUp?</h3>
              <p className="text-blue-100 text-lg">
                Keunggulan yang membuat kami berbeda dari yang lain
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BoltIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Proses Instan</h4>
                <p className="text-blue-100">
                  Transaksi selesai dalam hitungan detik dengan teknologi
                  terdepan
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CurrencyDollarIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Harga Terbaik</h4>
                <p className="text-blue-100">
                  Garansi harga termurah dengan cashback dan promo menarik
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Support 24/7</h4>
                <p className="text-blue-100">
                  Tim customer service siap membantu kapan saja Anda butuhkan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bandingkan Harga,{" "}
              <span className="text-green-600">Hemat Lebih Banyak!</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami berkomitmen memberikan harga terbaik. Lihat perbandingan
              harga pulsa 50K di bawah ini!
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white text-center">
                Perbandingan Harga Pulsa 50K
              </h3>
              <p className="text-blue-100 text-center mt-2">
                Update terakhir: Hari ini
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-left font-semibold text-gray-900">
                      Operator
                    </th>
                    <th className="px-8 py-4 text-center font-semibold text-gray-900">
                      Harga TopUp
                    </th>
                    <th className="px-8 py-4 text-center font-semibold text-gray-900">
                      Harga Kompetitor
                    </th>
                    <th className="px-8 py-4 text-center font-semibold text-gray-900">
                      Hemat
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {priceComparison.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                            <PhoneIcon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900">
                            {item.operator}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-2xl font-bold text-green-600">
                          Rp {item.our_price}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-xl text-gray-500 line-through">
                          Rp {item.competitor}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                          <HandThumbUpIcon className="w-4 h-4 mr-1" />
                          Rp {item.savings}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 px-8 py-6 border-t border-yellow-200">
              <div className="flex items-center justify-center text-yellow-800">
                <SparklesIcon className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  Bonus: Dapatkan cashback hingga 5% untuk setiap transaksi!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                    Memilih TopUp?
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Nikmati pengalaman transaksi digital yang tak tertandingi
                  dengan teknologi terdepan dan layanan terpercaya yang telah
                  dipercaya jutaan pengguna
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Live Chat
              </h3>
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

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-6">
              <UserGroupIcon className="w-4 h-4 mr-2" />
              50,000+ Pengguna Puas
              <HeartIcon className="w-4 h-4 ml-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Apa Kata Mereka
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tentang TopUp?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ribuan pengguna dari berbagai kalangan sudah merasakan kemudahan
              dan keuntungan bertransaksi dengan TopUp. Yuk, lihat testimoni
              mereka!
            </p>
          </div>

          {/* Main Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <svg
                    className="w-16 h-16 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm font-medium">
                    ({testimonial.rating}.0)
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-8 text-lg italic group-hover:text-gray-900 transition-colors">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-blue-600 text-xs font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            ))}
          </div>

          {/* Additional Testimonials Carousel */}
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Testimoni Lainnya
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(3, 6).map((testimonial, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
                  />
                  <div className="flex justify-center items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                    "{testimonial.content.substring(0, 100)}..."
                  </p>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-8">Dipercaya Oleh</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-blue-100">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2M+</div>
                <div className="text-blue-100">Transaksi Sukses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9★</div>
                <div className="text-blue-100">Rating Pengguna</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                Bergabung dengan Mereka
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Memulai Transaksi Digital?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Bergabung dengan ribuan pengguna lainnya dan nikmati kemudahan
            transaksi digital hari ini juga
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Daftar Gratis Sekarang
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Sudah Punya Akun? Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TopUp</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Platform PPOB terpercaya untuk semua kebutuhan transaksi digital
                Anda.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.051-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349 0 1.299-1.052 2.35-2.349 2.35zm7.718 0c-1.297 0-2.349-1.051-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349.001 1.299-1.052 2.35-2.349 2.35z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pulsa & Paket Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Token Listrik PLN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Paket Internet
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pembayaran Digital
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pusat Bantuan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Hubungi Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Status Sistem
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Keamanan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 TopUp. Semua hak dilindungi. Dibuat dengan ❤️ untuk
              kemudahan transaksi digital Anda.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
