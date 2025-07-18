import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  StarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import {
  PhoneIcon as PhoneIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { useState } from "react";

// Custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #fbbf24;
    border-radius: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #f59e0b;
  }
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #fbbf24 #f1f5f9;
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactMethods = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Chat langsung dengan tim support",
      value: "+62 812-3456-7890",
      icon: DevicePhoneMobileIcon,
      iconSolid: PhoneIconSolid,
      color: "green",
      available: "24/7",
      response: "< 5 menit",
      link: "https://wa.me/6281234567890",
    },
    {
      id: "phone",
      name: "Telepon",
      description: "Hubungi customer service",
      value: "(021) 123-4567",
      icon: PhoneIcon,
      iconSolid: PhoneIconSolid,
      color: "blue",
      available: "08:00 - 22:00",
      response: "Langsung",
      link: "tel:+62211234567",
    },
    {
      id: "email",
      name: "Email",
      description: "Kirim pertanyaan detail",
      value: "support@bayaraja.com",
      icon: EnvelopeIcon,
      iconSolid: EnvelopeIcon,
      color: "purple",
      available: "24/7",
      response: "< 2 jam",
      link: "mailto:support@bayaraja.com",
    },
    {
      id: "livechat",
      name: "Live Chat",
      description: "Chat real-time di website",
      value: "Chat Sekarang",
      icon: ChatBubbleLeftRightIcon,
      iconSolid: ChatBubbleIconSolid,
      color: "indigo",
      available: "08:00 - 24:00",
      response: "< 1 menit",
      link: "#",
    },
  ];

  const categories = [
    "Umum",
    "Masalah Transaksi",
    "Top Up Saldo",
    "Akun & Profil",
    "Teknis",
    "Saran & Kritik",
  ];

  const faqItems = [
    {
      question: "Bagaimana cara top up saldo?",
      answer:
        "Anda dapat top up saldo melalui menu Top Up dengan berbagai metode pembayaran seperti transfer bank, e-wallet, atau virtual account.",
    },
    {
      question: "Berapa lama proses top up?",
      answer:
        "Proses top up umumnya instan untuk e-wallet dan transfer bank. Untuk virtual account maksimal 5 menit.",
    },
    {
      question: "Apakah transaksi aman?",
      answer:
        "Ya, semua transaksi dilindungi dengan enkripsi SSL 256-bit dan sistem keamanan berlapis.",
    },
    {
      question: "Bagaimana cara cek status transaksi?",
      answer:
        "Anda dapat melihat status transaksi di menu Transaksi atau melalui notifikasi real-time di aplikasi.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  const getColorClasses = (color, type = "bg") => {
    const colorMap = {
      green: {
        bg: "bg-green-500",
        bgLight: "bg-green-50",
        text: "text-green-600",
        textDark: "text-green-700",
        border: "border-green-200",
        ring: "ring-green-500",
      },
      blue: {
        bg: "bg-blue-500",
        bgLight: "bg-blue-50",
        text: "text-blue-600",
        textDark: "text-blue-700",
        border: "border-blue-200",
        ring: "ring-blue-500",
      },
      purple: {
        bg: "bg-purple-500",
        bgLight: "bg-purple-50",
        text: "text-purple-600",
        textDark: "text-purple-700",
        border: "border-purple-200",
        ring: "ring-purple-500",
      },
      indigo: {
        bg: "bg-indigo-500",
        bgLight: "bg-indigo-50",
        text: "text-indigo-600",
        textDark: "text-indigo-700",
        border: "border-indigo-200",
        ring: "ring-indigo-500",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-xl">
              <PhoneIconSolid className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tim customer service kami siap membantu Anda 24/7. Pilih cara yang
            paling nyaman untuk menghubungi kami.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => {
            const colors = getColorClasses(method.color);
            return (
              <a
                key={method.id}
                href={method.link}
                target={method.id === "whatsapp" ? "_blank" : "_self"}
                rel={method.id === "whatsapp" ? "noopener noreferrer" : ""}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.iconSolid className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`px-2 py-1 ${colors.bgLight} ${colors.border} border rounded-full`}
                    >
                      <span className={`text-xs font-semibold ${colors.text}`}>
                        {method.available}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <p
                    className={`text-sm font-semibold ${colors.textDark} mb-2`}
                  >
                    {method.value}
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <ClockIcon className="w-3 h-3" />
                    <span>Respon {method.response}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <PaperAirplaneIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Kirim Pesan
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Ceritakan masalah atau pertanyaan Anda dengan detail
                </p>
              </div>

              <div className="p-6">
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-900">
                          Pesan Terkirim!
                        </h4>
                        <p className="text-sm text-green-700">
                          Tim kami akan merespon dalam 2 jam kerja.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Kategori
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Pilih kategori</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subjek
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Ringkasan masalah"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Jelaskan masalah atau pertanyaan Anda dengan detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                      isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* FAQ Quick */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <QuestionMarkCircleIcon className="w-6 h-6 mr-3 text-yellow-600" />
                  FAQ Populer
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Pertanyaan yang sering ditanyakan
                </p>
              </div>

              <div className="p-6">
                {/* Scrollable FAQ List */}
                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-gray-100 hover:scrollbar-thumb-yellow-400 pr-2">
                  <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}

                    {/* Additional FAQ items for demonstration */}
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                        Bagaimana cara mengubah password?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Masuk ke menu Pengaturan, pilih Keamanan, lalu klik
                        "Ubah Password". Masukkan password lama dan password
                        baru.
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                        Apakah ada biaya untuk registrasi?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Tidak, registrasi akun di Bayaraja sepenuhnya gratis
                        tanpa biaya apapun.
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                        Bagaimana cara menghubungi customer service?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Anda dapat menghubungi kami melalui WhatsApp, telepon,
                        email, atau live chat yang tersedia 24/7.
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                        Apakah saldo bisa dikembalikan?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Saldo yang sudah masuk ke akun tidak dapat dikembalikan
                        sesuai syarat dan ketentuan yang berlaku.
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                        Bagaimana cara melihat riwayat transaksi?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Buka menu Transaksi di dashboard untuk melihat semua
                        riwayat transaksi Anda dengan detail lengkap.
                      </p>
                    </div>

                    <div className="pb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-relaxed">
                        Apakah ada program loyalitas?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Ya, kami memiliki program poin reward untuk setiap
                        transaksi yang dapat ditukar dengan berbagai hadiah
                        menarik.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full px-4 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-2xl transition-colors duration-200 text-sm font-medium">
                    Masih Ada Pertanyaan? Chat Kami
                  </button>
                </div>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 border border-orange-200/50">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-6 h-6 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <h4 className="font-bold text-orange-900 text-lg mb-1">
                  4.9/5
                </h4>
                <p className="text-sm text-orange-700 mb-3">
                  Dari 2,547 reviews
                </p>
                <div className="flex items-center justify-center space-x-1 text-xs text-orange-600">
                  <HeartIconSolid className="w-4 h-4" />
                  <span>Customer satisfaction rate 98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
