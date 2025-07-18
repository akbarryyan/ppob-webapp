import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AdminSidebar,
  AdminHeader,
  AdminOverview,
  AdminUsers,
  AdminTransactions,
  AdminProducts,
  AdminReports,
  AdminSettings,
  AdminNotifications,
} from "../components/admin";
import { LogoutModal } from "../components/dashboard";

const AdminDashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section || "overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { icon: "HomeIcon", label: "Overview", key: "overview" },
    { icon: "UsersIcon", label: "Users", key: "users" },
    { icon: "CreditCardIcon", label: "Transactions", key: "transactions" },
    { icon: "CubeIcon", label: "Products", key: "products" },
    { icon: "ChartBarIcon", label: "Reports", key: "reports" },
    { icon: "BellIcon", label: "Notifications", key: "notifications" },
    { icon: "Cog6ToothIcon", label: "Settings", key: "settings" },
  ];

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab !== section) {
      navigate(`/admin/${activeTab}`, { replace: true });
    }
  }, [activeTab, section, navigate]);

  // Scroll to top when tab changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }, [activeTab]);

  // Handle logout
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Clear auth data (localStorage, sessionStorage, etc.)
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to login
    navigate("/login");
    setShowLogoutModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "users":
        return <AdminUsers />;
      case "transactions":
        return <AdminTransactions />;
      case "products":
        return <AdminProducts />;
      case "reports":
        return <AdminReports />;
      case "notifications":
        return <AdminNotifications />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {renderContent()}
        </main>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default AdminDashboard;
