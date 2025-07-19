<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transaction;
use App\Models\PriceList;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Admin login
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            $credentials = $request->only(['email', 'password']);
            
            // Find user with admin role
            $user = User::where('email', $credentials['email'])
                       ->whereIn('role', ['admin', 'super_admin'])
                       ->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password'
                ], 401);
            }

            if ($user->status !== 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'Your account is not active'
                ], 401);
            }

            // Create token
            $token = $user->createToken('admin_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                    ],
                    'token' => $token,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Admin login error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Admin logout
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Logout successful'
            ]);
        } catch (\Exception $e) {
            Log::error('Admin logout error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Admin logout from all devices
     */
    public function logoutAll(Request $request): JsonResponse
    {
        try {
            $request->user()->tokens()->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Logged out from all devices'
            ]);
        } catch (\Exception $e) {
            Log::error('Admin logout all error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get admin profile
     */
    public function profile(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'created_at' => $user->created_at,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Get admin profile error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to get profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Get all users with transaction count (only regular users, not admins)
     */
    public function getUsers(): JsonResponse
    {
        try {
            $users = User::where('role', 'user')
                        ->withCount('transactions')
                        ->orderBy('created_at', 'desc')
                        ->get();
            
            return response()->json([
                'success' => true,
                'data' => $users,
                'message' => 'Users retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching users: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new user
     */
    public function createUser(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => 'required|string|max:20|unique:users',
                'password' => 'required|string|min:8',
                'balance' => 'nullable|numeric|min:0',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
                'balance' => $request->balance ?? 0,
                'role' => 'user',
                'email_verified_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'data' => $user->loadCount('transactions'),
                'message' => 'User created successfully'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a user
     */
    public function updateUser(Request $request, $id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $id,
                'phone' => 'required|string|max:20|unique:users,phone,' . $id,
                'balance' => 'nullable|numeric|min:0',
                'password' => 'nullable|string|min:8',
            ]);

            $updateData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'balance' => $request->balance ?? $user->balance,
            ];

            if ($request->filled('password')) {
                $updateData['password'] = bcrypt($request->password);
            }

            $user->update($updateData);

            return response()->json([
                'success' => true,
                'data' => $user->loadCount('transactions'),
                'message' => 'User updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a user
     */
    public function deleteUser($id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);
            
            // Prevent deleting admin users
            if ($user->role === 'admin' || $user->role === 'super_admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete admin users'
                ], 403);
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get dashboard statistics
     */
    public function getDashboardStats(): JsonResponse
    {
        try {
            // Get current month and previous month for growth calculation
            $currentMonth = now()->startOfMonth();
            $previousMonth = now()->subMonth()->startOfMonth();
            $previousMonthEnd = now()->subMonth()->endOfMonth();

            // For more realistic growth, let's use last 30 days vs previous 30 days
            $last30Days = now()->subDays(30);
            $previous30Days = now()->subDays(60);
            $previous30DaysEnd = now()->subDays(30);

            // Total Users (only regular users, not admins)
            $totalUsers = User::where('role', 'user')->count();
            $last30DaysUsers = User::where('role', 'user')
                ->where('created_at', '>=', $last30Days)->count();
            $previous30DaysUsers = User::where('role', 'user')
                ->whereBetween('created_at', [$previous30Days, $previous30DaysEnd])->count();
            
            // Calculate user growth with fallback logic
            if ($previous30DaysUsers > 0) {
                $userGrowth = (($last30DaysUsers - $previous30DaysUsers) / $previous30DaysUsers) * 100;
            } elseif ($last30DaysUsers > 0) {
                $userGrowth = 100; // 100% growth if we have current users but no previous users
            } else {
                $userGrowth = 0;
            }

            // Total Transactions
            $totalTransactions = Transaction::count();
            $last30DaysTransactions = Transaction::where('created_at', '>=', $last30Days)->count();
            $previous30DaysTransactions = Transaction::whereBetween('created_at', [$previous30Days, $previous30DaysEnd])->count();
            
            if ($previous30DaysTransactions > 0) {
                $transactionGrowth = (($last30DaysTransactions - $previous30DaysTransactions) / $previous30DaysTransactions) * 100;
            } elseif ($last30DaysTransactions > 0) {
                $transactionGrowth = 100;
            } else {
                $transactionGrowth = 0;
            }

            // Total Products
            $totalProducts = PriceList::count();
            $last30DaysProducts = PriceList::where('created_at', '>=', $last30Days)->count();
            $previous30DaysProducts = PriceList::whereBetween('created_at', [$previous30Days, $previous30DaysEnd])->count();
            
            if ($previous30DaysProducts > 0) {
                $productGrowth = (($last30DaysProducts - $previous30DaysProducts) / $previous30DaysProducts) * 100;
            } elseif ($last30DaysProducts > 0) {
                $productGrowth = 100;
            } else {
                $productGrowth = 0;
            }

            // Total Revenue (sum of all transaction prices with status success)
            $totalRevenue = Transaction::where('status', 'success')->sum('price') ?? 0;
            $last30DaysRevenue = Transaction::where('status', 'success')
                ->where('created_at', '>=', $last30Days)
                ->sum('price') ?? 0;
            $previous30DaysRevenue = Transaction::where('status', 'success')
                ->whereBetween('created_at', [$previous30Days, $previous30DaysEnd])
                ->sum('price') ?? 0;
            
            if ($previous30DaysRevenue > 0) {
                $revenueGrowth = (($last30DaysRevenue - $previous30DaysRevenue) / $previous30DaysRevenue) * 100;
            } elseif ($last30DaysRevenue > 0) {
                $revenueGrowth = 100;
            } else {
                $revenueGrowth = 0;
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'totalUsers' => (int) $totalUsers,
                    'totalTransactions' => (int) $totalTransactions,
                    'totalProducts' => (int) $totalProducts,
                    'totalRevenue' => (float) $totalRevenue,
                    'userGrowth' => round($userGrowth, 1),
                    'transactionGrowth' => round($transactionGrowth, 1),
                    'productGrowth' => round($productGrowth, 1),
                    'revenueGrowth' => round($revenueGrowth, 1),
                ],
                'message' => 'Dashboard stats retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching dashboard stats: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
