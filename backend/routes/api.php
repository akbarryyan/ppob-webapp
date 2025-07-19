<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DigiflazzController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Debug route (public for now)
Route::get('/digiflazz/test-api', [DigiflazzController::class, 'testApi']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/logout-all', [AuthController::class, 'logoutAll']);
    });

    // Digiflazz API routes
    Route::prefix('digiflazz')->group(function () {
        Route::get('/prepaid-price-list', [DigiflazzController::class, 'getPrepaidPriceList']);
        Route::get('/postpaid-price-list', [DigiflazzController::class, 'getPostpaidPriceList']);
        Route::get('/test-api', [DigiflazzController::class, 'testApi']); // Debug endpoint
    });

    // Legacy route for backward compatibility
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
