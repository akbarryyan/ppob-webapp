import React, { createContext, useContext, useState, useEffect } from "react";
import adminService from "../services/adminService";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: "Bayaraja",
    siteDescription: "Rajanya Pembayaran Digital",
    adminEmail: "",
    supportEmail: "",
    maintenanceMode: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await adminService.getGeneralSettings();
        if (response.success && response.data) {
          setSettings((prevSettings) => ({
            ...prevSettings,
            ...response.data,
          }));

          // Update document title
          updateDocumentTitle(
            response.data.siteName,
            response.data.siteDescription
          );
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateDocumentTitle = (siteName, siteDescription) => {
    const title =
      siteName && siteDescription
        ? `${siteName} - ${siteDescription}`
        : siteName || "Bayaraja - Rajanya Pembayaran Digital";

    document.title = title;

    // Update meta description if available
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && siteDescription) {
      metaDescription.setAttribute("content", siteDescription);
    } else if (siteDescription) {
      // Create meta description if it doesn't exist
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = siteDescription;
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
  };

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };

      // Update document title when settings change
      updateDocumentTitle(
        updatedSettings.siteName,
        updatedSettings.siteDescription
      );

      return updatedSettings;
    });
  };

  const value = {
    settings,
    updateSettings,
    isLoading,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
