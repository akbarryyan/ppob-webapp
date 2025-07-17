import { UserIcon } from "@heroicons/react/24/outline";

const ProfileSection = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <UserIcon className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">John Doe</h2>
            <p className="text-blue-100 text-lg">Premium Member</p>
            <p className="text-blue-200 text-sm">
              Bergabung sejak Januari 2024
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Informasi Pribadi
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900 font-medium">john.doe@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Nomor Telepon
              </label>
              <p className="text-gray-900 font-medium">+62 812 3456 7890</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tanggal Lahir
              </label>
              <p className="text-gray-900 font-medium">15 Agustus 1995</p>
            </div>
            <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-colors">
              Edit Profil
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Pengaturan Akun
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Notifikasi Push</p>
                <p className="text-sm text-gray-500">
                  Terima notifikasi transaksi
                </p>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Email Marketing</p>
                <p className="text-sm text-gray-500">Terima penawaran khusus</p>
              </div>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
            <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-medium transition-colors">
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
