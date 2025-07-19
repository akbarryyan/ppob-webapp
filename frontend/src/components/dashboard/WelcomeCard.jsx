import { useState } from "react";
import { PlusIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const WelcomeCard = ({ setActiveTab }) => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  // Get user balance from user data, fallback to 0 if not available
  const userBalance = user?.balance || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Halo, {user?.name || "User"}! 👋
          </h2>
          <p className="text-blue-100 mb-6">
            Kelola transaksi digital Anda dengan mudah
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-200 mb-1">Saldo Anda</div>
              <div className="text-3xl font-bold">
                {showBalance
                  ? `Rp ${userBalance.toLocaleString()}`
                  : "Rp ••••••••"}
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {showBalance ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Top Up */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PlusIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Top Up Saldo</h3>
          <p className="text-gray-500 text-sm mb-6">
            Isi saldo untuk transaksi
          </p>
          <button
            onClick={() => setActiveTab("topup")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Top Up Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
