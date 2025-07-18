import { useState } from "react";
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  UserIcon,
  GiftIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  DashboardSidebar,
  DashboardHeader,
  WelcomeCard,
  QuickActions,
  StatsSection,
  RecentTransactions,
  TransactionsList,
  ProfileSection,
  PlaceholderTab,
  Notifications,
} from "../components/dashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const userBalance = 2850000;
  const userPoints = 1240;

  const recentTransactions = [
    {
      id: "TRX001",
      type: "Pulsa Telkomsel",
      amount: -50000,
      status: "success",
      date: "2025-01-18 14:30",
      target: "0812****7890",
    },
    {
      id: "TRX002",
      type: "Token PLN",
      amount: -100000,
      status: "success",
      date: "2025-01-18 12:15",
      target: "123****890",
    },
    {
      id: "TRX003",
      type: "Top Up Saldo",
      amount: 500000,
      status: "success",
      date: "2025-01-18 09:20",
      target: "Bank Transfer",
    },
    {
      id: "TRX004",
      type: "Paket Data XL",
      amount: -85000,
      status: "pending",
      date: "2025-01-18 08:45",
      target: "0817****5432",
    },
    {
      id: "TRX005",
      type: "Netflix Premium",
      amount: -186000,
      status: "failed",
      date: "2025-01-17 20:10",
      target: "user@email.com",
    },
  ];

  const menuItems = [
    { icon: HomeIcon, label: "Overview", key: "overview" },
    { icon: CreditCardIcon, label: "Transaksi", key: "transactions" },
    { icon: ChartBarIcon, label: "Statistik", key: "statistics" },
    { icon: BellIcon, label: "Notifikasi", key: "notifications" },
    { icon: GiftIcon, label: "Reward", key: "rewards" },
    { icon: UserIcon, label: "Profil", key: "profile" },
    { icon: Cog6ToothIcon, label: "Pengaturan", key: "settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 font-['Hanken_Grotesk']">
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <DashboardHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Welcome Section & Balance */}
              <WelcomeCard userBalance={userBalance} />

              {/* Quick Actions - Product Categories */}
              <QuickActions />

              {/* Statistics */}
              <StatsSection userPoints={userPoints} />

              {/* Recent Transactions */}
              <RecentTransactions
                recentTransactions={recentTransactions}
                setActiveTab={setActiveTab}
              />
            </div>
          )}

          {activeTab === "transactions" && (
            <TransactionsList recentTransactions={recentTransactions} />
          )}

          {activeTab === "notifications" && <Notifications />}

          {activeTab === "profile" && <ProfileSection />}

          {/* Placeholder for other tabs */}
          {activeTab !== "overview" &&
            activeTab !== "transactions" &&
            activeTab !== "notifications" &&
            activeTab !== "profile" && (
              <PlaceholderTab activeTab={activeTab} menuItems={menuItems} />
            )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
