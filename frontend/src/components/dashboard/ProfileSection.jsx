import {
  UserIcon,
  PencilIcon,
  EnvelopeIcon,
  CreditCardIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  StarIcon,
  CameraIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const ProfileSection = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative p-6 sm:p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <UserIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 group">
                <CameraIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    John Doe
                  </h2>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                      <StarIcon className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      <span className="text-white text-sm font-medium">
                        Premium Member
                      </span>
                    </div>
                  </div>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Bergabung sejak Januari 2024 • ID: USR001234
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center space-x-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="text-blue-100 text-xs">Transaksi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-300">
                      98%
                    </div>
                    <div className="text-blue-100 text-xs">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <UserIcon className="w-6 h-6 mr-2 text-blue-600" />
                Informasi Pribadi
              </h3>
              <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200">
                <PencilIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Email Address
                  </label>
                  <p className="text-gray-900 font-semibold flex items-center">
                    <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                    john.doe@example.com
                  </p>
                </div>
                <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Nomor Telepon
                  </label>
                  <p className="text-gray-900 font-semibold">
                    +62 812 3456 7890
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Tanggal Lahir
                  </label>
                  <p className="text-gray-900 font-semibold">15 Agustus 1995</p>
                </div>
                <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Alamat
                  </label>
                  <p className="text-gray-900 font-semibold">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Balance & Stats */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCardIcon className="w-6 h-6 mr-2 text-blue-600" />
              Saldo & Statistik
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Saldo Aktif
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      Rp 1.250.000
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200/50 text-center">
                  <p className="text-2xl font-bold text-blue-600">47</p>
                  <p className="text-sm text-gray-600">Total Transaksi</p>
                </div>
                <div className="p-4 bg-purple-50/80 rounded-xl border border-purple-200/50 text-center">
                  <p className="text-2xl font-bold text-purple-600">98%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ClockIcon className="w-6 h-6 mr-2 text-purple-600" />
              Aktivitas Terbaru
            </h3>

            <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              <div className="space-y-3 pr-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      Top Up Berhasil
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 100.000 • 2 jam lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      Pulsa Indosat
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 25.000 • 5 jam lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      Token PLN
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 50.000 • 1 hari lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      BPJS Kesehatan
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 42.000 • 1 hari lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      Game Mobile Legends
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 85.000 • 2 hari lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      Paket Data XL
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 55.000 • 3 hari lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200">
                  <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      Top Up Saldo
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Rp 200.000 • 3 hari lalu
                    </p>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-white/80 to-transparent">
                <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm p-2 hover:bg-blue-50/50 rounded-lg transition-all duration-200 bg-white/60 backdrop-blur-sm border border-blue-200/50">
                  Lihat Semua Aktivitas
                </button>
              </div>
            </div>
          </div>

          {/* Favorite Services */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <StarIcon className="w-6 h-6 mr-2 text-yellow-600" />
              Layanan Favorit
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">Pulsa</div>
                  <div className="text-xs opacity-90">Quick Buy</div>
                </div>
              </button>

              <button className="p-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">PLN</div>
                  <div className="text-xs opacity-90">Token Listrik</div>
                </div>
              </button>

              <button className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">Game</div>
                  <div className="text-xs opacity-90">Top Up</div>
                </div>
              </button>

              <button className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">Data</div>
                  <div className="text-xs opacity-90">Internet</div>
                </div>
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCardIcon className="w-6 h-6 mr-2 text-orange-600" />
              Aksi Akun
            </h3>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <PencilIcon className="w-5 h-5" />
                <span className="font-semibold">Edit Profil Lengkap</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 p-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <CreditCardIcon className="w-5 h-5" />
                <span className="font-semibold">Upgrade ke Premium</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 p-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="font-semibold">Keluar dari Akun</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
