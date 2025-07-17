import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const RecentTransactions = ({ recentTransactions, setActiveTab }) => {
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Transaksi Terbaru</h3>
        <button
          onClick={() => setActiveTab("transactions")}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          Lihat Semua →
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {recentTransactions.slice(0, 5).map((transaction, index) => {
          const StatusIcon = getStatusIcon(transaction.status);
          return (
            <div
              key={index}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                index !== 4 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    <StatusIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {transaction.target}
                    </div>
                    <div className="text-xs text-gray-400">
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold text-lg mb-1 ${
                      transaction.amount > 0
                        ? "text-emerald-600"
                        : "text-gray-900"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}Rp{" "}
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {transaction.id}
                  </div>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
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

export default RecentTransactions;
