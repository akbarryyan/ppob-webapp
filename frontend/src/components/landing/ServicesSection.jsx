import {
  PhoneIcon,
  BoltIcon,
  WifiIcon,
  CreditCardIcon,
  TvIcon,
  GlobeAltIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  HeartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const ServicesSection = () => {
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

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
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
            Dari pulsa hingga gaming, dari streaming hingga pembayaran tagihan -
            semua tersedia dengan harga terbaik dan proses super cepat
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
            <h3 className="text-3xl font-bold mb-4">Mengapa Pilih Bayaraja?</h3>
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
                Transaksi selesai dalam hitungan detik dengan teknologi terdepan
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
  );
};

export default ServicesSection;
