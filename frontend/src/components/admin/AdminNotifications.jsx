import React, { useState } from "react";
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

const AdminNotifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showComposeModal, setShowComposeModal] = useState(false);

  const [notifications] = useState([
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message:
        "Scheduled maintenance will occur on January 25, 2024 from 02:00 to 04:00 AM",
      type: "warning",
      status: "sent",
      priority: "high",
      recipients: "all_users",
      recipientCount: 1250,
      createdAt: "2024-01-20T10:30:00",
      sentAt: "2024-01-20T10:35:00",
      createdBy: "System Admin",
    },
    {
      id: 2,
      title: "New Payment Method Available",
      message:
        "We've added support for Dana e-wallet. Start using it for your transactions today!",
      type: "info",
      status: "sent",
      priority: "medium",
      recipients: "active_users",
      recipientCount: 890,
      createdAt: "2024-01-19T14:20:00",
      sentAt: "2024-01-19T14:25:00",
      createdBy: "Marketing Team",
    },
    {
      id: 3,
      title: "Security Alert - Failed Login Attempts",
      message:
        "Multiple failed login attempts detected from IP 192.168.1.100. Account temporarily locked.",
      type: "error",
      status: "sent",
      priority: "critical",
      recipients: "admin_users",
      recipientCount: 5,
      createdAt: "2024-01-19T09:15:00",
      sentAt: "2024-01-19T09:16:00",
      createdBy: "Security System",
    },
    {
      id: 4,
      title: "Welcome New Users",
      message:
        "Welcome to BayarAja! Start exploring our services and enjoy exclusive new user bonuses.",
      type: "success",
      status: "draft",
      priority: "low",
      recipients: "new_users",
      recipientCount: 45,
      createdAt: "2024-01-18T16:45:00",
      sentAt: null,
      createdBy: "Support Team",
    },
    {
      id: 5,
      title: "Transaction Limit Update",
      message:
        "Daily transaction limits have been increased. Check your account for new limits.",
      type: "info",
      status: "scheduled",
      priority: "medium",
      recipients: "premium_users",
      recipientCount: 230,
      createdAt: "2024-01-18T11:30:00",
      sentAt: null,
      scheduledAt: "2024-01-21T10:00:00",
      createdBy: "Product Team",
    },
  ]);

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

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesStatus =
      filterStatus === "all" || notification.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

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
                {notifications.length}
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
                {
                  notifications.filter(
                    (n) =>
                      n.status === "sent" &&
                      new Date(n.sentAt).toDateString() ===
                        new Date().toDateString()
                  ).length
                }
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
                {notifications
                  .filter((n) => n.status === "sent")
                  .reduce((sum, n) => sum + n.recipientCount, 0)}
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
                {notifications.filter((n) => n.status === "scheduled").length}
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
              <span className="text-sm font-medium text-indigo-700">
                {selectedNotifications.length} notification(s) selected
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                  Delete
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

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow"
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
                      {React.createElement(typeConfig[notification.type].icon, {
                        className: `w-4 h-4 ${
                          typeConfig[notification.type].iconColor
                        }`,
                      })}
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
                        {notification.recipientCount.toLocaleString()}
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
                        {formatDateTime(notification.createdAt)}
                      </p>
                      <p className="text-xs text-gray-600">
                        by {notification.createdBy}
                      </p>
                    </div>
                  </div>

                  {/* Status Info */}
                  {notification.sentAt && (
                    <div className="text-xs">
                      <span className="text-green-600 font-medium">
                        Sent: {formatDateTime(notification.sentAt)}
                      </span>
                    </div>
                  )}
                  {notification.scheduledAt && (
                    <div className="text-xs">
                      <span className="text-blue-600 font-medium">
                        Scheduled: {formatDateTime(notification.scheduledAt)}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                    className="hover:bg-gray-50 transition-colors"
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
                            by {notification.createdBy}
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
                          {notification.recipientCount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600 whitespace-nowrap">
                          {notification.recipients.replace("_", " ")}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <div>
                        <p className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {formatDateTime(notification.createdAt)}
                        </p>
                        {notification.sentAt && (
                          <p className="text-xs text-green-600 whitespace-nowrap">
                            Sent: {formatDateTime(notification.sentAt)}
                          </p>
                        )}
                        {notification.scheduledAt && (
                          <p className="text-xs text-blue-600 whitespace-nowrap">
                            Scheduled:{" "}
                            {formatDateTime(notification.scheduledAt)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <div className="flex items-center space-x-1 xl:space-x-2">
                        <button className="p-1.5 xl:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <EyeIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                        <button className="p-1.5 xl:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <ComposeModal onClose={() => setShowComposeModal(false)} />
      )}
    </div>
  );
};

export default AdminNotifications;
