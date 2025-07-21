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
        // Check if we're on an admin page before calling admin API
        const currentPath = window.location.pathname;
        const isAdminPage = currentPath.startsWith("/admin");

        if (isAdminPage) {
          // Only call admin API if we have admin token
          const adminToken =
            localStorage.getItem("adminAuthToken") ||
            sessionStorage.getItem("adminAuthToken");

          if (adminToken) {
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
          } else {
            // Use default settings if no admin token
            updateDocumentTitle(settings.siteName, settings.siteDescription);
          }
        } else {
          // For non-admin pages, use public API
          try {
            const response = await fetch(
              "http://localhost:8000/api/public/settings/general"
            );
            const data = await response.json();

            if (data.success && data.data) {
              setSettings((prevSettings) => ({
                ...prevSettings,
                ...data.data,
              }));

              // Update document title
              updateDocumentTitle(
                data.data.siteName,
                data.data.siteDescription
              );
            } else {
              // Fallback to default
              updateDocumentTitle(settings.siteName, settings.siteDescription);
            }
          } catch (fetchError) {
            console.error("Failed to load public settings:", fetchError);
            // Use fallback settings
            updateDocumentTitle(settings.siteName, settings.siteDescription);
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
        // Use fallback settings
        updateDocumentTitle(settings.siteName, settings.siteDescription);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []); // Empty dependency array - only run once on mount

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
