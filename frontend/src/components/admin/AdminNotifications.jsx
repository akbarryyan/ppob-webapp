import React, { useState, useEffect } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PlusIcon,
  EnvelopeIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import "../../styles/scrollbar.css";
import adminService from "../../services/adminService";
import { toast } from "react-toastify";

const AdminNotifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Real data states
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    total_notifications: 0,
    sent_today: 0,
    total_recipients: 0,
    scheduled: 0,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  // Fetch notifications data
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch stats
      const statsResponse = await adminService.getNotificationStats();
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

      // Fetch notifications with filters
      const params = {
        search: searchTerm || undefined,
        type: filterType !== "all" ? filterType : undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        per_page: pagination.per_page,
        page: pagination.current_page,
      };

      const notificationsResponse = await adminService.getNotifications(params);
      if (notificationsResponse.success) {
        setNotifications(notificationsResponse.data.data);
        setPagination({
          current_page: notificationsResponse.data.current_page,
          last_page: notificationsResponse.data.last_page,
          per_page: notificationsResponse.data.per_page,
          total: notificationsResponse.data.total,
        });
      } else {
        toast.error(
          notificationsResponse.message || "Failed to fetch notifications",
          { autoClose: 3000 }
        );
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to load notifications";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when filters change
  React.useEffect(() => {
    fetchNotifications();
  }, [searchTerm, filterType, filterStatus]);

  const typeConfig = {
    info: {
      label: "Info",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: InformationCircleIcon,
      iconColor: "text-blue-600",
    },
    success: {
      label: "Success",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircleIcon,
      iconColor: "text-green-600",
    },
    warning: {
      label: "Warning",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: ExclamationTriangleIcon,
      iconColor: "text-yellow-600",
    },
    error: {
      label: "Error",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircleIcon,
      iconColor: "text-red-600",
    },
  };

  const statusConfig = {
    sent: {
      label: "Sent",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    draft: {
      label: "Draft",
      color: "bg-gray-100 text-gray-800 border-gray-200",
    },
    scheduled: {
      label: "Scheduled",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
  };

  const priorityConfig = {
    low: { label: "Low", color: "text-gray-600" },
    medium: { label: "Medium", color: "text-yellow-600" },
    high: { label: "High", color: "text-orange-600" },
    critical: { label: "Critical", color: "text-red-600" },
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Since filtering is done server-side, we use notifications directly
  const filteredNotifications = notifications;

  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(
        filteredNotifications.map((notification) => notification.id)
      );
    }
  };

  // Handler functions
  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setShowViewModal(true);
  };

  const handleConfirmDelete = (notification) => {
    setSelectedNotification(notification);
    setShowDeleteModal(true);
  };

  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;

    try {
      setDeleteLoading(true);
      toast.info("Deleting notification...", { autoClose: 2000 });

      // Add delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await adminService.deleteNotification(
        selectedNotification.id
      );

      if (response.success) {
        toast.success("Notification deleted successfully!", {
          autoClose: 3000,
        });
        await fetchNotifications(); // Refresh data
        setSelectedNotifications((prev) =>
          prev.filter((selectedId) => selectedId !== selectedNotification.id)
        );
        setShowDeleteModal(false);
        setSelectedNotification(null);
      } else {
        toast.error(response.message || "Failed to delete notification", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error deleting notification:", err);

      // Better error handling for specific HTTP status codes
      let errorMessage = "Failed to delete notification";

      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage =
              err.response.data?.message ||
              "Cannot delete this notification. It may have been sent already.";
            break;
          case 401:
            errorMessage = "Authentication failed. Please login again.";
            break;
          case 403:
            errorMessage =
              "You don't have permission to delete this notification.";
            break;
          case 404:
            errorMessage = "Notification not found.";
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage, {
        autoClose: 4000,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedNotifications.length === 0) return;

    try {
      setLoading(true);
      toast.info(`Deleting ${selectedNotifications.length} notifications...`, {
        autoClose: 2000,
      });

      // Add delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await adminService.bulkDeleteNotifications(
        selectedNotifications
      );

      if (response.success) {
        toast.success(
          `${selectedNotifications.length} notifications deleted successfully!`,
          { autoClose: 3000 }
        );
        await fetchNotifications(); // Refresh data
        setSelectedNotifications([]);
      } else {
        toast.error(response.message || "Failed to delete notifications", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error bulk deleting notifications:", err);

      // Better error handling for specific HTTP status codes
      let errorMessage = "Failed to delete notifications";

      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage =
              err.response.data?.message ||
              "Some notifications cannot be deleted (sent notifications cannot be deleted).";
            break;
          case 401:
            errorMessage = "Authentication failed. Please login again.";
            break;
          case 403:
            errorMessage =
              "You don't have permission to delete these notifications.";
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage, {
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const ComposeModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Compose Notification
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Notification title..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Notification message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                <option value="all_users">All Users</option>
                <option value="active_users">Active Users</option>
                <option value="new_users">New Users</option>
                <option value="premium_users">Premium Users</option>
                <option value="admin_users">Admin Users</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Send Now
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteModal = ({ onClose, onConfirm }) => {
    const canDelete =
      selectedNotification && selectedNotification.status !== "sent";

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Delete Notification
            </h3>

            {!canDelete ? (
              <div className="mb-4">
                <p className="text-gray-600 text-center mb-4">
                  This notification cannot be deleted because it has already
                  been sent.
                </p>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Sent notifications cannot be deleted
                    to maintain audit trail.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this notification? This action
                cannot be undone.
              </p>
            )}

            {selectedNotification && (
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm text-gray-900 truncate flex-1 mr-2">
                    {selectedNotification.title}
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium border ${
                      statusConfig[selectedNotification.status].color
                    }`}
                  >
                    {statusConfig[selectedNotification.status].label}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {selectedNotification.message}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                {canDelete ? "Cancel" : "Close"}
              </button>
              {canDelete && (
                <button
                  onClick={onConfirm}
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {deleteLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // View Detail Modal
  const ViewModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Notification Details
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {selectedNotification && (
          <div className="p-6">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedNotification.title}
                  </h4>
                  <div className="flex items-center space-x-3 mb-4">
                    {React.createElement(
                      typeConfig[selectedNotification.type].icon,
                      {
                        className: `w-5 h-5 ${
                          typeConfig[selectedNotification.type].iconColor
                        }`,
                      }
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        typeConfig[selectedNotification.type].color
                      }`}
                    >
                      {typeConfig[selectedNotification.type].label}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        statusConfig[selectedNotification.status].color
                      }`}
                    >
                      {statusConfig[selectedNotification.status].label}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-sm font-semibold ${
                    priorityConfig[selectedNotification.priority].color
                  }`}
                >
                  {priorityConfig[selectedNotification.priority].label} Priority
                </span>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedNotification.message}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      {selectedNotification.recipient_count.toLocaleString()}{" "}
                      users
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedNotification.recipients.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created By
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      {selectedNotification.created_by}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDateTime(selectedNotification.created_at)}
                    </p>
                  </div>
                </div>

                {selectedNotification.sent_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sent At
                    </label>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        {formatDateTime(selectedNotification.sent_at)}
                      </p>
                    </div>
                  </div>
                )}

                {selectedNotification.scheduled_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scheduled At
                    </label>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        {formatDateTime(selectedNotification.scheduled_at)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Notification Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and send notifications to users
          </p>
        </div>
        <button
          onClick={() => setShowComposeModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Compose Notification</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Notifications
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.total_notifications}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Sent Today
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.sent_today}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <EnvelopeIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Recipients
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.total_recipients}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Scheduled
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.scheduled}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications by title or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {selectedNotifications.length > 0 && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <span className="text-sm font-medium text-indigo-700">
                  {selectedNotifications.length} notification(s) selected
                </span>
                {(() => {
                  const sentCount = selectedNotifications.filter(
                    (id) =>
                      filteredNotifications.find((n) => n.id === id)?.status ===
                      "sent"
                  ).length;
                  const canDeleteCount =
                    selectedNotifications.length - sentCount;

                  if (sentCount > 0) {
                    return (
                      <div className="mt-1 text-xs text-amber-600">
                        {canDeleteCount > 0
                          ? `${canDeleteCount} will be deleted • ${sentCount} sent notifications will be skipped`
                          : `${sentCount} sent notifications cannot be deleted`}
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkDelete}
                  disabled={loading}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Table Info Header */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50/50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold">
                {filteredNotifications.length}
              </span>{" "}
              notification{filteredNotifications.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterType !== "all" && ` of type ${filterType}`}
              {filterStatus !== "all" && ` with ${filterStatus} status`}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="hidden sm:flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Scroll to view more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchNotifications}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Table Content - Only show when not loading and no error */}
        {!loading && !error && (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden">
              <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-xl p-4 space-y-3 border transition-shadow ${
                        notification.status === "sent"
                          ? "bg-gray-50 border-gray-200 opacity-80"
                          : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                      }`}
                    >
                      {/* Notification Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(
                              notification.id
                            )}
                            onChange={() =>
                              handleSelectNotification(notification.id)
                            }
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate text-sm">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {React.createElement(
                            typeConfig[notification.type].icon,
                            {
                              className: `w-4 h-4 ${
                                typeConfig[notification.type].iconColor
                              }`,
                            }
                          )}
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                              statusConfig[notification.status].color
                            }`}
                          >
                            {statusConfig[notification.status].label}
                          </span>
                        </div>
                      </div>

                      {/* Notification Details Grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Type</p>
                          <span
                            className={`inline-block px-2 py-1 rounded-md text-xs font-medium border mt-1 ${
                              typeConfig[notification.type].color
                            }`}
                          >
                            {typeConfig[notification.type].label}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Recipients</p>
                          <p className="font-semibold text-gray-900">
                            {notification.recipient_count.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">
                            {notification.recipients.replace("_", " ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Priority</p>
                          <span
                            className={`text-xs font-semibold ${
                              priorityConfig[notification.priority].color
                            }`}
                          >
                            {priorityConfig[notification.priority].label}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Created</p>
                          <p className="font-semibold text-gray-900 text-xs">
                            {formatDateTime(notification.created_at)}
                          </p>
                          <p className="text-xs text-gray-600">
                            by {notification.created_by}
                          </p>
                        </div>
                      </div>

                      {/* Status Info */}
                      {notification.sent_at && (
                        <div className="text-xs">
                          <span className="text-green-600 font-medium">
                            Sent: {formatDateTime(notification.sent_at)}
                          </span>
                        </div>
                      )}
                      {notification.scheduled_at && (
                        <div className="text-xs">
                          <span className="text-blue-600 font-medium">
                            Scheduled:{" "}
                            {formatDateTime(notification.scheduled_at)}
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleViewNotification(notification)}
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleConfirmDelete(notification)}
                          disabled={loading || notification.status === "sent"}
                          className={`p-2 rounded-lg transition-colors ${
                            notification.status === "sent"
                              ? "text-gray-400 cursor-not-allowed opacity-50"
                              : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                          } disabled:opacity-50`}
                          title={
                            notification.status === "sent"
                              ? "Cannot delete sent notifications"
                              : "Delete Notification"
                          }
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 xl:px-6 py-4 text-left min-w-[50px]">
                        <input
                          type="checkbox"
                          checked={
                            selectedNotifications.length ===
                              filteredNotifications.length &&
                            filteredNotifications.length > 0
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[250px]">
                        Notification
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                        Type
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[100px]">
                        Status
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                        Recipients
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[150px]">
                        Created
                      </th>
                      <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredNotifications.map((notification) => (
                      <tr
                        key={notification.id}
                        className={`transition-colors ${
                          notification.status === "sent"
                            ? "bg-gray-25 opacity-80"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 xl:px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(
                              notification.id
                            )}
                            onChange={() =>
                              handleSelectNotification(notification.id)
                            }
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-1 space-x-2">
                              <span
                                className={`text-xs font-semibold ${
                                  priorityConfig[notification.priority].color
                                }`}
                              >
                                {priorityConfig[notification.priority].label}
                              </span>
                              <span className="text-xs text-gray-500">
                                by {notification.created_by}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {React.createElement(
                              typeConfig[notification.type].icon,
                              {
                                className: `w-4 h-4 ${
                                  typeConfig[notification.type].iconColor
                                }`,
                              }
                            )}
                            <span
                              className={`px-2 xl:px-2 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                                typeConfig[notification.type].color
                              }`}
                            >
                              {typeConfig[notification.type].label}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <span
                            className={`px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                              statusConfig[notification.status].color
                            }`}
                          >
                            {statusConfig[notification.status].label}
                          </span>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div>
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                              {notification.recipient_count.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600 whitespace-nowrap">
                              {notification.recipients.replace("_", " ")}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div>
                            <p className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                              {formatDateTime(notification.created_at)}
                            </p>
                            {notification.sent_at && (
                              <p className="text-xs text-green-600 whitespace-nowrap">
                                Sent: {formatDateTime(notification.sent_at)}
                              </p>
                            )}
                            {notification.scheduled_at && (
                              <p className="text-xs text-blue-600 whitespace-nowrap">
                                Scheduled:{" "}
                                {formatDateTime(notification.scheduled_at)}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-4">
                          <div className="flex items-center space-x-1 xl:space-x-2">
                            <button
                              onClick={() =>
                                handleViewNotification(notification)
                              }
                              className="p-1.5 xl:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                            </button>
                            <button
                              onClick={() => handleConfirmDelete(notification)}
                              disabled={loading}
                              className="p-1.5 xl:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete Notification"
                            >
                              <TrashIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">
                  No notifications found
                </p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <ComposeModal onClose={() => setShowComposeModal(false)} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedNotification(null);
          }}
          onConfirm={handleDeleteNotification}
        />
      )}

      {/* View Detail Modal */}
      {showViewModal && (
        <ViewModal
          onClose={() => {
            setShowViewModal(false);
            setSelectedNotification(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminNotifications;
