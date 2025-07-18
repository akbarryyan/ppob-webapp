import {
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Transaksi Berhasil",
      message:
        "Pembelian pulsa Telkomsel 50.000 untuk 0812****7890 telah berhasil diproses",
      time: "5 menit yang lalu",
      isRead: false,
      action: "Lihat Detail",
    },
    {
      id: 2,
      type: "warning",
      title: "Saldo Rendah",
      message:
        "Saldo Anda tinggal Rp 150.000. Segera top up untuk melanjutkan transaksi",
      time: "1 jam yang lalu",
      isRead: false,
      action: "Top Up Sekarang",
    },
    {
      id: 3,
      type: "info",
      title: "Promo Terbaru!",
      message:
        "Dapatkan cashback 20% untuk pembelian token PLN hingga 31 Januari 2025",
      time: "2 jam yang lalu",
      isRead: true,
      action: "Lihat Promo",
    },
    {
      id: 4,
      type: "error",
      title: "Transaksi Gagal",
      message:
        "Pembelian paket data XL gagal diproses. Dana akan dikembalikan dalam 1x24 jam",
      time: "3 jam yang lalu",
      isRead: true,
      action: "Hubungi CS",
    },
    {
      id: 5,
      type: "success",
      title: "Top Up Berhasil",
      message:
        "Top up saldo sebesar Rp 500.000 via Bank Transfer telah berhasil",
      time: "1 hari yang lalu",
      isRead: true,
      action: "Lihat Riwayat",
    },
    {
      id: 6,
      type: "info",
      title: "Update Sistem",
      message:
        "Sistem akan mengalami maintenance pada 20 Januari 2025 pukul 02:00-04:00 WIB",
      time: "2 hari yang lalu",
      isRead: true,
      action: "Selengkapnya",
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
      case "error":
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      case "info":
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
      default:
        return <BellIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  const getNotificationBg = (type, isRead) => {
    if (isRead) {
      return "bg-gray-50/50 border-gray-200/50";
    }

    switch (type) {
      case "success":
        return "bg-green-50/80 border-green-200/50";
      case "warning":
        return "bg-yellow-50/80 border-yellow-200/50";
      case "error":
        return "bg-red-50/80 border-red-200/50";
      case "info":
        return "bg-blue-50/80 border-blue-200/50";
      default:
        return "bg-white border-gray-200/50";
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
            <BellIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-500 text-sm">
              {unreadCount > 0
                ? `${unreadCount} notifikasi belum dibaca`
                : "Semua notifikasi sudah dibaca"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors">
              Tandai Semua Dibaca
            </button>
          )}
          <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <BellIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.length}
              </p>
              <p className="text-sm text-gray-500">Total Notifikasi</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-500">Belum Dibaca</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <CheckCircleSolid className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.length - unreadCount}
              </p>
              <p className="text-sm text-gray-500">Sudah Dibaca</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Notifikasi Terbaru
        </h2>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`relative p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${getNotificationBg(
                notification.type,
                notification.isRead
              )}`}
            >
              {/* Unread indicator */}
              {!notification.isRead && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              )}

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-semibold ${
                          notification.isRead
                            ? "text-gray-700"
                            : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          notification.isRead
                            ? "text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.message}
                      </p>

                      {/* Time and Action */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <ClockIcon className="w-4 h-4" />
                          <span>{notification.time}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <button className="p-1 text-gray-500 hover:text-blue-500 transition-colors">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          )}
                          <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                            {notification.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
          Muat Lebih Banyak
        </button>
      </div>
    </div>
  );
};

export default Notifications;
