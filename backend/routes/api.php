<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DigiflazzController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AdminNotificationController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Admin public routes
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
});

// Debug route (public for now)
Route::get('/digiflazz/test-api', [DigiflazzController::class, 'testApi']);

// Public settings route
Route::get('/public/settings/general', [AdminController::class, 'getGeneralSettings']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/logout-all', [AuthController::class, 'logoutAll']);
    });

    // User transactions route
    Route::get('/transactions', [AuthController::class, 'getTransactions']);

    // Admin routes requiring authentication
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        // Admin authentication routes
        Route::get('/profile', [AdminController::class, 'profile']);
        Route::post('/logout', [AdminController::class, 'logout']);
        Route::post('/logout-all', [AdminController::class, 'logoutAll']);

        // Dashboard stats route
        Route::get('/dashboard/stats', [AdminController::class, 'getDashboardStats']);
        Route::get('/recent-activity', [AdminController::class, 'getRecentActivity']);

        // Transactions management routes
        Route::get('/transactions', [AdminController::class, 'getTransactions']);
        Route::get('/transactions/stats', [AdminController::class, 'getTransactionStats']);
        Route::get('/transactions/{id}', [AdminController::class, 'getTransaction']);
        Route::patch('/transactions/{id}/status', [AdminController::class, 'updateTransactionStatus']);

        // Users management routes
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::post('/users', [AdminController::class, 'createUser']);
        Route::put('/users/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);

        // Reports routes
        Route::get('/reports', [AdminController::class, 'getReports']);
        Route::get('/reports/products', [AdminController::class, 'getTopProducts']);
        Route::get('/reports/users', [AdminController::class, 'getTopUsers']);
        Route::get('/reports/daily', [AdminController::class, 'getDailyRevenue']);

        // Notifications management routes
        Route::get('/notifications', [AdminNotificationController::class, 'index']);
        Route::get('/notifications/stats', [AdminNotificationController::class, 'stats']);
        Route::post('/notifications', [AdminNotificationController::class, 'store']);
        Route::get('/notifications/{notification}', [AdminNotificationController::class, 'show']);
        Route::put('/notifications/{notification}', [AdminNotificationController::class, 'update']);
        Route::delete('/notifications/{notification}', [AdminNotificationController::class, 'destroy']);
        Route::post('/notifications/bulk-delete', [AdminNotificationController::class, 'bulkDelete']);

        // Digiflazz Admin Settings routes
        Route::prefix('digiflazz')->group(function () {
            Route::get('/settings', [DigiflazzController::class, 'getSettings']);
            Route::post('/settings', [DigiflazzController::class, 'updateSettings']);
            Route::post('/check-balance', [DigiflazzController::class, 'checkBalance']);
            
            // Admin routes for syncing data
            Route::post('/sync-prepaid-price-list', [DigiflazzController::class, 'syncPrepaidPriceList']);
            Route::post('/sync-postpaid-price-list', [DigiflazzController::class, 'syncPostpaidPriceList']);
        });

        // General Settings routes
        Route::prefix('settings')->group(function () {
            Route::get('/general', [AdminController::class, 'getGeneralSettings']);
            Route::post('/general', [AdminController::class, 'saveGeneralSettings']);
        });
    });

    // Digiflazz API routes (public)
    Route::prefix('digiflazz')->group(function () {
        Route::get('/prepaid-price-list', [DigiflazzController::class, 'getPrepaidPriceList']);
        Route::get('/postpaid-price-list', [DigiflazzController::class, 'getPostpaidPriceList']);
    });

    // Legacy route for backward compatibility
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
