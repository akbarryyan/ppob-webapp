import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PhoneIcon,
  BoltIcon,
  WifiIcon,
  TvIcon,
  CreditCardIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  ChevronRightIcon,
  XMarkIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const NewTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [stepProgress, setStepProgress] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);

  const categories = [
    {
      id: "pulsa",
      icon: PhoneIcon,
      title: "Pulsa",
      description: "Isi pulsa semua operator",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      popular: true,
    },
    {
      id: "token",
      icon: BoltIcon,
      title: "Token PLN",
      description: "Beli token listrik PLN",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      popular: true,
    },
    {
      id: "data",
      icon: WifiIcon,
      title: "Paket Data",
      description: "Paket internet unlimited",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      popular: true,
    },
    {
      id: "streaming",
      icon: TvIcon,
      title: "Streaming",
      description: "Netflix, Disney+, Spotify",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      popular: true,
    },
    {
      id: "ewallet",
      icon: CreditCardIcon,
      title: "E-Wallet",
      description: "Top up OVO, GoPay, DANA",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  // Check if category was passed from navigation
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setIsNavigating(true);
      // Simulate loading time for smooth transition
      setTimeout(() => {
        const categoryName = location.state.selectedCategory;
        const category = categories.find(
          (cat) =>
            cat.title.toLowerCase() === categoryName || cat.id === categoryName
        );
        if (category) {
          setSelectedCategory(category);
          setStepProgress(2);
        }
        setIsNavigating(false);
      }, 800);
    }
  }, [location.state]);

  // Validate phone number
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phone) {
      setPhoneError("Nomor telepon harus diisi");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError("Format nomor telepon tidak valid");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleCategorySelect = async (category) => {
    setIsLoading(true);
    setStepProgress(2);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setSelectedCategory(category);
    setSelectedProduct(null);
    setIsLoading(false);
  };

  const handleProductSelect = async (product) => {
    setIsLoading(true);

    // Simulate product validation delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    setSelectedProduct(product);
    setStepProgress(3);
    setIsLoading(false);
  };

  const handlePhoneNumberChange = async (value) => {
    setPhoneNumber(value);
    setPhoneError("");

    if (value.length >= 10) {
      setIsValidating(true);
      // Simulate phone validation delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      validatePhoneNumber(value);
      setIsValidating(false);
    }
  };

  const handleProceed = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsProcessing(false);
    setShowConfirmation(true);
  };

  const handleConfirmTransaction = async () => {
    setIsProcessing(true);

    // Simulate transaction processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setSuccessMessage("Transaksi berhasil diproses!");

    // Show success message then navigate
    setTimeout(() => {
      navigate("/dashboard/transactions");
    }, 1500);
  };

  const handleBack = async () => {
    setIsLoading(true);

    if (selectedProduct) {
      setSelectedProduct(null);
      setStepProgress(2);
    } else if (selectedCategory) {
      setSelectedCategory(null);
      setStepProgress(1);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  const products = {
    pulsa: [
      {
        id: 1,
        name: "Pulsa 5K",
        price: 6000,
        operator: "Telkomsel",
        discount: 5,
        popular: true,
      },
      {
        id: 2,
        name: "Pulsa 10K",
        price: 11000,
        operator: "Telkomsel",
        discount: 8,
        popular: true,
      },
      {
        id: 3,
        name: "Pulsa 20K",
        price: 21000,
        operator: "Telkomsel",
        discount: 10,
      },
      {
        id: 4,
        name: "Pulsa 25K",
        price: 26000,
        operator: "Telkomsel",
        discount: 12,
      },
      {
        id: 5,
        name: "Pulsa 50K",
        price: 51000,
        operator: "Telkomsel",
        discount: 15,
      },
      {
        id: 6,
        name: "Pulsa 100K",
        price: 101000,
        operator: "Telkomsel",
        discount: 20,
      },
    ],
    data: [
      {
        id: 7,
        name: "1GB 7 Hari",
        price: 8000,
        operator: "Telkomsel",
        discount: 10,
        popular: true,
      },
      {
        id: 8,
        name: "2GB 14 Hari",
        price: 15000,
        operator: "Telkomsel",
        discount: 15,
        popular: true,
      },
      {
        id: 9,
        name: "5GB 30 Hari",
        price: 35000,
        operator: "Telkomsel",
        discount: 20,
      },
      {
        id: 10,
        name: "10GB 30 Hari",
        price: 65000,
        operator: "Telkomsel",
        discount: 25,
      },
    ],
    token: [
      {
        id: 11,
        name: "Token 20K",
        price: 22000,
        operator: "PLN",
        discount: 0,
        popular: true,
      },
      {
        id: 12,
        name: "Token 50K",
        price: 52000,
        operator: "PLN",
        discount: 0,
        popular: true,
      },
      {
        id: 13,
        name: "Token 100K",
        price: 102000,
        operator: "PLN",
        discount: 0,
      },
      {
        id: 14,
        name: "Token 200K",
        price: 202000,
        operator: "PLN",
        discount: 0,
      },
    ],
  };

  // Loading Component
  const LoadingSpinner = ({ size = "md", text = "Memuat..." }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    return (
      <div className="flex items-center justify-center space-x-2">
        <Cog6ToothIcon
          className={`${sizeClasses[size]} animate-spin text-blue-600`}
        />
        <span className="text-gray-600 text-sm">{text}</span>
      </div>
    );
  };

  // Progress Steps Component
  const StepProgress = () => {
    const steps = [
      { number: 1, title: "Pilih Kategori", completed: stepProgress > 1 },
      { number: 2, title: "Pilih Produk", completed: stepProgress > 2 },
      { number: 3, title: "Detail Transaksi", completed: stepProgress > 3 },
    ];

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                step.completed || stepProgress === step.number
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {step.completed ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>
            <span
              className={`ml-2 text-xs sm:text-sm font-medium ${
                step.completed || stepProgress === step.number
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 mx-3 transition-all duration-300 ${
                  step.completed ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 font-['Hanken_Grotesk']">
      {/* Loading Overlay */}
      {(isNavigating || isLoading) && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200/50">
            <LoadingSpinner
              size="lg"
              text={isNavigating ? "Memuat halaman..." : "Memproses..."}
            />
          </div>
        </div>
      )}

      {/* Success Message Overlay */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200/50 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-600 mb-4">{successMessage}</p>
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" text="Mengalihkan..." />
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
                disabled={isLoading || isProcessing}
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Transaksi Baru
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  {selectedCategory && selectedProduct
                    ? "Lengkapi detail transaksi"
                    : selectedCategory
                    ? "Pilih produk yang ingin dibeli"
                    : "Pilih kategori dan produk yang ingin Anda beli"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-xl">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Transaksi Aman
                </span>
              </div>
              {isProcessing && (
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-xl">
                  <LoadingSpinner size="sm" text="" />
                  <span className="text-sm font-medium text-blue-700">
                    Memproses
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Steps */}
        <StepProgress />
        {!selectedCategory ? (
          // Category Selection
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-200/50 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900">
                      2.8M
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Saldo Anda
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-200/50 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900">
                      98%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Success Rate
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-200/50 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900">
                      &lt;30s
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Avg Process
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-200/50 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <UserGroupIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900">
                      1M+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Happy Users
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Kategori Popular
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Pilih kategori transaksi yang paling sering digunakan
                  </p>
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-blue-700 text-sm font-medium">
                    🔥 Trending
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categories
                  .filter((cat) => cat.popular)
                  .map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className="group relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="absolute top-3 right-3">
                        <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-center">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 text-center leading-relaxed">
                        {category.description}
                      </p>
                    </button>
                  ))}
              </div>
            </div>

            {/* All Categories */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Semua Kategori
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    disabled={isLoading}
                    className="group bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center text-sm">
                      {category.title}
                    </h3>
                    {category.popular && (
                      <div className="mt-2 flex justify-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                          Popular
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : !selectedProduct ? (
          // Product Selection
          <div className="space-y-6">
            {/* Category Header */}
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 shadow-lg">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <selectedCategory.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedCategory.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Pilih Produk
              </h3>
              {isLoading ? (
                <div className="py-12">
                  <LoadingSpinner size="lg" text="Memuat produk..." />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products[selectedCategory.id]?.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      disabled={isLoading}
                      className="group bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-bold text-gray-900">
                              {product.name}
                            </h4>
                            {product.popular && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {product.operator}
                          </p>
                        </div>
                        {product.discount > 0 && (
                          <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            Rp {product.price.toLocaleString()}
                          </div>
                          {product.discount > 0 && (
                            <div className="text-sm text-gray-500 line-through">
                              Rp{" "}
                              {Math.round(
                                product.price / (1 - product.discount / 100)
                              ).toLocaleString()}
                            </div>
                          )}
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Transaction Form
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Selected Product */}
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${selectedCategory.color} rounded-xl flex items-center justify-center`}
                >
                  <selectedCategory.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedProduct.operator}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    Rp {selectedProduct.price.toLocaleString()}
                  </div>
                  {selectedProduct.discount > 0 && (
                    <div className="text-sm text-red-600">
                      Hemat {selectedProduct.discount}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 shadow-lg">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nomor Tujuan
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Masukkan nomor telepon"
                  disabled={isProcessing}
                  className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    phoneError
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {isValidating && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <LoadingSpinner size="sm" text="" />
                  </div>
                )}
              </div>

              {phoneError && (
                <div className="mt-2 flex items-center space-x-2 text-red-600">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span className="text-sm">{phoneError}</span>
                </div>
              )}

              {!phoneError && phoneNumber && !isValidating && (
                <div className="mt-2 flex items-center space-x-2 text-green-600">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span className="text-sm">Nomor valid</span>
                </div>
              )}

              <div className="mt-2 flex items-center space-x-2">
                <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Pastikan nomor tujuan sudah benar sebelum melanjutkan
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBack}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner size="sm" text="" /> : "Kembali"}
              </button>
              <button
                onClick={handleProceed}
                disabled={
                  !phoneNumber || phoneError || isProcessing || isValidating
                }
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" text="" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  "Lanjutkan"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Konfirmasi Transaksi
              </h3>
              <p className="text-gray-600">
                Pastikan detail transaksi sudah benar
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Produk:</span>
                <span className="font-medium">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nomor Tujuan:</span>
                <span className="font-medium">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bayar:</span>
                <span className="font-bold text-lg">
                  Rp {selectedProduct.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmTransaction}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" text="" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  "Konfirmasi"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-600 mb-4">{successMessage}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <LoadingSpinner size="sm" text="" />
              <span>Mengarahkan ke riwayat transaksi...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTransaction;
