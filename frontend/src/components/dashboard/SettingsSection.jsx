import {
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  CreditCardIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const SettingsSection = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    twoFactorAuth: true,
  });

  const [appearance, setAppearance] = useState({
    theme: "light", // light, dark, auto
    language: "id",
    currency: "IDR",
  });

  const [security, setSecurity] = useState({
    autoLogout: "30", // minutes
    sessionTimeout: true,
    deviceTrust: true,
  });

  const toggleSwitch = (category, key) => {
    if (category === "notifications") {
      setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    } else if (category === "privacy") {
      setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
    } else if (category === "security") {
      setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const ToggleSwitch = ({ enabled, onToggle, size = "default" }) => {
    const sizeClasses = size === "small" ? "w-10 h-5" : "w-12 h-6";
    const dotClasses =
      size === "small" ? "w-4 h-4 translate-x-5" : "w-5 h-5 translate-x-6";

    return (
      <button
        onClick={onToggle}
        className={`${sizeClasses} rounded-full relative transition-all duration-300 ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`${
            size === "small" ? "w-4 h-4" : "w-5 h-5"
          } bg-white rounded-full absolute top-0.5 transition-transform duration-300 shadow-sm ${
            enabled ? dotClasses : "translate-x-0.5"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
          Pengaturan Akun
        </h2>
        <p className="text-gray-600 text-lg">
          Kelola preferensi dan keamanan akun Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Settings */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <UserIcon className="w-6 h-6 mr-3 text-blue-600" />
                Profil & Akun
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Edit Profil</p>
                    <p className="text-sm text-gray-500">
                      Ubah nama, foto, dan info dasar
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 hover:bg-blue-50 rounded-lg transition-all">
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <CreditCardIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Metode Pembayaran
                    </p>
                    <p className="text-sm text-gray-500">
                      Kelola rekening dan e-wallet
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 hover:bg-blue-50 rounded-lg transition-all">
                  Kelola
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <EyeIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Profil Publik</p>
                    <p className="text-sm text-gray-500">
                      Tampilkan profil di leaderboard
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={privacy.profileVisible}
                  onToggle={() => toggleSwitch("privacy", "profileVisible")}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <ShieldCheckIcon className="w-6 h-6 mr-3 text-green-600" />
                Keamanan
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50/80 rounded-xl border border-green-200/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2FA Aktif</p>
                    <p className="text-sm text-gray-600">
                      Autentikasi dua faktor diaktifkan
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={privacy.twoFactorAuth}
                  onToggle={() => toggleSwitch("privacy", "twoFactorAuth")}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <KeyIcon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ubah Password</p>
                    <p className="text-sm text-gray-500">
                      Terakhir diubah 3 bulan lalu
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 hover:bg-blue-50 rounded-lg transition-all">
                  Ubah
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Auto Logout
                </label>
                <select
                  value={security.autoLogout}
                  onChange={(e) =>
                    setSecurity((prev) => ({
                      ...prev,
                      autoLogout: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="15">15 menit</option>
                  <option value="30">30 menit</option>
                  <option value="60">1 jam</option>
                  <option value="120">2 jam</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <BellIcon className="w-6 h-6 mr-3 text-purple-600" />
                Notifikasi
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Transaksi & update penting
                  </p>
                </div>
                <ToggleSwitch
                  enabled={notifications.email}
                  onToggle={() => toggleSwitch("notifications", "email")}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500">Notifikasi real-time</p>
                </div>
                <ToggleSwitch
                  enabled={notifications.push}
                  onToggle={() => toggleSwitch("notifications", "push")}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-gray-500">Konfirmasi via SMS</p>
                </div>
                <ToggleSwitch
                  enabled={notifications.sms}
                  onToggle={() => toggleSwitch("notifications", "sms")}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">Marketing Email</p>
                  <p className="text-sm text-gray-500">
                    Promo & penawaran khusus
                  </p>
                </div>
                <ToggleSwitch
                  enabled={notifications.marketing}
                  onToggle={() => toggleSwitch("notifications", "marketing")}
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <PaintBrushIcon className="w-6 h-6 mr-3 text-pink-600" />
                Tampilan
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() =>
                      setAppearance((prev) => ({ ...prev, theme: "light" }))
                    }
                    className={`p-3 border-2 rounded-xl transition-all ${
                      appearance.theme === "light"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <SunIcon className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                    <span className="text-sm font-medium">Light</span>
                  </button>

                  <button
                    onClick={() =>
                      setAppearance((prev) => ({ ...prev, theme: "dark" }))
                    }
                    className={`p-3 border-2 rounded-xl transition-all ${
                      appearance.theme === "dark"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <MoonIcon className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>

                  <button
                    onClick={() =>
                      setAppearance((prev) => ({ ...prev, theme: "auto" }))
                    }
                    className={`p-3 border-2 rounded-xl transition-all ${
                      appearance.theme === "auto"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <ComputerDesktopIcon className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                    <span className="text-sm font-medium">Auto</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Bahasa
                </label>
                <select
                  value={appearance.language}
                  onChange={(e) =>
                    setAppearance((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Mata Uang
                </label>
                <select
                  value={appearance.currency}
                  onChange={(e) =>
                    setAppearance((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="IDR">IDR - Rupiah</option>
                  <option value="USD">USD - Dollar</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-red-200/50 overflow-hidden">
        <div className="p-6 border-b border-red-200/50">
          <h3 className="text-xl font-bold text-red-900 flex items-center">
            <TrashIcon className="w-6 h-6 mr-3 text-red-600" />
            Zona Berbahaya
          </h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-3 p-4 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-200">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="font-semibold">Logout Semua Device</span>
          </button>

          <button className="flex items-center justify-center space-x-3 p-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200">
            <TrashIcon className="w-5 h-5" />
            <span className="font-semibold">Hapus Akun</span>
          </button>
        </div>

        <div className="p-6 bg-red-100/50">
          <p className="text-red-800 text-sm">
            ⚠️ <strong>Peringatan:</strong> Tindakan di atas tidak dapat
            dibatalkan. Pastikan Anda telah membackup data penting sebelum
            melanjutkan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
