import { useState } from "react";
import { toast } from "react-toastify";
import {
  CloudArrowDownIcon,
  ServerIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const AdminPriceSync = () => {
  const [loading, setLoading] = useState(false);
  const [syncStats, setSyncStats] = useState(null);

  const getAuthToken = () => {
    // Use the same token key as AdminAuthService
    const adminToken =
      localStorage.getItem("adminAuthToken") ||
      sessionStorage.getItem("adminAuthToken");
    console.log("AdminPriceSync - adminAuthToken:", adminToken);

    if (adminToken) {
      return adminToken;
    }

    // Fallback to regular token (shouldn't be needed for admin)
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    console.log("AdminPriceSync - fallback localStorage token:", localToken);
    console.log(
      "AdminPriceSync - fallback sessionStorage token:",
      sessionToken
    );
    return localToken || sessionToken;
  };

  const syncPrepaidPriceList = async () => {
    setLoading(true);
    setSyncStats(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        "http://localhost:8000/api/digiflazz/sync-prepaid-price-list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSyncStats(data);
        toast.success(
          `Berhasil sync ${data.total_processed} produk prepaid! (${data.synced_count} baru, ${data.updated_count} diperbarui)`,
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      } else {
        throw new Error(data.message || "Sync failed");
      }
    } catch (error) {
      console.error("Error syncing prepaid price list:", error);
      toast.error(`Gagal sync data prepaid: ${error.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
          <ServerIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Price Sync</h1>
          <p className="text-gray-500 text-sm">
            Sinkronisasi daftar harga dari Digiflazz ke database
          </p>
        </div>
      </div>

      {/* Sync Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prepaid Sync */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/30 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <CloudArrowDownIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Produk Prepaid
                </h3>
                <p className="text-sm text-gray-600">
                  Sinkronisasi daftar harga produk prepaid
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-600">Ready</span>
                </span>
              </div>

              {syncStats && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Processed:</span>
                    <span className="font-medium text-gray-900">
                      {syncStats.total_processed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">New Products:</span>
                    <span className="font-medium text-green-600">
                      {syncStats.synced_count}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Updated Products:</span>
                    <span className="font-medium text-blue-600">
                      {syncStats.updated_count}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={syncPrepaidPriceList}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    <span>Sedang Sync...</span>
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="w-5 h-5" />
                    <span>Sync Prepaid Price List</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Postpaid Sync - Coming Soon */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow opacity-50">
          <div className="bg-gradient-to-r from-orange-50 to-red-50/30 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <CloudArrowDownIcon className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Produk Postpaid
                </h3>
                <p className="text-sm text-gray-600">
                  Sinkronisasi daftar harga produk postpaid
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-600">Coming Soon</span>
                </span>
              </div>

              <button
                disabled
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
              >
                <ClockIcon className="w-5 h-5" />
                <span>Coming Soon</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-200/50">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <CheckCircleIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Auto Update</h4>
              <p className="text-sm text-gray-600">
                Data akan diperbarui otomatis berdasarkan harga terbaru dari
                Digiflazz
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50/50 rounded-2xl p-4 border border-green-200/50">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <ServerIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Database</h4>
              <p className="text-sm text-gray-600">
                Semua data disimpan di database lokal untuk performa yang lebih
                cepat
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50/50 rounded-2xl p-4 border border-yellow-200/50">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <ExclamationCircleIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Penting</h4>
              <p className="text-sm text-gray-600">
                Lakukan sync secara berkala untuk mendapatkan harga terbaru
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPriceSync;
