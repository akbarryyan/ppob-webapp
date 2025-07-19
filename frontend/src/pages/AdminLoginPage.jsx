import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import { adminAuthService } from "../services/adminAuthService";
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if already authenticated
  useEffect(() => {
    console.log("AdminLoginPage: Checking if already authenticated...");
    if (adminAuthService.isAuthenticated()) {
      console.log("AdminLoginPage: Already authenticated, redirecting...");
      const from = location.state?.from || "/admin/overview";
      navigate(from, { replace: true });
    } else {
      console.log("AdminLoginPage: Not authenticated, staying on login page");
    }
  }, [navigate, location.state]);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Processing admin login...");

      const result = await adminAuthService.login(credentials);

      if (result.success) {
        toast.success(result.message || "Login successful!");

        // Redirect to intended page or admin overview
        const from = location.state?.from || "/admin/overview";
        navigate(from, { replace: true });
      } else {
        // Show specific error message
        const errorMsg = result.message || "Login failed. Please try again.";
        setError(errorMsg);
        toast.error(errorMsg);

        // Log validation errors if any
        if (result.errors && Object.keys(result.errors).length > 0) {
          console.log("Validation errors:", result.errors);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = "An unexpected error occurred. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return <AdminLogin onLogin={handleLogin} loading={loading} error={error} />;
};

export default AdminLoginPage;
