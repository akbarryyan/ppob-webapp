import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const TransactionsList = ({ recentTransactions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return CheckCircleIcon;
      case "pending":
        return ClockIcon;
      case "failed":
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Riwayat Transaksi
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Kelola dan pantau semua transaksi Anda
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <FunnelIcon className="w-5 h-5 mr-2 text-gray-500" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {recentTransactions.map((transaction, index) => {
          const StatusIcon = getStatusIcon(transaction.status);
          return (
            <div
              key={index}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                index !== recentTransactions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    <StatusIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      {transaction.type}
                    </div>
                    <div className="text-gray-500 mb-1">
                      {transaction.target}
                    </div>
                    <div className="text-sm text-gray-400">
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold text-xl mb-2 ${
                      transaction.amount > 0
                        ? "text-emerald-600"
                        : "text-gray-900"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}Rp{" "}
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {transaction.id}
                  </div>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status === "success"
                      ? "Berhasil"
                      : transaction.status === "pending"
                      ? "Pending"
                      : "Gagal"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionsList;
