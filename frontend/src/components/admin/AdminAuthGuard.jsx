import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const AdminAuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      // Check for admin token in localStorage or sessionStorage
      const token =
        localStorage.getItem("adminAuthToken") ||
        sessionStorage.getItem("adminAuthToken");

      const adminUser = localStorage.getItem("adminUser");

      if (token && adminUser) {
        try {
          const user = JSON.parse(adminUser);
          // Additional validation can be added here
          if (user.role === "super_admin" || user.role === "admin") {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Invalid user data:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheckIcon className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-gray-600 mt-2 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
    );
  }

  // Authenticated - render children
  return children;
};

export default AdminAuthGuard;
