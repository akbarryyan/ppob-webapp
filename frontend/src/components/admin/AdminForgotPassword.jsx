import React, { useState } from "react";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminForgotPassword = ({
  onResetPassword,
  loading = false,
  success = false,
}) => {
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onResetPassword) {
      onResetPassword(email);
    }
  };

  const isFormValid = email && email.includes("@");

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="px-6 sm:px-8 py-8 sm:py-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircleIcon className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Check Your Email
              </h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                We've sent password reset instructions to{" "}
                <strong>{email}</strong>. Please check your inbox and follow the
                link to reset your password.
              </p>

              <div className="space-y-4">
                <Link
                  to="/admin/login"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Back to Login</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => onResetPassword && onResetPassword(email)}
                  className="w-full text-indigo-600 hover:text-indigo-700 py-3 px-6 font-medium transition-colors"
                >
                  Resend Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheckIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Reset Password
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base">
                Enter your email to receive reset instructions
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon
                      className={`w-5 h-5 transition-colors ${
                        focusedField === "email"
                          ? "text-indigo-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <p className="text-sm text-gray-500">
                  We'll send reset instructions to this email address.
                </p>
              </div>

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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/admin/login"
                className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
