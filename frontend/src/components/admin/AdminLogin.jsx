import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import "../../styles/scrollbar.css";

const AdminLogin = ({ onLogin, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ ...formData, rememberMe });
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Header Section */}
          <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
            {/* Header Pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 text-center">
              {/* Logo/Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheckIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Admin Portal
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base">
                Secure access to administration panel
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Login Failed
                  </p>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon
                      className={`w-5 h-5 transition-colors ${
                        focusedField === "email"
                          ? "text-indigo-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    placeholder="admin@bayaraja.com"
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                      focusedField === "email"
                        ? "border-indigo-500 ring-4 ring-indigo-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon
                      className={`w-5 h-5 transition-colors ${
                        focusedField === "password"
                          ? "text-indigo-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                      focusedField === "password"
                        ? "border-indigo-500 ring-4 ring-indigo-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        rememberMe
                          ? "bg-indigo-600 border-indigo-600"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {rememberMe && (
                        <CheckCircleIcon className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>

                <Link
                  to="/admin/forgot-password"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isFormValid && !loading
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Panel</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Security Notice
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    This is a restricted area. All access attempts are logged
                    and monitored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Protected by BayarAja Security System
              </p>
              <p className="text-xs text-gray-400 mt-1">
                © 2024 BayarAja. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Main Site */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            <span>Back to main site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
