import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const StatsSection = ({ userPoints }) => {
  const stats = [
    {
      title: "Total Transaksi",
      value: "248",
      change: "+12%",
      positive: true,
      period: "Bulan ini",
    },
    {
      title: "Pengeluaran",
      value: "Rp 1.2M",
      change: "-5%",
      positive: true,
      period: "Bulan ini",
    },
    {
      title: "Cashback",
      value: "Rp 65K",
      change: "+18%",
      positive: true,
      period: "Bulan ini",
    },
    {
      title: "Poin Reward",
      value: userPoints.toLocaleString(),
      change: "+25",
      positive: true,
      period: "Hari ini",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Statistik Transaksi
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {stat.title}
              </h4>
              <div
                className={`flex items-center text-xs font-bold px-3 py-1 rounded-full ${
                  stat.positive
                    ? "text-emerald-700 bg-emerald-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
