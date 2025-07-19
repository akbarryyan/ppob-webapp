<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transaction;
use App\Models\PriceList;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Get all users with transaction count
     */
    public function getUsers(): JsonResponse
    {
        try {
            $users = User::withCount('transactions')->get();
            
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
     * Get dashboard statistics
     */
    public function getDashboardStats(): JsonResponse
    {
        try {
            // Get current month and previous month for growth calculation
            $currentMonth = now()->startOfMonth();
            $previousMonth = now()->subMonth()->startOfMonth();
            $previousMonthEnd = now()->subMonth()->endOfMonth();

            // Total Users
            $totalUsers = User::count();
            $currentMonthUsers = User::where('created_at', '>=', $currentMonth)->count();
            $previousMonthUsers = User::whereBetween('created_at', [$previousMonth, $previousMonthEnd])->count();
            $userGrowth = $previousMonthUsers > 0 ? (($currentMonthUsers - $previousMonthUsers) / $previousMonthUsers) * 100 : 0;

            // Total Transactions
            $totalTransactions = Transaction::count();
            $currentMonthTransactions = Transaction::where('created_at', '>=', $currentMonth)->count();
            $previousMonthTransactions = Transaction::whereBetween('created_at', [$previousMonth, $previousMonthEnd])->count();
            $transactionGrowth = $previousMonthTransactions > 0 ? (($currentMonthTransactions - $previousMonthTransactions) / $previousMonthTransactions) * 100 : 0;

            // Total Products
            $totalProducts = PriceList::count();
            $currentMonthProducts = PriceList::where('created_at', '>=', $currentMonth)->count();
            $previousMonthProducts = PriceList::whereBetween('created_at', [$previousMonth, $previousMonthEnd])->count();
            $productGrowth = $previousMonthProducts > 0 ? (($currentMonthProducts - $previousMonthProducts) / $previousMonthProducts) * 100 : 0;

            // Total Revenue (sum of all transaction prices with status success)
            $totalRevenue = Transaction::where('status', 'success')->sum('price') ?? 0;
            $currentMonthRevenue = Transaction::where('status', 'success')
                ->where('created_at', '>=', $currentMonth)
                ->sum('price') ?? 0;
            $previousMonthRevenue = Transaction::where('status', 'success')
                ->whereBetween('created_at', [$previousMonth, $previousMonthEnd])
                ->sum('price') ?? 0;
            $revenueGrowth = $previousMonthRevenue > 0 ? (($currentMonthRevenue - $previousMonthRevenue) / $previousMonthRevenue) * 100 : 0;

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
                'role' => 'in:user,admin,super_admin',
                'status' => 'in:active,inactive',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
                'role' => $request->role ?? 'user',
                'status' => $request->status ?? 'active',
                'balance' => 0.00,
                'referral_code' => User::generateReferralCode(),
                'email_verified_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'data' => $user,
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
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
                'phone' => 'sometimes|string|max:20|unique:users,phone,' . $id,
                'password' => 'sometimes|string|min:8',
                'role' => 'sometimes|in:user,admin,super_admin',
                'status' => 'sometimes|in:active,inactive',
                'balance' => 'sometimes|numeric|min:0',
            ]);

            $updateData = $request->except(['password']);
            
            if ($request->filled('password')) {
                $updateData['password'] = bcrypt($request->password);
            }

            $user->update($updateData);

            return response()->json([
                'success' => true,
                'data' => $user->fresh(),
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

            // Check if user has transactions
            if ($user->transactions()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete user with existing transactions'
                ], 400);
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
     * Admin login
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $user = Auth::user();

            // Check if user has admin role
            if (!in_array($user->role, ['admin', 'super_admin'])) {
                Auth::logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Access denied. Admin privileges required.'
                ], 403);
            }

            $token = $user->createToken('admin-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token,
                'message' => 'Login successful'
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
     * Get admin profile
     */
    public function profile(): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => Auth::user(),
                'message' => 'Profile retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting admin profile: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to get profile',
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
}
