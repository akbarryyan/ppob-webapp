<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transaction;
use App\Models\PriceList;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
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

            // Total Users (only regular users, not admins)
            $totalUsers = User::where('role', 'user')->count();
            $currentMonthUsers = User::where('role', 'user')
                ->where('created_at', '>=', $currentMonth)->count();
            $previousMonthUsers = User::where('role', 'user')
                ->whereBetween('created_at', [$previousMonth, $previousMonthEnd])->count();
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
}
