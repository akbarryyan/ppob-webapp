import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  FireIcon,
  GiftIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full filter blur-2xl animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8">
            <GiftIcon className="w-5 h-5 mr-2" />
            Penawaran Terbatas - Hanya untuk 1000 Pengguna Pertama!
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Siap Memulai Perjalanan
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Digital Anda?
            </span>
          </h2>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
            Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan
            bertransaksi digital. Dapatkan bonus cashback 50% untuk transaksi
            pertama Anda!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FireIcon className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Daftar Gratis Sekarang</span>
              <ArrowRightIcon className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <button className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
              <ChatBubbleLeftIcon className="w-6 h-6 mr-3" />
              Konsultasi Gratis
            </button>
          </div>

          {/* Special Offer Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GiftIcon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Bonus Cashback 50%
                </h3>
                <p className="text-blue-100 text-sm">
                  Untuk transaksi pertama hingga Rp 100.000
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Free Konsultasi
                </h3>
                <p className="text-blue-100 text-sm">
                  Setup bisnis dan integrasi API gratis
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FireIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Premium Access
                </h3>
                <p className="text-blue-100 text-sm">
                  Akses fitur premium gratis selama 3 bulan
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-200 rounded-full text-sm font-medium">
                ⏰ Penawaran berakhir dalam 7 hari lagi
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
          <div className="text-white/60 text-sm">Trusted by:</div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <span className="text-white/60 font-medium">Bank Indonesia</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <span className="text-white/60 font-medium">OJK</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <span className="text-white/60 font-medium">ISO 27001</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <span className="text-white/60 font-medium">PCI DSS</span>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-1/4 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-12 w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-pink-400 rounded-full animate-ping delay-500"></div>
    </section>
  );
};

export default CTASection;
