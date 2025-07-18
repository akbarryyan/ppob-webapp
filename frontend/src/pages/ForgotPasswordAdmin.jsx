import React, { useState } from "react";
import { AdminForgotPassword } from "../components/admin";

const ForgotPasswordAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (email) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success state
      setSuccess(true);

      // In a real app, you would call your password reset API here
      console.log("Password reset requested for:", email);
    } catch (error) {
      console.error("Reset password error:", error);
      // Handle error (could add error state)
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminForgotPassword
      onResetPassword={handleResetPassword}
      loading={loading}
      success={success}
    />
  );
};

export default ForgotPasswordAdmin;
