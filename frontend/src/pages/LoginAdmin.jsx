import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../components/admin";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo credentials - replace with actual authentication
      if (
        formData.email === "admin@bayaraja.com" &&
        formData.password === "admin123"
      ) {
        // Simulate successful login
        const token = "demo_admin_token_" + Date.now();

        // Store authentication data
        if (formData.rememberMe) {
          localStorage.setItem("adminAuthToken", token);
          localStorage.setItem("adminEmail", formData.email);
        } else {
          sessionStorage.setItem("adminAuthToken", token);
          sessionStorage.setItem("adminEmail", formData.email);
        }

        // Store user info
        const adminUser = {
          id: 1,
          name: "Super Admin",
          email: formData.email,
          role: "super_admin",
          permissions: ["all"],
          lastLogin: new Date().toISOString(),
        };

        localStorage.setItem("adminUser", JSON.stringify(adminUser));

        // Navigate to admin dashboard
        navigate("/admin/overview");
      } else {
        throw new Error("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminLogin onLogin={handleLogin} loading={loading} error={error} />
    </div>
  );
};

export default LoginAdmin;
