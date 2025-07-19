import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  UserPlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import "../../styles/scrollbar.css";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("adminAuthToken") ||
        sessionStorage.getItem("adminAuthToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Transform API data to match our component format
        const transformedUsers = data.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || "N/A",
          role: user.role || "user",
          status: user.email_verified_at ? "active" : "inactive",
          balance: user.balance || 0,
          totalTransactions: user.transactions_count || 0,
          joinDate: user.created_at,
          lastActive: user.updated_at || user.created_at,
          avatar: null,
        }));

        setUsers(transformedUsers);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-yellow-100 text-yellow-800 border-yellow-200",
    suspended: "bg-red-100 text-red-800 border-red-200",
  };

  const roleColors = {
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    user: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <svg
              className="animate-spin h-6 w-6 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-600 font-medium">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-medium mb-2">Error loading users</p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const UserModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">User Details</h3>
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
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {user.name}
              </h4>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-4">{user.phone}</p>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    statusColors[user.status]
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    roleColors[user.role]
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Balance
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(user.balance)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total Transactions
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {user.totalTransactions}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Join Date
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(user.joinDate)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Last Active
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {getTimeAgo(user.lastActive)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Edit User
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              View Transactions
            </button>
          </div>
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
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all user accounts ({users.length} users loaded)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh Data</span>
          </button>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
            <UserPlusIcon className="w-5 h-5" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Selected Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-700">
                {selectedUsers.length} user(s) selected
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                  Activate
                </button>
                <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors">
                  Suspend
                </button>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Table Info Header */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50/50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold">{filteredUsers.length}</span> user
              {filteredUsers.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterStatus !== "all" && ` with ${filterStatus} status`}
              {filterRole !== "all" && ` in ${filterRole} role`}
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
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* User Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1 flex-shrink-0"
                      />
                      <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                          statusColors[user.status]
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                          roleColors[user.role]
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* User Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Balance</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {formatCurrency(user.balance)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Transactions</p>
                      <p className="font-semibold text-gray-900">
                        {user.totalTransactions}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Join Date</p>
                      <p className="font-semibold text-gray-900 text-xs">
                        {formatDate(user.joinDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Last Active</p>
                      <p className="font-semibold text-gray-900 text-xs">
                        {getTimeAgo(user.lastActive)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserModal(true);
                      }}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <PencilIcon className="w-4 h-4" />
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
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[200px]">
                    User
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[100px]">
                    Status
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[80px]">
                    Role
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                    Balance
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[100px]">
                    Transactions
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                    Last Active
                  </th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs xl:text-sm font-semibold text-gray-900 min-w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 xl:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs xl:text-sm font-semibold text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span
                        className={`px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                          statusColors[user.status]
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span
                        className={`px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                          roleColors[user.role]
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span className="text-xs xl:text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {formatCurrency(user.balance)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span className="text-xs xl:text-sm font-semibold text-gray-900">
                        {user.totalTransactions}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <span className="text-xs xl:text-sm text-gray-600 whitespace-nowrap">
                        {getTimeAgo(user.lastActive)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-4">
                      <div className="flex items-center space-x-1 xl:space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="p-1.5 xl:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                        <button className="p-1.5 xl:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <PencilIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
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

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No users found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminUsers;
