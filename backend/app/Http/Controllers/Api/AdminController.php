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
     * Get transaction statistics
     */
    public function getTransactionStats(Request $request): JsonResponse
    {
        try {
            // Apply same filters as getTransactions for consistency
            $query = Transaction::query();

            if ($request->has('status') && $request->input('status') !== 'all') {
                $query->where('status', $request->input('status'));
            }

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('transaction_id', 'LIKE', "%{$search}%")
                      ->orWhere('product_name', 'LIKE', "%{$search}%")
                      ->orWhereHas('user', function($userQuery) use ($search) {
                          $userQuery->where('name', 'LIKE', "%{$search}%")
                                   ->orWhere('email', 'LIKE', "%{$search}%");
                      });
                });
            }

            if ($request->has('type') && $request->input('type') !== 'all') {
                $query->where('product_category', $request->input('type'));
            }

            // Date range filter
            if ($request->has('date_from') && $request->has('date_to')) {
                $query->whereBetween('created_at', [
                    $request->input('date_from') . ' 00:00:00',
                    $request->input('date_to') . ' 23:59:59'
                ]);
            }

            $totalTransactions = $query->count();
            $totalValue = $query->whereIn('status', ['success', 'completed'])->sum('price'); // Only successful transactions
            $successCount = $query->whereIn('status', ['success', 'completed'])->count();
            $pendingCount = $query->whereIn('status', ['pending', 'processing'])->count();
            $failedCount = $query->where('status', 'failed')->count();

            $successRate = $totalTransactions > 0 ? ($successCount / $totalTransactions) * 100 : 0;

            return response()->json([
                'success' => true,
                'data' => [
                    'total_transactions' => $totalTransactions,
                    'total_value' => $totalValue,
                    'success_rate' => round($successRate, 1),
                    'success_count' => $successCount,
                    'pending_count' => $pendingCount,
                    'failed_count' => $failedCount,
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting transaction stats: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to get transaction statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all transactions with user and product details
     */
    public function getTransactions(Request $request): JsonResponse
    {
        try {
            $query = Transaction::with(['user:id,name,email'])
                               ->orderBy('created_at', 'desc');

            // Apply filters
            if ($request->has('status') && $request->input('status') !== 'all') {
                $query->where('status', $request->input('status'));
            }

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('transaction_id', 'LIKE', "%{$search}%")
                      ->orWhere('product_name', 'LIKE', "%{$search}%")
                      ->orWhereHas('user', function($userQuery) use ($search) {
                          $userQuery->where('name', 'LIKE', "%{$search}%")
                                   ->orWhere('email', 'LIKE', "%{$search}%");
                      });
                });
            }

            if ($request->has('type') && $request->input('type') !== 'all') {
                $query->where('type', $request->input('type'));
            }

            // Date range filter
            if ($request->has('date_from') && $request->has('date_to')) {
                $query->whereBetween('created_at', [
                    $request->input('date_from'),
                    $request->input('date_to')
                ]);
            }

            $perPage = $request->input('per_page', 50);
            $transactions = $query->paginate($perPage);

            // Transform data for frontend
            $transformedTransactions = $transactions->getCollection()->map(function($transaction) {
                return [
                    'id' => $transaction->transaction_id,
                    'userId' => $transaction->user_id,
                    'userName' => $transaction->user ? $transaction->user->name : 'Unknown',
                    'userEmail' => $transaction->user ? $transaction->user->email : 'Unknown',
                    'productName' => $transaction->product_name,
                    'productCode' => $transaction->product_code,
                    'productCategory' => $transaction->type === 'prepaid' ? 'Prepaid' : 'Postpaid',
                    'amount' => (float) $transaction->price,
                    'profit' => (float) ($transaction->profit ?? 0),
                    'totalAmount' => (float) $transaction->price,
                    'status' => $transaction->status,
                    'target' => $transaction->target,
                    'message' => $transaction->message,
                    'createdAt' => $transaction->created_at->format('c'),
                    'processedAt' => $transaction->processed_at ? $transaction->processed_at->format('c') : null,
                    'reference' => $transaction->transaction_id,
                    'notes' => $transaction->message,
                ];
            });

            $transactions->setCollection($transformedTransactions);

            return response()->json([
                'success' => true,
                'data' => $transactions,
                'message' => 'Transactions retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching transactions: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch transactions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single transaction details
     */
    public function getTransaction($id): JsonResponse
    {
        try {
            $transaction = Transaction::with(['user:id,name,email'])
                                    ->where('transaction_id', $id)
                                    ->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found'
                ], 404);
            }

            $transformedTransaction = [
                'id' => $transaction->transaction_id,
                'userId' => $transaction->user_id,
                'userName' => $transaction->user ? $transaction->user->name : 'Unknown',
                'userEmail' => $transaction->user ? $transaction->user->email : 'Unknown',
                'productName' => $transaction->product_name,
                'productCode' => $transaction->product_code,
                'productCategory' => $transaction->type === 'prepaid' ? 'Prepaid' : 'Postpaid',
                'amount' => (float) $transaction->price,
                'profit' => (float) ($transaction->profit ?? 0),
                'totalAmount' => (float) $transaction->price,
                'status' => $transaction->status,
                'target' => $transaction->target,
                'message' => $transaction->message,
                'createdAt' => $transaction->created_at->format('c'),
                'processedAt' => $transaction->processed_at ? $transaction->processed_at->format('c') : null,
                'completedAt' => $transaction->processed_at ? $transaction->processed_at->format('c') : null,
                'reference' => $transaction->transaction_id,
                'notes' => $transaction->message,
                'paymentMethod' => 'Digital Payment',
                'paymentChannel' => 'System',
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedTransaction,
                'message' => 'Transaction retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching transaction: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch transaction',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update transaction status
     */
    public function updateTransactionStatus(Request $request, $id): JsonResponse
    {
        try {
            $request->validate([
                'status' => 'required|in:pending,success,failed',
                'notes' => 'nullable|string'
            ]);

            $transaction = Transaction::where('transaction_id', $id)->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found'
                ], 404);
            }

            $updateData = [
                'status' => $request->input('status')
            ];

            if ($request->input('notes')) {
                $updateData['message'] = $request->input('notes');
            }

            if ($request->input('status') === 'success' && !$transaction->processed_at) {
                $updateData['processed_at'] = now();
            }

            $transaction->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Transaction status updated successfully',
                'data' => [
                    'id' => $transaction->transaction_id,
                    'status' => $transaction->status,
                    'processed_at' => $transaction->processed_at
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating transaction status: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update transaction status',
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

    /**
     * Get reports overview data
     */
    public function getReports(Request $request): JsonResponse
    {
        try {
            $period = $request->query('period', '30days');
            
            // Calculate date range based on period
            if ($period === 'all') {
                // For all time, use earliest possible date
                $startDate = now()->subYears(10); // Very old date to capture all data
                $endDate = now();
                $prevStartDate = now()->subYears(20); // Even older for comparison 
                $prevEndDate = now()->subYears(10);
            } else {
                $days = match($period) {
                    '7days' => 7,
                    '30days' => 30,
                    '90days' => 90,
                    '365days' => 365,
                    default => 30
                };

                $endDate = now();
                $startDate = now()->subDays($days);
                $prevStartDate = now()->subDays($days * 2);
                $prevEndDate = $startDate->copy();
            }

            // Current period stats
            if ($period === 'all') {
                // For "all" period, don't use date filters
                $totalRevenue = Transaction::where('status', 'success')
                    ->sum('price') ?? 0;

                // Total transactions = ALL transactions (not just successful ones)
                $totalTransactions = Transaction::count();

                $totalUsers = User::where('role', 'user')->count();

                $successfulTransactions = Transaction::where('status', 'success')->count();
                
                $totalAllTransactions = Transaction::count();

                $successRate = $totalAllTransactions > 0 ? ($successfulTransactions / $totalAllTransactions) * 100 : 0;
            } else {
                // For specific periods, use date filters
                $totalRevenue = Transaction::where('status', 'success')
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->sum('price') ?? 0;

                // Total transactions = ALL transactions (not just successful ones)
                $totalTransactions = Transaction::whereBetween('created_at', [$startDate, $endDate])
                    ->count();

                $totalUsers = User::where('role', 'user')
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->count();

                $successfulTransactions = Transaction::where('status', 'success')
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->count();
                
                $totalAllTransactions = Transaction::whereBetween('created_at', [$startDate, $endDate])
                    ->count();

                $successRate = $totalAllTransactions > 0 ? ($successfulTransactions / $totalAllTransactions) * 100 : 0;
            }

            // Previous period stats for growth calculation
            if ($period === 'all') {
                // For "all" period, set previous stats to 0 (no comparison available)
                $prevRevenue = 0;
                $prevTransactions = 0;
                $prevUsers = 0;
                $prevSuccessfulTransactions = 0;
                $prevTotalAllTransactions = 0;
                $prevSuccessRate = 0;
            } else {
                // For specific periods, use date filters
                $prevRevenue = Transaction::where('status', 'success')
                    ->whereBetween('created_at', [$prevStartDate, $prevEndDate])
                    ->sum('price') ?? 0;

                // Previous total transactions = ALL transactions (not just successful ones)
                $prevTransactions = Transaction::whereBetween('created_at', [$prevStartDate, $prevEndDate])
                    ->count();

                $prevUsers = User::where('role', 'user')
                    ->whereBetween('created_at', [$prevStartDate, $prevEndDate])
                    ->count();

                $prevSuccessfulTransactions = Transaction::where('status', 'success')
                    ->whereBetween('created_at', [$prevStartDate, $prevEndDate])
                    ->count();
                
                $prevTotalAllTransactions = Transaction::whereBetween('created_at', [$prevStartDate, $prevEndDate])
                    ->count();

                $prevSuccessRate = $prevTotalAllTransactions > 0 ? ($prevSuccessfulTransactions / $prevTotalAllTransactions) * 100 : 0;
            }

            // Calculate growth percentages
            $revenueGrowth = $prevRevenue > 0 ? (($totalRevenue - $prevRevenue) / $prevRevenue) * 100 : ($totalRevenue > 0 ? 100 : 0);
            $transactionGrowth = $prevTransactions > 0 ? (($totalTransactions - $prevTransactions) / $prevTransactions) * 100 : ($totalTransactions > 0 ? 100 : 0);
            $userGrowth = $prevUsers > 0 ? (($totalUsers - $prevUsers) / $prevUsers) * 100 : ($totalUsers > 0 ? 100 : 0);
            $successRateChange = $prevSuccessRate > 0 ? $successRate - $prevSuccessRate : 0;

            return response()->json([
                'success' => true,
                'data' => [
                    'overview' => [
                        'totalRevenue' => (float) $totalRevenue,
                        'totalTransactions' => (int) $totalTransactions,
                        'successfulTransactions' => (int) $successfulTransactions,
                        'totalUsers' => (int) $totalUsers,
                        'successRate' => round($successRate, 1),
                        'revenueGrowth' => round($revenueGrowth, 1),
                        'transactionGrowth' => round($transactionGrowth, 1),
                        'userGrowth' => round($userGrowth, 1),
                        'successRateChange' => round($successRateChange, 1),
                    ]
                ],
                'message' => 'Reports data retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching reports: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch reports',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get top selling products
     */
    public function getTopProducts(Request $request): JsonResponse
    {
        try {
            $period = $request->query('period', '30days');
            $limit = $request->query('limit', 10);
            
            // Calculate date range based on period
            if ($period === 'all') {
                // For all time, use earliest possible date
                $startDate = now()->subYears(10); // Very old date to capture all data
                $endDate = now();
            } else {
                $days = match($period) {
                    '7days' => 7,
                    '30days' => 30,
                    '90days' => 90,
                    '365days' => 365,
                    default => 30
                };

                $startDate = now()->subDays($days);
                $endDate = now();
            }

            // Get top products by transaction count and revenue
            $topProducts = Transaction::selectRaw('
                    product_code,
                    product_name,
                    COUNT(*) as sales,
                    SUM(price) as revenue
                ')
                ->where('status', 'success')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->groupBy('product_code', 'product_name')
                ->orderBy('revenue', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($item) {
                    return [
                        'product' => $item->product_name,
                        'sales' => (int) $item->sales,
                        'revenue' => (float) $item->revenue,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $topProducts,
                'message' => 'Top products retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching top products: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch top products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get top users by spending
     */
    public function getTopUsers(Request $request): JsonResponse
    {
        try {
            $period = $request->query('period', '30days');
            $limit = $request->query('limit', 10);
            
            // Calculate date range based on period
            if ($period === 'all') {
                // For all time, use earliest possible date
                $startDate = now()->subYears(10); // Very old date to capture all data
                $endDate = now();
            } else {
                $days = match($period) {
                    '7days' => 7,
                    '30days' => 30,
                    '90days' => 90,
                    '365days' => 365,
                    default => 30
                };

                $startDate = now()->subDays($days);
                $endDate = now();
            }

            // Get top users by total spending
            $topUsers = Transaction::selectRaw('
                    users.name,
                    COUNT(transactions.id) as transactions,
                    SUM(transactions.price) as spent
                ')
                ->join('users', 'transactions.user_id', '=', 'users.id')
                ->where('transactions.status', 'success')
                ->whereBetween('transactions.created_at', [$startDate, $endDate])
                ->groupBy('users.id', 'users.name')
                ->orderBy('spent', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->name,
                        'transactions' => (int) $item->transactions,
                        'spent' => (float) $item->spent,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $topUsers,
                'message' => 'Top users retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching top users: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch top users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get daily revenue data
     */
    public function getDailyRevenue(Request $request): JsonResponse
    {
        try {
            $period = $request->query('period', '30days');
            
            // Calculate date range based on period
            if ($period === 'all') {
                // For all time, use earliest possible date but limit to recent data for daily view
                $startDate = now()->subDays(30); // Show last 30 days even for "all" period for readability
                $endDate = now();
            } else {
                $days = match($period) {
                    '7days' => 7,
                    '30days' => 30,
                    '90days' => 90,
                    '365days' => 365,
                    default => 30
                };

                $startDate = now()->subDays($days);
                $endDate = now();
            }

            // Get daily revenue data
            $dailyRevenue = Transaction::selectRaw('
                    DATE(created_at) as date,
                    COUNT(*) as transactions,
                    SUM(price) as revenue
                ')
                ->where('status', 'success')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get()
                ->map(function ($item) {
                    return [
                        'date' => $item->date,
                        'transactions' => (int) $item->transactions,
                        'revenue' => (float) $item->revenue,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $dailyRevenue,
                'message' => 'Daily revenue data retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching daily revenue: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch daily revenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
