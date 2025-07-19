import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { digiflazzService } from "../../services/digiflazzService";
import {
  CurrencyDollarIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  SignalIcon,
  GlobeAltIcon,
  PuzzlePieceIcon,
  TvIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const PriceList = () => {
  const [selectedCategory, setSelectedCategory] = useState("prepaid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priceData, setPriceData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [
    { key: "prepaid", label: "Produk Prepaid", icon: SignalIcon },
    { key: "postpaid", label: "Produk Pascabayar", icon: BuildingLibraryIcon },
  ];

  const prepaidCategories = [
    { key: "Pulsa", label: "Pulsa & Paket Data", icon: SignalIcon },
    { key: "Data", label: "Paket Data", icon: GlobeAltIcon },
    { key: "PLN", label: "Token PLN", icon: BoltIcon },
    { key: "Games", label: "Voucher Game", icon: PuzzlePieceIcon },
    { key: "Voucher", label: "Voucher Digital", icon: ShoppingBagIcon },
    { key: "E-Money", label: "E-Wallet", icon: CreditCardIcon },
  ];

  // Fetch price list data
  const fetchPriceList = async (
    category = selectedCategory,
    showToast = true
  ) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (category === "prepaid") {
        response = await digiflazzService.getPrepaidPriceList();
      } else if (category === "postpaid") {
        response = await digiflazzService.getPostpaidPriceList();
      }

      if (response.success) {
        setRawData(response.data);

        // Transform data based on category
        let transformedData;
        if (category === "prepaid") {
          transformedData = digiflazzService.transformPrepaidData(
            response.data
          );
        } else {
          transformedData = digiflazzService.transformPostpaidData(
            response.data
          );
        }

        setPriceData(transformedData);

        if (showToast) {
          toast.success(`Berhasil memuat ${transformedData.length} provider`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        setError(response.error);
        setPriceData([]);
        if (showToast) {
          toast.error(`Gagal memuat data: ${response.error}`, {
            position: "top-right",
            autoClose: 4000,
          });
        }
      }
    } catch (err) {
      console.error("Error fetching price list:", err);
      setError(err.message);
      setPriceData([]);
      if (showToast) {
        toast.error("Terjadi kesalahan saat memuat data", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchPriceList(selectedCategory, false);
  }, []);

  // Refresh data when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchPriceList(selectedCategory, true);
    }
  }, [selectedCategory]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg">
            Tersedia
          </span>
        );
      case "maintenance":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-lg">
            Maintenance
          </span>
        );
      case "unavailable":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-lg">
            Tidak Tersedia
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg">
            Unknown
          </span>
        );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredData = priceData || [];
  const searchedData = filteredData
    .map((provider) => ({
      ...provider,
      products: provider.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((provider) => provider.products.length > 0);

  const selectedCategoryData = categories.find(
    (cat) => cat.key === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl">
            <CurrencyDollarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daftar Harga</h1>
            <p className="text-gray-500 text-sm">
              Cek harga terbaru semua produk digital
            </p>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center space-x-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center space-x-3 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 min-w-64"
            >
              <div className="flex items-center space-x-3">
                {selectedCategoryData && (
                  <>
                    <selectedCategoryData.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      {selectedCategoryData.label}
                    </span>
                  </>
                )}
              </div>
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl z-50 py-2">
                <div className="grid grid-cols-1 gap-1">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => {
                        setSelectedCategory(category.key);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-xl mx-2 ${
                        selectedCategory === category.key
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700"
                      }`}
                    >
                      <category.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => fetchPriceList(selectedCategory)}
            disabled={loading}
            className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                <span>Memuat...</span>
              </>
            ) : (
              <>
                <BoltIcon className="w-4 h-4" />
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <CurrencyDollarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-bold text-gray-900 truncate">
                {filteredData.reduce(
                  (total, provider) => total + provider.products.length,
                  0
                )}
              </p>
              <p className="text-sm text-gray-500">Total Produk</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <BoltIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-bold text-gray-900 truncate">
                {filteredData.length}
              </p>
              <p className="text-sm text-gray-500">Provider Aktif</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              {selectedCategoryData && (
                <selectedCategoryData.icon className="w-5 h-5 text-purple-600" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold text-gray-900 truncate">
                {selectedCategoryData?.label}
              </p>
              <p className="text-sm text-gray-500">Kategori Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price List */}
      <div className="space-y-6">
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
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
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Memuat Data Harga...
            </h3>
            <p className="text-gray-500">Mengambil data terbaru dari server</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gagal Memuat Data
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => fetchPriceList(selectedCategory)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && searchedData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Coba ubah kata kunci pencarian atau pilih kategori lain"
                : "Tidak ada data untuk kategori yang dipilih"}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          searchedData.length > 0 &&
          searchedData.map((provider, index) => (
            <div
              key={provider.provider}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-4 sm:px-6 py-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {provider.provider}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {provider.products.length} produk tersedia
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-white/80 text-xs font-medium text-gray-700 rounded-full border">
                      {selectedCategoryData?.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Mobile Card Layout */}
                <div className="block lg:hidden space-y-3">
                  {provider.products.map((product, productIndex) => (
                    <div
                      key={productIndex}
                      className="bg-gray-50/50 rounded-xl p-4 hover:bg-gray-100/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {product.name}
                          </h4>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(product.status)}
                        </div>
                      </div>
                      <button
                        disabled={product.status !== "available"}
                        className={`w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                          product.status === "available"
                            ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {product.status === "available"
                          ? "Beli Sekarang"
                          : "Tidak Tersedia"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-900">
                          Produk
                        </th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-900">
                          Harga
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {provider.products.map((product, productIndex) => (
                        <tr
                          key={productIndex}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-2">
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <span className="font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-center">
                            {getStatusBadge(product.status)}
                          </td>
                          <td className="py-4 px-2 text-center">
                            <button
                              disabled={product.status !== "available"}
                              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                                product.status === "available"
                                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {product.status === "available"
                                ? "Beli"
                                : "Tidak Tersedia"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Footer Info */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-200/50">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <BoltIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Informasi Penting
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Harga dapat berubah sewaktu-waktu tanpa pemberitahuan</li>
              <li>• Transaksi akan diproses otomatis 24/7</li>
              <li>• Produk yang sedang maintenance sementara tidak tersedia</li>
              <li>
                • Untuk pertanyaan lebih lanjut, hubungi customer service kami
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
