import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import adminService from "../../services/adminService";
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
  CloudIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [showPassword, setShowPassword] = useState({});
  const [digiflazzLoading, setDigiflazzLoading] = useState(false);
  const [generalLoading, setGeneralLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false); // Start with false to show loading
  const [dataLoaded, setDataLoaded] = useState(false); // Track if data is loaded

  // Use refs to prevent re-renders
  const settingsRef = useRef({
    general: {
      siteName: "",
      siteDescription: "",
      adminEmail: "",
      supportEmail: "",
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

  const [settings, setSettings] = useState(settingsRef.current);
  const [digiflazzSettings, setDigiflazzSettings] = useState({
    username: "",
    api_key: "",
    whitelist_ips: "",
    current_balance: null,
    balance_updated_at: null,
  });

  // Use refs to track input values directly without triggering re-renders
  const inputRefs = useRef({
    general: {
      siteName: null,
      siteDescription: null,
      adminEmail: null,
      supportEmail: null,
    },
    security: {
      sessionTimeout: null,
      maxLoginAttempts: null,
      apiRateLimit: null,
    },
    payment: {
      paymentTimeout: null,
      transactionFee: null,
      minimumTopup: null,
      maximumTopup: null,
    },
    system: {
      logRetention: null,
      cacheTimeout: null,
      apiVersion: null,
      backupFrequency: null,
    },
  });

  // Simple stable handler functions that don't cause re-renders
  const handleSettingChange = useCallback((section, key, value) => {
    // Update the ref directly to prevent re-renders
    if (settingsRef.current[section]) {
      settingsRef.current[section][key] = value;
    }

    // Only update state for toggles and critical updates
    if (
      key === "maintenanceMode" ||
      key === "twoFactorAuth" ||
      key === "autoProcessPayment" ||
      key === "emailNotifications" ||
      key === "smsNotifications" ||
      key === "pushNotifications" ||
      key === "adminAlerts" ||
      key === "userUpdates" ||
      key === "debugMode"
    ) {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    }
  }, []);

  const handleDigiflazzSettingChange = useCallback((key, value) => {
    setDigiflazzSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const togglePassword = useCallback((field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const getAuthToken = () => {
    return (
      localStorage.getItem("adminAuthToken") ||
      sessionStorage.getItem("adminAuthToken")
    );
  };

  // Load general settings from database
  const loadGeneralSettings = async () => {
    if (dataLoaded) return; // Prevent multiple loads

    try {
      const response = await adminService.getGeneralSettings();
      if (response.success && response.data) {
        setSettings((prev) => ({
          ...prev,
          general: {
            siteName: response.data.siteName || "",
            siteDescription: response.data.siteDescription || "",
            adminEmail: response.data.adminEmail || "",
            supportEmail: response.data.supportEmail || "",
            maintenanceMode: response.data.maintenanceMode || false,
          },
        }));
      } else {
        console.error("Failed to load general settings:", response.message);
      }
    } catch (error) {
      console.error("Failed to load general settings:", error);
    } finally {
      setDataLoaded(true); // Mark data as loaded
      setInitialLoadComplete(true); // Mark initial load as complete
    }
  };

  const loadDigiflazzSettings = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/admin/digiflazz/settings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success && data.data) {
        const hasData =
          data.data.username && data.data.api_key === "***********";
        setHasExistingData(hasData);

        setDigiflazzSettings({
          username: hasData ? "***********" : data.data.username || "",
          api_key: hasData ? "***********" : data.data.api_key || "",
          whitelist_ips: Array.isArray(data.data.whitelist_ips)
            ? data.data.whitelist_ips.join(", ")
            : data.data.whitelist_ips || "",
          current_balance: data.data.current_balance,
          balance_updated_at: data.data.balance_updated_at,
        });
      } else {
        setHasExistingData(false);
      }
    } catch (error) {
      console.error("Failed to load Digiflazz settings:", error);
      setHasExistingData(false);
    }
  };

  // Load Digiflazz settings on component mount
  useEffect(() => {
    const loadData = async () => {
      if (!dataLoaded) {
        await Promise.all([loadDigiflazzSettings(), loadGeneralSettings()]);
      }
    };

    loadData();
  }, []); // Only run once

  // Save general settings to database
  const saveGeneralSettings = async () => {
    setGeneralLoading(true);
    try {
      // Get current values from form elements
      const siteName =
        document.querySelector('input[key="siteName-input"]')?.value ||
        settings.general.siteName;
      const siteDescription =
        document.querySelector('textarea[key="siteDescription-input"]')
          ?.value || settings.general.siteDescription;
      const adminEmail =
        document.querySelector('input[key="adminEmail-input"]')?.value ||
        settings.general.adminEmail;
      const supportEmail =
        document.querySelector('input[key="supportEmail-input"]')?.value ||
        settings.general.supportEmail;

      const currentSettings = {
        siteName,
        siteDescription,
        adminEmail,
        supportEmail,
        maintenanceMode: settings.general.maintenanceMode,
      };

      const response = await adminService.saveGeneralSettings(currentSettings);
      if (response.success) {
        // Update state with current form values
        setSettings((prev) => ({
          ...prev,
          general: currentSettings,
        }));
        toast.success("General settings saved successfully");
      } else {
        toast.error(response.message || "Failed to save general settings");
      }
    } catch (error) {
      console.error("Failed to save general settings:", error);
      toast.error("Failed to save general settings");
    } finally {
      setGeneralLoading(false);
    }
  };

  const saveDigiflazzSettings = async () => {
    setDigiflazzLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      // Check if user is trying to save without entering actual values for existing data
      if (
        hasExistingData &&
        (digiflazzSettings.username === "***********" ||
          digiflazzSettings.api_key === "***********")
      ) {
        toast.error(
          "Please enter actual username and API key values to update"
        );
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/admin/digiflazz/settings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: digiflazzSettings.username,
            api_key: digiflazzSettings.api_key,
            whitelist_ips: digiflazzSettings.whitelist_ips,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Digiflazz settings saved successfully");
        loadDigiflazzSettings(); // Reload to get updated data
      } else {
        toast.error(data.message || "Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save Digiflazz settings:", error);
      toast.error("Failed to save Digiflazz settings");
    } finally {
      setDigiflazzLoading(false);
    }
  };

  const checkDigiflazzBalance = async () => {
    setBalanceLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/admin/digiflazz/check-balance",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setDigiflazzSettings((prev) => ({
          ...prev,
          current_balance: data.data.balance,
          balance_updated_at: data.data.last_updated,
        }));
        toast.success(`Balance: ${data.data.formatted_balance}`);
      } else {
        toast.error(data.message || "Failed to check balance");
      }
    } catch (error) {
      console.error("Failed to check balance:", error);
      toast.error("Failed to check balance");
    } finally {
      setBalanceLoading(false);
    }
  };

  const settingSections = [
    { key: "general", label: "General", icon: Cog6ToothIcon },
    { key: "digiflazz", label: "Digiflazz", icon: CloudIcon },
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
          {!initialLoadComplete && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-gray-600">Loading settings...</span>
            </div>
          )}

          {initialLoadComplete && activeSection === "general" && (
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
                      key="siteName-input"
                      ref={(el) => (inputRefs.current.general.siteName = el)}
                      type="text"
                      defaultValue={settings.general.siteName || ""}
                      onBlur={(e) =>
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
                      key="siteDescription-input"
                      ref={(el) =>
                        (inputRefs.current.general.siteDescription = el)
                      }
                      rows={3}
                      defaultValue={settings.general.siteDescription || ""}
                      onBlur={(e) =>
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
                        key="adminEmail-input"
                        ref={(el) =>
                          (inputRefs.current.general.adminEmail = el)
                        }
                        type="email"
                        defaultValue={settings.general.adminEmail || ""}
                        onBlur={(e) =>
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
                        key="supportEmail-input"
                        ref={(el) =>
                          (inputRefs.current.general.supportEmail = el)
                        }
                        type="email"
                        defaultValue={settings.general.supportEmail || ""}
                        onBlur={(e) =>
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

              {/* Save Button for General Settings */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Save Changes
                    </h3>
                    <p className="text-sm text-gray-600">
                      Don't forget to save your changes to apply them.
                    </p>
                  </div>
                  <button
                    onClick={saveGeneralSettings}
                    disabled={generalLoading}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      generalLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                    } text-white shadow-lg`}
                  >
                    {generalLoading ? (
                      <>
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Save Settings</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "digiflazz" && (
            <div className="space-y-6">
              <SettingCard
                title="API Configuration"
                description="Configure your Digiflazz API credentials"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        key="digiflazz-username-input"
                        type={
                          showPassword.digiflazz_username
                            ? "text"
                            : hasExistingData
                            ? "password"
                            : "text"
                        }
                        value={digiflazzSettings.username}
                        onChange={(e) =>
                          handleDigiflazzSettingChange(
                            "username",
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder={
                          hasExistingData
                            ? "Enter new username to update"
                            : "Enter Digiflazz username"
                        }
                      />
                      {hasExistingData && (
                        <button
                          type="button"
                          onClick={() => togglePassword("digiflazz_username")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.digiflazz_username ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                    {hasExistingData && (
                      <p className="text-sm text-amber-600 mt-1">
                        Current username is saved. Enter new value to update.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <div className="relative">
                      <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        key="digiflazz-apikey-input"
                        type={
                          showPassword.digiflazz_api_key ? "text" : "password"
                        }
                        value={digiflazzSettings.api_key}
                        onChange={(e) =>
                          handleDigiflazzSettingChange(
                            "api_key",
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder={
                          hasExistingData
                            ? "Enter new API key to update"
                            : "Enter Digiflazz API key"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("digiflazz_api_key")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.digiflazz_api_key ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {hasExistingData && (
                      <p className="text-sm text-amber-600 mt-1">
                        Current API key is saved. Enter new value to update.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Whitelist IP Addresses
                    </label>
                    <div className="relative">
                      <GlobeAltIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        key="digiflazz-whitelist-input"
                        rows={3}
                        value={digiflazzSettings.whitelist_ips}
                        onChange={(e) =>
                          handleDigiflazzSettingChange(
                            "whitelist_ips",
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter IP addresses separated by commas (e.g., 192.168.1.1, 10.0.0.1)"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Add IP addresses that are allowed to access the Digiflazz
                      API
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    {hasExistingData && (
                      <button
                        type="button"
                        onClick={() => {
                          setDigiflazzSettings((prev) => ({
                            ...prev,
                            username: "",
                            api_key: "",
                          }));
                          setHasExistingData(false);
                        }}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <XCircleIcon className="w-4 h-4" />
                        <span className="text-sm">
                          Clear to enter new values
                        </span>
                      </button>
                    )}

                    <button
                      onClick={saveDigiflazzSettings}
                      disabled={digiflazzLoading}
                      className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                    >
                      {digiflazzLoading ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircleIcon className="w-5 h-5" />
                          <span>Save Settings</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Account Information"
                description="View your Digiflazz account balance and status"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Account Balance
                        </p>
                        {digiflazzSettings.current_balance !== null ? (
                          <p className="text-sm text-gray-600">
                            Last updated:{" "}
                            {digiflazzSettings.balance_updated_at
                              ? new Date(
                                  digiflazzSettings.balance_updated_at
                                ).toLocaleString("id-ID")
                              : "Never"}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Not checked yet
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {digiflazzSettings.current_balance !== null ? (
                        <p className="text-2xl font-bold text-green-600">
                          Rp{" "}
                          {Number(
                            digiflazzSettings.current_balance
                          ).toLocaleString("id-ID")}
                        </p>
                      ) : (
                        <p className="text-lg text-gray-400">-</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={checkDigiflazzBalance}
                      disabled={balanceLoading || !hasExistingData}
                      className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {balanceLoading ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 animate-spin" />
                          <span>Checking...</span>
                        </>
                      ) : (
                        <>
                          <ArrowPathIcon className="w-5 h-5" />
                          <span>Check Balance</span>
                        </>
                      )}
                    </button>
                  </div>

                  {!hasExistingData && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <ExclamationCircleIcon className="w-5 h-5 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Please save your API credentials first before checking
                          balance.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
                        key="sessionTimeout-input"
                        ref={(el) =>
                          (inputRefs.current.security.sessionTimeout = el)
                        }
                        type="number"
                        defaultValue={settings.security.sessionTimeout || ""}
                        onBlur={(e) =>
                          handleSettingChange(
                            "security",
                            "sessionTimeout",
                            parseInt(e.target.value) || 0
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
                        key="maxLoginAttempts-input"
                        ref={(el) =>
                          (inputRefs.current.security.maxLoginAttempts = el)
                        }
                        type="number"
                        defaultValue={settings.security.maxLoginAttempts || ""}
                        onBlur={(e) =>
                          handleSettingChange(
                            "security",
                            "maxLoginAttempts",
                            parseInt(e.target.value) || 0
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
                      key="apiRateLimit-input"
                      ref={(el) =>
                        (inputRefs.current.security.apiRateLimit = el)
                      }
                      type="number"
                      defaultValue={settings.security.apiRateLimit || ""}
                      onBlur={(e) =>
                        handleSettingChange(
                          "security",
                          "apiRateLimit",
                          parseInt(e.target.value) || 0
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
                        key="paymentTimeout-input"
                        ref={(el) =>
                          (inputRefs.current.payment.paymentTimeout = el)
                        }
                        type="number"
                        defaultValue={settings.payment.paymentTimeout || ""}
                        onBlur={(e) =>
                          handleSettingChange(
                            "payment",
                            "paymentTimeout",
                            parseInt(e.target.value) || 0
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
                        key="transactionFee-input"
                        ref={(el) =>
                          (inputRefs.current.payment.transactionFee = el)
                        }
                        type="number"
                        defaultValue={settings.payment.transactionFee || ""}
                        onBlur={(e) =>
                          handleSettingChange(
                            "payment",
                            "transactionFee",
                            parseInt(e.target.value) || 0
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
                      key="minimumTopup-input"
                      ref={(el) =>
                        (inputRefs.current.payment.minimumTopup = el)
                      }
                      type="number"
                      defaultValue={settings.payment.minimumTopup || ""}
                      onBlur={(e) =>
                        handleSettingChange(
                          "payment",
                          "minimumTopup",
                          parseInt(e.target.value) || 0
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
                      key="maximumTopup-input"
                      ref={(el) =>
                        (inputRefs.current.payment.maximumTopup = el)
                      }
                      type="number"
                      defaultValue={settings.payment.maximumTopup || ""}
                      onBlur={(e) =>
                        handleSettingChange(
                          "payment",
                          "maximumTopup",
                          parseInt(e.target.value) || 0
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
                      key="backupFrequency-select"
                      ref={(el) =>
                        (inputRefs.current.system.backupFrequency = el)
                      }
                      defaultValue={settings.system.backupFrequency || ""}
                      onBlur={(e) =>
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
                        key="logRetention-input"
                        ref={(el) =>
                          (inputRefs.current.system.logRetention = el)
                        }
                        type="number"
                        defaultValue={settings.system.logRetention || ""}
                        onBlur={(e) =>
                          handleSettingChange(
                            "system",
                            "logRetention",
                            parseInt(e.target.value) || 0
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
                        key="cacheTimeout-input"
                        ref={(el) =>
                          (inputRefs.current.system.cacheTimeout = el)
                        }
                        type="number"
                        defaultValue={settings.system.cacheTimeout || ""}
                        onBlur={(e) =>
                          handleSettingChange(
                            "system",
                            "cacheTimeout",
                            parseInt(e.target.value) || 0
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
                      key="apiVersion-input"
                      ref={(el) => (inputRefs.current.system.apiVersion = el)}
                      type="text"
                      defaultValue={settings.system.apiVersion || ""}
                      onBlur={(e) =>
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
