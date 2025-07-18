import React, { useState } from "react";
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  UserIcon,
  KeyIcon,
  ServerIcon,
  CircleStackIcon,
  CreditCardIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [showPassword, setShowPassword] = useState({});
  const [settings, setSettings] = useState({
    general: {
      siteName: "BayarAja",
      siteDescription: "Platform top-up game dan voucher terpercaya",
      adminEmail: "admin@bayaraja.com",
      supportEmail: "support@bayaraja.com",
      maintenanceMode: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      apiRateLimit: 1000,
    },
    payment: {
      autoProcessPayment: true,
      paymentTimeout: 30,
      minimumTopup: 10000,
      maximumTopup: 10000000,
      transactionFee: 2500,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
      userUpdates: true,
    },
    system: {
      backupFrequency: "daily",
      logRetention: 30,
      cacheTimeout: 3600,
      debugMode: false,
      apiVersion: "v1.0",
    },
  });

  const handleSettingChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const settingSections = [
    { key: "general", label: "General", icon: Cog6ToothIcon },
    { key: "security", label: "Security", icon: ShieldCheckIcon },
    { key: "payment", label: "Payment", icon: CreditCardIcon },
    { key: "notifications", label: "Notifications", icon: BellIcon },
    { key: "system", label: "System", icon: ServerIcon },
  ];

  const SettingCard = ({ title, description, children }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          enabled ? "bg-indigo-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            System Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Configure your platform settings and preferences
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
          <CircleStackIcon className="w-5 h-5" />
          <span>Save All Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Settings Categories
              </h3>
              <nav className="space-y-1">
                {settingSections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-xl transition-all duration-200 ${
                      activeSection === section.key
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "general" && (
            <div className="space-y-6">
              <SettingCard
                title="Site Information"
                description="Basic information about your platform"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteName",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      rows={3}
                      value={settings.general.siteDescription}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteDescription",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Contact Information"
                description="Administrative and support contact details"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.general.adminEmail}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "adminEmail",
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.general.supportEmail}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "supportEmail",
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Site Status"
                description="Control site availability and maintenance"
              >
                <ToggleSwitch
                  enabled={settings.general.maintenanceMode}
                  onChange={(value) =>
                    handleSettingChange("general", "maintenanceMode", value)
                  }
                  label="Maintenance Mode"
                  description="Temporarily disable the site for maintenance"
                />
              </SettingCard>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <SettingCard
                title="Authentication Security"
                description="Configure authentication and access control"
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.security.twoFactorAuth}
                    onChange={(value) =>
                      handleSettingChange("security", "twoFactorAuth", value)
                    }
                    label="Two-Factor Authentication"
                    description="Require 2FA for admin accounts"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "sessionTimeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "maxLoginAttempts",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="API Security"
                description="Configure API access and rate limiting"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Rate Limit (requests/hour)
                    </label>
                    <input
                      type="number"
                      value={settings.security.apiRateLimit}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "apiRateLimit",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {activeSection === "payment" && (
            <div className="space-y-6">
              <SettingCard
                title="Payment Processing"
                description="Configure payment processing and limits"
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.payment.autoProcessPayment}
                    onChange={(value) =>
                      handleSettingChange(
                        "payment",
                        "autoProcessPayment",
                        value
                      )
                    }
                    label="Auto Process Payments"
                    description="Automatically process confirmed payments"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.payment.paymentTimeout}
                        onChange={(e) =>
                          handleSettingChange(
                            "payment",
                            "paymentTimeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Fee (IDR)
                      </label>
                      <input
                        type="number"
                        value={settings.payment.transactionFee}
                        onChange={(e) =>
                          handleSettingChange(
                            "payment",
                            "transactionFee",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Transaction Limits"
                description="Set minimum and maximum transaction amounts"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Top-up (IDR)
                    </label>
                    <input
                      type="number"
                      value={settings.payment.minimumTopup}
                      onChange={(e) =>
                        handleSettingChange(
                          "payment",
                          "minimumTopup",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Top-up (IDR)
                    </label>
                    <input
                      type="number"
                      value={settings.payment.maximumTopup}
                      onChange={(e) =>
                        handleSettingChange(
                          "payment",
                          "maximumTopup",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-6">
              <SettingCard
                title="Notification Channels"
                description="Configure notification delivery methods"
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.notifications.emailNotifications}
                    onChange={(value) =>
                      handleSettingChange(
                        "notifications",
                        "emailNotifications",
                        value
                      )
                    }
                    label="Email Notifications"
                    description="Send notifications via email"
                  />
                  <ToggleSwitch
                    enabled={settings.notifications.smsNotifications}
                    onChange={(value) =>
                      handleSettingChange(
                        "notifications",
                        "smsNotifications",
                        value
                      )
                    }
                    label="SMS Notifications"
                    description="Send notifications via SMS"
                  />
                  <ToggleSwitch
                    enabled={settings.notifications.pushNotifications}
                    onChange={(value) =>
                      handleSettingChange(
                        "notifications",
                        "pushNotifications",
                        value
                      )
                    }
                    label="Push Notifications"
                    description="Send browser push notifications"
                  />
                </div>
              </SettingCard>

              <SettingCard
                title="Notification Types"
                description="Choose what notifications to send"
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.notifications.adminAlerts}
                    onChange={(value) =>
                      handleSettingChange("notifications", "adminAlerts", value)
                    }
                    label="Admin Alerts"
                    description="System alerts and critical notifications"
                  />
                  <ToggleSwitch
                    enabled={settings.notifications.userUpdates}
                    onChange={(value) =>
                      handleSettingChange("notifications", "userUpdates", value)
                    }
                    label="User Updates"
                    description="Transaction and account notifications to users"
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {activeSection === "system" && (
            <div className="space-y-6">
              <SettingCard
                title="System Maintenance"
                description="Configure system backup and maintenance"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Frequency
                    </label>
                    <select
                      value={settings.system.backupFrequency}
                      onChange={(e) =>
                        handleSettingChange(
                          "system",
                          "backupFrequency",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Log Retention (days)
                      </label>
                      <input
                        type="number"
                        value={settings.system.logRetention}
                        onChange={(e) =>
                          handleSettingChange(
                            "system",
                            "logRetention",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cache Timeout (seconds)
                      </label>
                      <input
                        type="number"
                        value={settings.system.cacheTimeout}
                        onChange={(e) =>
                          handleSettingChange(
                            "system",
                            "cacheTimeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Development Settings"
                description="Debug and development configuration"
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.system.debugMode}
                    onChange={(value) =>
                      handleSettingChange("system", "debugMode", value)
                    }
                    label="Debug Mode"
                    description="Enable detailed error logging and debugging"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Version
                    </label>
                    <input
                      type="text"
                      value={settings.system.apiVersion}
                      onChange={(e) =>
                        handleSettingChange(
                          "system",
                          "apiVersion",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
