import { useState } from "react";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  GiftIcon,
  BoltIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPromo: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration data:", formData);
  };

  const benefits = [
    {
      icon: GiftIcon,
      title: "Bonus Cashback 50%",
      description: "Untuk transaksi pertama hingga Rp 100.000",
      highlight: "EKSKLUSIF",
    },
    {
      icon: BoltIcon,
      title: "Akses Premium Gratis",
      description: "Fitur premium selama 3 bulan pertama",
      highlight: "TERBATAS",
    },
    {
      icon: UserGroupIcon,
      title: "Komunitas Eksklusif",
      description: "Join grup member dengan tips & promo spesial",
      highlight: "VIP",
    },
  ];

  const features = [
    "Transaksi aman dengan enkripsi SSL 256-bit",
    "Proses instant dalam hitungan detik",
    "Harga terbaik dengan cashback hingga 15%",
    "Support 24/7 dari tim profesional",
    "Multi-platform: Web, Mobile, API",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-['Hanken_Grotesk'] flex">
      {/* Left Content Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-800/90"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* Logo */}
          <div className="mb-12">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold">Bayaraja</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Bergabung dengan
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  50,000+ Pengguna
                </span>
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Daftar sekarang dan rasakan kemudahan bertransaksi digital
                dengan platform terpercaya #1 di Indonesia.
              </p>
            </div>

            {/* Special Offers */}
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-yellow-400/30">
              <div className="flex items-center mb-4">
                <FireIcon className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-bold text-sm">
                  PENAWARAN TERBATAS!
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Dapatkan Bonus Eksklusif Member Baru
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-semibold text-white mr-2">
                          {benefit.title}
                        </h4>
                        <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-1 rounded-full font-bold">
                          {benefit.highlight}
                        </span>
                      </div>
                      <p className="text-purple-100 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-xs font-medium">
                  ⏰ Berlaku sampai akhir bulan ini!
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-lg">
                Mengapa Memilih Bayaraja?
              </h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-purple-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  99.9%
                </div>
                <div className="text-purple-100 text-xs">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  5⭐
                </div>
                <div className="text-purple-100 text-xs">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  24/7
                </div>
                <div className="text-purple-100 text-xs">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-16 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Bayaraja
              </span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Buat Akun Baru
            </h2>
            <p className="text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nomor Telepon
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="08xx-xxxx-xxxx"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Minimal 8 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Konfirmasi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Promo Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-3 block text-sm text-gray-900"
                >
                  Saya setuju dengan{" "}
                  <Link
                    to="/terms"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link
                    to="/privacy"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="agreeToPromo"
                  name="agreeToPromo"
                  type="checkbox"
                  checked={formData.agreeToPromo}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="agreeToPromo"
                  className="ml-3 block text-sm text-gray-900"
                >
                  Saya ingin menerima promo dan update terbaru via email
                </label>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex items-center">
                Daftar Sekarang
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
          </form>

          {/* Social Register */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Atau daftar dengan
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <span>Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center pt-6 border-t border-gray-200">
            <div className="flex justify-center items-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-1 text-green-500" />
                SSL Secure
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1 text-purple-500" />
                Data Aman
              </div>
              <div className="flex items-center">
                <GiftIcon className="w-4 h-4 mr-1 text-yellow-500" />
                Bonus 50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
