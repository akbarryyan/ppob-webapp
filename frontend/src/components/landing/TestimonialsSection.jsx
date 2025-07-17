import { Link } from "react-router-dom";
import {
  StarIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ArrowRightIcon,
  PhoneIcon,
  ShieldCheckIcon,
  BoltIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Andi Wijaya",
      role: "Entrepreneur",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content:
        "Platform TopUp telah mengubah cara saya mengelola pembayaran digital. Prosesnya sangat cepat dan aman, cocok untuk bisnis saya yang membutuhkan transaksi real-time.",
      transaction: "500+ transaksi",
      highlight: "Sangat cepat dan aman",
    },
    {
      name: "Siti Maharani",
      role: "Ibu Rumah Tangga",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content:
        "Sebagai ibu rumah tangga, saya butuh platform yang mudah dan terpercaya. TopUp memberikan cashback yang lumayan dan customer servicenya selalu helpful.",
      transaction: "200+ transaksi",
      highlight: "Mudah digunakan",
    },
    {
      name: "Rahman Hakim",
      role: "Mahasiswa",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content:
        "Harga kompetitif dan promo untuk mahasiswa bikin kantong tidak jebol. Interface yang clean dan proses pembayaran yang simpel banget.",
      transaction: "150+ transaksi",
      highlight: "Harga terjangkau",
    },
    {
      name: "Diana Kusuma",
      role: "Content Creator",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content:
        "Sebagai content creator, saya sering butuh top up game dan paket data. TopUp selalu reliable dan transaksinya instant, perfect untuk kebutuhan konten.",
      transaction: "300+ transaksi",
      highlight: "Instant & reliable",
    },
    {
      name: "Bambang Sutrisno",
      role: "Pebisnis Online",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content:
        "API integration yang mudah dan dashboard analytics yang lengkap membantu bisnis online saya. Tim support juga sangat responsif ketika ada kendala.",
      transaction: "1000+ transaksi",
      highlight: "API terintegrasi",
    },
    {
      name: "Fitri Nurhaliza",
      role: "Karyawan Swasta",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content:
        "Riwayat transaksi yang rapi dan notifikasi real-time membuat saya lebih tenang. Cashback dan poin reward juga lumayan untuk hemat pengeluaran bulanan.",
      transaction: "250+ transaksi",
      highlight: "Cashback menarik",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Pengguna Aktif",
      description: "Bergabung setiap bulan",
    },
    {
      number: "98%",
      label: "Tingkat Kepuasan",
      description: "Dari survey pengguna",
    },
    {
      number: "99.9%",
      label: "Success Rate",
      description: "Transaksi berhasil",
    },
    {
      number: "24/7",
      label: "Customer Support",
      description: "Siap membantu Anda",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <TrophyIcon className="w-4 h-4 mr-2" />
            Testimoni Pengguna
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pengguna Kami?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ribuan pengguna telah merasakan kemudahan dan kepercayaan
            bertransaksi dengan platform TopUp. Simak pengalaman mereka di bawah
            ini.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <ChatBubbleLeftIcon className="w-12 h-12 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </blockquote>

              {/* Highlight */}
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                {testimonial.highlight}
              </div>

              {/* User Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <UserCircleIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    {testimonial.transaction}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Dipercaya oleh{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    50,000+ Pengguna
                  </span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Bergabunglah dengan ribuan pengguna yang telah merasakan
                  kemudahan, keamanan, dan kecepatan bertransaksi dengan
                  platform TopUp.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Transaksi aman dengan enkripsi SSL
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <BoltIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Proses instant dalam hitungan detik
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <PhoneIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700">
                    Customer support 24/7 siap membantu
                  </span>
                </div>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Bergabung Sekarang
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Trust Score Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center">
                <div className="relative">
                  {/* Trust Score Circle */}
                  <div className="w-48 h-48 mx-auto relative">
                    <svg
                      className="w-48 h-48 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${98 * 2.51}, 251.2`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          98%
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          Trust Score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Keamanan</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Kecepatan</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Support</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
