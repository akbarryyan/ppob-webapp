import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  UserIcon,
  PhoneIcon,
  Cog6ToothIcon,
  BellIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  DashboardSidebar,
  DashboardHeader,
  WelcomeCard,
  QuickActions,
  StatsSection,
  LeaderboardSection,
  SettingsSection,
  TopUpSection,
  ContactSection,
  RecentTransactions,
  TransactionsList,
  ProfileSection,
  PlaceholderTab,
  Notifications,
  PriceList,
  APIDocs,
  LogoutModal,
} from "../components/dashboard";

const Dashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section || "overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Update activeTab when URL changes
  useEffect(() => {
    if (section) {
      setActiveTab(section);
    } else {
      setActiveTab("overview");
    }
  }, [section]);

  // Custom setActiveTab that also updates URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
  };

  // Handle logout
  const handleLogout = () => {
    // In real app, this would handle logout logic
    console.log("User logged out");
    setShowLogoutModal(false);
    // Add your logout logic here (e.g., clear tokens, redirect to login)
  };

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
    {
      id: "TRX006",
      type: "Pulsa Indosat",
      amount: -25000,
      status: "success",
      date: "2025-01-17 18:25",
      target: "0856****1234",
    },
    {
      id: "TRX007",
      type: "Token PLN",
      amount: -200000,
      status: "success",
      date: "2025-01-17 16:40",
      target: "567****123",
    },
    {
      id: "TRX008",
      type: "Paket Data Telkomsel",
      amount: -65000,
      status: "success",
      date: "2025-01-17 14:55",
      target: "0812****9876",
    },
    {
      id: "TRX009",
      type: "Top Up OVO",
      amount: -150000,
      status: "pending",
      date: "2025-01-17 13:10",
      target: "0821****5555",
    },
    {
      id: "TRX010",
      type: "Spotify Premium",
      amount: -54000,
      status: "success",
      date: "2025-01-17 11:30",
      target: "music@email.com",
    },
    {
      id: "TRX011",
      type: "Pulsa Tri",
      amount: -30000,
      status: "failed",
      date: "2025-01-17 09:15",
      target: "0896****7777",
    },
    {
      id: "TRX012",
      type: "Top Up Saldo",
      amount: 300000,
      status: "success",
      date: "2025-01-16 20:45",
      target: "Virtual Account",
    },
    {
      id: "TRX013",
      type: "Disney+ Hotstar",
      amount: -39000,
      status: "success",
      date: "2025-01-16 19:20",
      target: "streaming@email.com",
    },
    {
      id: "TRX014",
      type: "Paket Data Smartfren",
      amount: -45000,
      status: "success",
      date: "2025-01-16 17:35",
      target: "0888****4444",
    },
    {
      id: "TRX015",
      type: "Top Up GoPay",
      amount: -100000,
      status: "pending",
      date: "2025-01-16 15:50",
      target: "0812****3333",
    },
  ];

  const menuItems = [
    { icon: HomeIcon, label: "Overview", key: "overview" },
    { icon: CreditCardIcon, label: "Transaksi", key: "transactions" },
    { icon: BanknotesIcon, label: "Top Up", key: "topup" },
    { icon: ChartBarIcon, label: "Leaderboard", key: "leaderboard" },
    { icon: BellIcon, label: "Notifikasi", key: "notifications" },
    { icon: CurrencyDollarIcon, label: "Daftar Harga", key: "prices" },
    { icon: DocumentTextIcon, label: "API Docs", key: "api-docs" },
    { icon: PhoneIcon, label: "Contact", key: "contact" },
    { icon: UserIcon, label: "Profil", key: "profile" },
    { icon: Cog6ToothIcon, label: "Pengaturan", key: "settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 font-['Hanken_Grotesk']">
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={() => setShowLogoutModal(true)}
      />

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <DashboardHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
          onLogout={() => setShowLogoutModal(true)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Welcome Section & Balance */}
              <WelcomeCard
                userBalance={userBalance}
                setActiveTab={handleTabChange}
              />

              {/* Quick Actions - Product Categories */}
              <QuickActions />

              {/* Statistics */}
              <StatsSection userPoints={userPoints} />

              {/* Recent Transactions */}
              <RecentTransactions
                recentTransactions={recentTransactions}
                setActiveTab={handleTabChange}
              />
            </div>
          )}

          {activeTab === "transactions" && (
            <TransactionsList recentTransactions={recentTransactions} />
          )}

          {activeTab === "topup" && <TopUpSection userBalance={userBalance} />}

          {activeTab === "leaderboard" && <LeaderboardSection />}

          {activeTab === "notifications" && <Notifications />}

          {activeTab === "prices" && <PriceList />}

          {activeTab === "api-docs" && <APIDocs />}

          {activeTab === "contact" && <ContactSection />}

          {activeTab === "profile" && <ProfileSection />}

          {activeTab === "settings" && <SettingsSection />}

          {/* Placeholder for other tabs */}
          {activeTab !== "overview" &&
            activeTab !== "transactions" &&
            activeTab !== "topup" &&
            activeTab !== "leaderboard" &&
            activeTab !== "notifications" &&
            activeTab !== "prices" &&
            activeTab !== "api-docs" &&
            activeTab !== "contact" &&
            activeTab !== "profile" &&
            activeTab !== "settings" && (
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

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Dashboard;
