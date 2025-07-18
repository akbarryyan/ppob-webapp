import {
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Portal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4"
        style={{
          zIndex: 99999,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Backdrop Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
        />

        {/* Modal Container */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md transform transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: "modalIn 0.3s ease-out forwards",
            marginLeft: "-32px", // Lebih ke kiri untuk center yang tepat
            zIndex: 2,
            position: "relative",
          }}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Konfirmasi Logout
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  Apakah Anda yakin ingin keluar?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Anda akan keluar dari dashboard dan perlu login kembali untuk
                  mengakses akun Anda. Pastikan Anda telah menyimpan semua
                  pekerjaan sebelum logout.
                </p>
              </div>
            </div>

            {/* Session Info */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Sesi login terakhir:</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-2">
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span>Ya, Keluar</span>
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
