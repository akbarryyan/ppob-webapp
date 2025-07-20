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
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

  // New states for modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (showSuccessToast = false) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
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

        // Show success message only when manually refreshing
        if (showSuccessToast) {
          toast.success(
            `${transformedUsers.length} users loaded successfully!`,
            {
              position: "top-right",
              autoClose: 2000,
            }
          );
        }
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
      toast.error(`Error loading users: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Add User function
  const handleAddUser = async (userData) => {
    try {
      const token =
        localStorage.getItem("adminAuthToken") ||
        sessionStorage.getItem("adminAuthToken");

      const response = await fetch("http://localhost:8000/api/admin/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        // Add new user to the list
        const transformedUser = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone || "N/A",
          role: data.data.role || "user",
          status: data.data.email_verified_at ? "active" : "inactive",
          balance: data.data.balance || 0,
          totalTransactions: data.data.transactions_count || 0,
          joinDate: data.data.created_at,
          lastActive: data.data.updated_at || data.data.created_at,
          avatar: null,
        };

        setUsers((prev) => [transformedUser, ...prev]);
        setShowAddUserModal(false);
        toast.success(`User ${userData.name} has been created successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        throw new Error(data.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(`Error creating user: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // Edit User function
  const handleEditUser = async (userData) => {
    try {
      const token =
        localStorage.getItem("adminAuthToken") ||
        sessionStorage.getItem("adminAuthToken");

      const response = await fetch(
        `http://localhost:8000/api/admin/users/${userToEdit.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update user in the list
        const transformedUser = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone || "N/A",
          role: data.data.role || "user",
          status: data.data.email_verified_at ? "active" : "inactive",
          balance: data.data.balance || 0,
          totalTransactions: data.data.transactions_count || 0,
          joinDate: data.data.created_at,
          lastActive: data.data.updated_at || data.data.created_at,
          avatar: null,
        };

        setUsers((prev) =>
          prev.map((user) =>
            user.id === userToEdit.id ? transformedUser : user
          )
        );
        setShowEditUserModal(false);
        setUserToEdit(null);
        toast.success(`User ${userData.name} has been updated successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        throw new Error(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(`Error updating user: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // Delete User function
  const handleDeleteUser = async () => {
    try {
      const token =
        localStorage.getItem("adminAuthToken") ||
        sessionStorage.getItem("adminAuthToken");

      const response = await fetch(
        `http://localhost:8000/api/admin/users/${userToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Remove user from the list
        setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
        toast.success(
          `User ${userToDelete.name} has been deleted successfully!`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        throw new Error(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`Error deleting user: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
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
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
              onClick={() => fetchUsers(true)}
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

  // Add User Modal Component
  const AddUserModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      balance: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await onSubmit(formData);
      setIsSubmitting(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
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

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter user name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter password (min 8 characters)"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Balance
              </label>
              <input
                type="number"
                min="0"
                value={formData.balance}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    balance: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter initial balance (optional)"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit User Modal Component
  const EditUserModal = ({ user, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
      balance: user.balance,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await onSubmit(formData);
      setIsSubmitting(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Edit User</h3>
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

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Leave empty to keep current password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep current password
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Balance
              </label>
              <input
                type="number"
                min="0"
                value={formData.balance}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    balance: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Delete User Modal Component
  const DeleteUserModal = ({ user, onClose, onConfirm }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
      setIsDeleting(true);
      await onConfirm();
      setIsDeleting(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Delete User</h3>
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
            <div className="text-center mb-6">
              <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Are you sure you want to delete this user?
              </h4>
              <p className="text-gray-600">
                <strong>{user.name}</strong> ({user.email})
              </p>
              <p className="text-gray-500 text-sm mt-2">
                This action cannot be undone. All user data and transactions
                will be permanently deleted.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            onClick={() => fetchUsers(true)}
            disabled={loading}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
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
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
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
                      title="View User"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setUserToEdit(user);
                        setShowEditUserModal(true);
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit User"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setUserToDelete(user);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete User"
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
                          title="View User"
                        >
                          <EyeIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setUserToEdit(user);
                            setShowEditUserModal(true);
                          }}
                          className="p-1.5 xl:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <PencilIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 xl:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
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

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onSubmit={handleAddUser}
        />
      )}

      {/* Edit User Modal */}
      {showEditUserModal && userToEdit && (
        <EditUserModal
          user={userToEdit}
          onClose={() => {
            setShowEditUserModal(false);
            setUserToEdit(null);
          }}
          onSubmit={handleEditUser}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default AdminUsers;
