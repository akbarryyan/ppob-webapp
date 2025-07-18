import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  TrophyIcon as TrophyIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";

const LeaderboardSection = () => {
  const topUsers = [
    {
      id: 1,
      name: "Ahmad Rizki",
      transactions: 847,
      points: 12450,
      badge: "Diamond",
      avatar: "AR",
      rank: 1,
      growth: "+23%",
      specialty: "Gaming Top Up",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      transactions: 756,
      points: 11280,
      badge: "Platinum",
      avatar: "SN",
      rank: 2,
      growth: "+18%",
      specialty: "PLN & BPJS",
    },
    {
      id: 3,
      name: "Budi Santoso",
      transactions: 692,
      points: 10150,
      badge: "Gold",
      avatar: "BS",
      rank: 3,
      growth: "+15%",
      specialty: "Pulsa & Data",
    },
  ];

  const regularUsers = [
    {
      id: 4,
      name: "Maya Puspita",
      transactions: 543,
      points: 8420,
      badge: "Silver",
      avatar: "MP",
      rank: 4,
      growth: "+12%",
    },
    {
      id: 5,
      name: "Andi Wijaya",
      transactions: 487,
      points: 7650,
      badge: "Silver",
      avatar: "AW",
      rank: 5,
      growth: "+9%",
    },
    {
      id: 6,
      name: "Lina Marlina",
      transactions: 421,
      points: 6890,
      badge: "Bronze",
      avatar: "LM",
      rank: 6,
      growth: "+7%",
    },
    {
      id: 7,
      name: "Deni Kurniawan",
      transactions: 398,
      points: 6234,
      badge: "Bronze",
      avatar: "DK",
      rank: 7,
      growth: "+5%",
    },
    {
      id: 8,
      name: "Rina Fatmawati",
      transactions: 356,
      points: 5678,
      badge: "Bronze",
      avatar: "RF",
      rank: 8,
      growth: "+3%",
    },
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Diamond":
        return "from-cyan-400 to-blue-500";
      case "Platinum":
        return "from-gray-300 to-gray-500";
      case "Gold":
        return "from-yellow-400 to-yellow-600";
      case "Silver":
        return "from-gray-200 to-gray-400";
      case "Bronze":
        return "from-orange-400 to-orange-600";
      default:
        return "from-gray-100 to-gray-300";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <TrophyIconSolid className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <TrophyIconSolid className="w-6 h-6 text-gray-400" />;
      case 3:
        return <TrophyIconSolid className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getTopUserGradient = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 via-yellow-500 to-yellow-600";
      case 2:
        return "from-gray-300 via-gray-400 to-gray-500";
      case 3:
        return "from-orange-400 via-orange-500 to-orange-600";
      default:
        return "from-blue-400 via-blue-500 to-blue-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
            <TrophyIconSolid className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          Leaderboard Pengguna
        </h2>
        <p className="text-gray-600 text-lg">
          Top performer bulan ini berdasarkan transaksi dan poin reward
        </p>
      </div>

      {/* Top 3 Users - Podium Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl ${
              index === 0 ? "md:order-2 md:transform md:scale-105" : ""
            } ${index === 1 ? "md:order-1" : ""} ${
              index === 2 ? "md:order-3" : ""
            }`}
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getTopUserGradient(
                user.rank
              )} opacity-5`}
            ></div>

            {/* Crown for #1 */}
            {user.rank === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <StarIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            )}

            <div className="relative p-6 text-center">
              {/* Rank Badge */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getTopUserGradient(
                    user.rank
                  )} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  {getRankIcon(user.rank)}
                </div>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                    {user.avatar}
                  </div>
                  {/* Badge */}
                  <div
                    className={`absolute -bottom-2 -right-2 px-2 py-1 bg-gradient-to-r ${getBadgeColor(
                      user.badge
                    )} text-white text-xs font-bold rounded-full shadow-lg`}
                  >
                    {user.badge}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{user.specialty}</p>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl">
                  <span className="text-sm text-gray-600">Transaksi</span>
                  <span className="font-bold text-gray-900">
                    {user.transactions}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <span className="text-sm text-gray-600">Poin</span>
                  <div className="flex items-center space-x-1">
                    <StarIconSolid className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-gray-900">
                      {user.points.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 text-green-600">
                  <FireIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{user.growth}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regular Users - List Style */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-purple-600" />
            Peringkat Lainnya
          </h3>
        </div>

        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="divide-y divide-gray-200/50">
            {regularUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                      {user.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r ${getBadgeColor(
                        user.badge
                      )} text-white text-xs font-bold rounded-full shadow-lg`}
                    >
                      {user.badge.charAt(0)}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{user.transactions} transaksi</span>
                      <span className="flex items-center space-x-1">
                        <StarIconSolid className="w-3 h-3 text-yellow-500" />
                        <span>{user.points.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Growth */}
                  <div className="flex items-center space-x-1 text-green-600 flex-shrink-0">
                    <FireIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{user.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Ranking Card */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl overflow-hidden">
        <div className="relative p-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <UserIcon className="w-6 h-6 mr-2" />
                Peringkat Anda
              </h3>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-white text-sm font-semibold">#15</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-blue-100 text-sm">Transaksi</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-emerald-300">4,250</div>
                <div className="text-blue-100 text-sm">Poin Reward</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-yellow-300">Bronze</div>
                <div className="text-blue-100 text-sm">Badge Saat Ini</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-white text-sm">
                💡 <strong>Tips:</strong> Lakukan 44 transaksi lagi untuk naik
                ke peringkat Silver dan dapatkan bonus poin 500!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
