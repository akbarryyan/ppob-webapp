import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { authService } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        // Store auth data
        authService.setToken(response.data.token, formData.rememberMe);
        authService.setUser(response.data.user, formData.rememberMe);

        // Show success toast
        toast.success(`Selamat datang, ${response.data.user.name}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to dashboard with slight delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (err) {
      // Show error toast
      toast.error(err.message || "Login gagal. Silakan coba lagi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Keamanan Terjamin",
      description: "Transaksi aman dengan enkripsi SSL 256-bit",
    },
    {
      icon: BoltIcon,
      title: "Proses Instan",
      description: "Transaksi selesai dalam hitungan detik",
    },
    {
      icon: CreditCardIcon,
      title: "Harga Terbaik",
      description: "Dapatkan cashback hingga 15% setiap transaksi",
    },
  ];

  const testimonials = [
    {
      name: "Andi Pratama",
      comment: "Platform terbaik untuk top up! Cepat dan aman.",
      rating: 5,
    },
    {
      name: "Sari Dewi",
      comment: "Cashback nya lumayan banget, jadi hemat bulanan.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-['Hanken_Grotesk'] flex">
      {/* Left Content Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-800/90"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

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
                Selamat Datang
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Kembali!
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Masuk ke akun Anda dan nikmati kemudahan bertransaksi digital
                dengan platform terpercaya pilihan jutaan pengguna.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  50K+
                </div>
                <div className="text-blue-100 text-sm">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  99.9%
                </div>
                <div className="text-blue-100 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  24/7
                </div>
                <div className="text-blue-100 text-sm">Support</div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Apa Kata Pengguna:</h3>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-1 mr-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-white text-sm">
                      {testimonial.name}
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))}
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bayaraja
              </span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Masuk ke Akun
            </h2>
            <p className="text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Masukkan email Anda"
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
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Masukkan password Anda"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Ingat saya
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Lupa password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Masuk...
                  </>
                ) : (
                  <>
                    Masuk
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Atau masuk dengan
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
                <CheckCircleIcon className="w-4 h-4 mr-1 text-blue-500" />
                Terpercaya
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-1 text-purple-500" />
                50K+ Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
