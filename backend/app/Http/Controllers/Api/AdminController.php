<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    /**
     * Admin login
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
                'rememberMe' => 'boolean'
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => ['Invalid credentials.'],
                ]);
            }

            // Check if user has admin role
            if (!in_array($user->role, ['admin', 'super_admin'])) {
                throw ValidationException::withMessages([
                    'email' => ['Access denied. Admin privileges required.'],
                ]);
            }

            if (!Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['Invalid credentials.'],
                ]);
            }

            // Create token with admin scope
            $token = $user->createToken('admin-token', ['admin'])->plainTextToken;

            Log::info('Admin login successful', [
                'admin_id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ],
                'token' => $token,
                'expires_in' => config('sanctum.expiration', null),
            ], 200);

        } catch (ValidationException $e) {
            Log::warning('Admin login failed - validation error', [
                'email' => $request->email,
                'errors' => $e->errors(),
                'ip' => $request->ip()
            ]);
            
            return response()->json([
                'message' => 'Login failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Admin login failed - server error', [
                'email' => $request->email,
                'error' => $e->getMessage(),
                'ip' => $request->ip()
            ]);

            return response()->json([
                'message' => 'Internal server error',
                'error' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }

    /**
     * Get admin profile
     */
    public function profile(Request $request)
    {
        try {
            $user = $request->user();
            
            // Verify admin role
            if (!in_array($user->role, ['admin', 'super_admin'])) {
                return response()->json([
                    'message' => 'Access denied. Admin privileges required.',
                ], 403);
            }

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ],
            ], 200);

        } catch (\Exception $e) {
            Log::error('Admin profile fetch failed', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null
            ]);

            return response()->json([
                'message' => 'Internal server error',
                'error' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }

    /**
     * Admin logout
     */
    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            
            Log::info('Admin logout', [
                'admin_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip()
            ]);

            // Delete current token
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logged out successfully',
            ], 200);

        } catch (\Exception $e) {
            Log::error('Admin logout failed', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null
            ]);

            return response()->json([
                'message' => 'Internal server error',
                'error' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }

    /**
     * Logout from all devices
     */
    public function logoutAll(Request $request)
    {
        try {
            $user = $request->user();
            
            Log::info('Admin logout from all devices', [
                'admin_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip()
            ]);

            // Delete all tokens
            $user->tokens()->delete();

            return response()->json([
                'message' => 'Logged out from all devices successfully',
            ], 200);

        } catch (\Exception $e) {
            Log::error('Admin logout all failed', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null
            ]);

            return response()->json([
                'message' => 'Internal server error',
                'error' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }
}
