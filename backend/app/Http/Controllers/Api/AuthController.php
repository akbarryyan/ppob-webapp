<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => 'required|string|max:20|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'referral_code' => 'nullable|string|exists:users,referral_code'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find referrer if referral code provided
            $referrer = null;
            if ($request->input('referral_code')) {
                $referrer = User::where('referral_code', $request->input('referral_code'))->first();
            }

            // Create user
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'password' => Hash::make($request->input('password')),
                'referral_code' => User::generateReferralCode(),
                'referred_by' => $referrer ? $referrer->getAttribute('id') : null,
                'status' => 'active',
            ]);

            // Refresh the user instance to get all attributes
            $user->refresh();

            // Generate token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'balance' => $user->balance,
                        'status' => $user->status,
                        'referral_code' => $user->referral_code,
                        'avatar' => $user->avatar,
                    ],
                    'token' => $token
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check credentials
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            /** @var \App\Models\User $user */
            $user = Auth::user();

            // Check if user is active
            if ($user->status !== 'active') {
                Auth::logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Account is suspended or inactive'
                ], 403);
            }

            // Update last login using update method
            $user->update(['last_login_at' => now()]);

            // Generate token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'balance' => $user->balance,
                        'status' => $user->status,
                        'referral_code' => $user->referral_code,
                        'avatar' => $user->avatar,
                        'last_login_at' => $user->last_login_at,
                    ],
                    'token' => $token
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get authenticated user profile
     */
    public function profile(Request $request)
    {
        try {
            $user = $request->user();

            return response()->json([
                'success' => true,
                'message' => 'Profile retrieved successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'balance' => $user->balance,
                        'status' => $user->status,
                        'referral_code' => $user->referral_code,
                        'avatar' => $user->avatar,
                        'last_login_at' => $user->last_login_at,
                        'email_verified_at' => $user->email_verified_at,
                        'created_at' => $user->created_at,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'phone' => 'sometimes|required|string|max:20|unique:users,phone,' . $user->id,
                'avatar' => 'sometimes|nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user->update($request->only(['name', 'phone', 'avatar']));

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'balance' => $user->balance,
                        'status' => $user->status,
                        'referral_code' => $user->referral_code,
                        'avatar' => $user->avatar,
                        'last_login_at' => $user->last_login_at,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = $request->user();

            // Check current password
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect'
                ], 422);
            }

            // Update password
            $user->update([
                'password' => Hash::make($request->new_password)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to change password',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout from all devices
     */
    public function logoutAll(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out from all devices successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user transactions
     */
    public function getTransactions(Request $request)
    {
        try {
            $user = $request->user();
            $perPage = $request->input('per_page', 15);
            $status = $request->input('status');
            $type = $request->input('type');
            $search = $request->input('search');

            $query = $user->transactions()->orderBy('created_at', 'desc');

            // Filter by status
            if ($status && $status !== 'all') {
                $query->where('status', $status);
            }

            // Filter by type
            if ($type && $type !== 'all') {
                $query->where('type', 'like', '%' . $type . '%');
            }

            // Search functionality
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('transaction_id', 'like', '%' . $search . '%')
                      ->orWhere('product_name', 'like', '%' . $search . '%')
                      ->orWhere('target', 'like', '%' . $search . '%');
                });
            }

            $transactions = $query->paginate($perPage);

            // Transform data for frontend consistency
            $transformedTransactions = $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'transaction_code' => $transaction->transaction_id,
                    'product_name' => $transaction->product_name,
                    'type' => $transaction->type,
                    'amount' => $transaction->price,
                    'status' => $transaction->status,
                    'target_number' => $transaction->target,
                    'message' => $transaction->message,
                    'created_at' => $transaction->created_at,
                    'processed_at' => $transaction->processed_at,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedTransactions,
                'pagination' => [
                    'current_page' => $transactions->currentPage(),
                    'last_page' => $transactions->lastPage(),
                    'per_page' => $transactions->perPage(),
                    'total' => $transactions->total(),
                ],
                'message' => 'Transactions retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve transactions',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
