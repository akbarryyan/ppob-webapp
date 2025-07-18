import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminOverview from "./AdminOverview";
import AdminUsers from "./AdminUsers";
import AdminTransactions from "./AdminTransactions";
import LogoutModal from "../LogoutModal";

const AdminDashboard = () => {
  const { section = "overview" } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Define menu items
  const menuItems = [
    { key: "overview", label: "Overview", path: "/admin/overview" },
    { key: "users", label: "Users", path: "/admin/users" },
    { key: "transactions", label: "Transactions", path: "/admin/transactions" },
    { key: "products", label: "Products", path: "/admin/products" },
    { key: "reports", label: "Reports", path: "/admin/reports" },
    { key: "settings", label: "Settings", path: "/admin/settings" },
    {
      key: "notifications",
      label: "Notifications",
      path: "/admin/notifications",
    },
  ];

  // Sync activeTab with URL parameter
  useEffect(() => {
    setActiveTab(section);
  }, [section]);

  // Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    const menuItem = menuItems.find((item) => item.key === newTab);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/");
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Component renderer
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "users":
        return <AdminUsers />;
      case "transactions":
        return <AdminTransactions />;
      case "products":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Management
            </h2>
            <p className="text-gray-600">
              Product management features will be implemented here.
            </p>
          </div>
        );
      case "reports":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Reports & Analytics
            </h2>
            <p className="text-gray-600">
              Reports and analytics features will be implemented here.
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              System Settings
            </h2>
            <p className="text-gray-600">
              System settings features will be implemented here.
            </p>
          </div>
        );
      case "notifications":
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notification Management
            </h2>
            <p className="text-gray-600">
              Notification management features will be implemented here.
            </p>
          </div>
        );
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        menuItems={menuItems}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:pl-80">
        {/* Header */}
        <AdminHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
