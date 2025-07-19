import {
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      await onConfirm();
    } catch (error) {
      setIsLoading(false);
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Modal Portal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        />

        {/* Modal Container */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md mx-auto transform transition-all duration-300 z-10"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: "modalIn 0.3s ease-out forwards",
          }}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <ExclamationTriangleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Konfirmasi Logout
              </h3>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-transparent"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ArrowRightOnRectangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                  Apakah Anda yakin ingin keluar?
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Anda akan keluar dari dashboard dan perlu login kembali untuk
                  mengakses akun Anda. Pastikan Anda telah menyimpan semua
                  pekerjaan sebelum logout.
                </p>
              </div>
            </div>

            {/* Session Info */}
            <div className="mt-4 sm:mt-6 bg-gray-50 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Sesi login terakhir:</span>
                <span className="font-medium text-gray-900 text-right">
                  {new Date().toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm mt-2">
                <span className="text-gray-600">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] order-1 sm:order-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading ? (
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
                    <span>Keluar...</span>
                  </>
                ) : (
                  <>
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Ya, Keluar</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default LogoutModal;
