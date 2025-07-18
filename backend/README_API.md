# BayarAja PPOB API Documentation

## Overview

API untuk aplikasi PPOB (Payment Point Online Bank) BayarAja dengan sistem authentication menggunakan Laravel Sanctum.

## Base URL

```
http://localhost:8000/api
```

## Authentication

API menggunakan Bearer Token authentication dengan Laravel Sanctum.

### Headers Required for Protected Routes

```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

## Endpoints

### Authentication Endpoints

#### 1. Register User

```
POST /auth/register
```

**Request Body:**

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "password": "password123",
    "password_confirmation": "password123",
    "referral_code": "BRXXXXXX" // optional
}
```

**Response Success (201):**

```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "081234567890",
            "balance": "0.00",
            "status": "active",
            "referral_code": "BRJZCYWM",
            "avatar": null
        },
        "token": "1|gbgKFNSW7zQ4u2kLueKgbbnStpuPc43OcNJrksu7d85fdd14"
    }
}
```

#### 2. Login User

```
POST /auth/login
```

**Request Body:**

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response Success (200):**

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "081234567890",
            "balance": "0.00",
            "status": "active",
            "referral_code": "BRJZCYWM",
            "avatar": null,
            "last_login_at": "2025-07-18T21:33:42.000000Z"
        },
        "token": "1|gbgKFNSW7zQ4u2kLueKgbbnStpuPc43OcNJrksu7d85fdd14"
    }
}
```

### Protected Endpoints (Require Authentication)

#### 3. Get User Profile

```
GET /auth/profile
```

**Response Success (200):**

```json
{
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "081234567890",
            "balance": "0.00",
            "status": "active",
            "referral_code": "BRJZCYWM",
            "avatar": null,
            "last_login_at": "2025-07-18T21:33:42.000000Z",
            "email_verified_at": null,
            "created_at": "2025-07-18T21:33:22.000000Z"
        }
    }
}
```

#### 4. Update User Profile

```
PUT /auth/profile
```

**Request Body:**

```json
{
    "name": "John Doe Updated",
    "phone": "081234567891",
    "avatar": "path/to/avatar.jpg"
}
```

#### 5. Change Password

```
POST /auth/change-password
```

**Request Body:**

```json
{
    "current_password": "password123",
    "new_password": "newpassword123",
    "new_password_confirmation": "newpassword123"
}
```

#### 6. Logout

```
POST /auth/logout
```

**Response Success (200):**

```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

#### 7. Logout from All Devices

```
POST /auth/logout-all
```

**Response Success (200):**

```json
{
    "success": true,
    "message": "Logged out from all devices successfully"
}
```

## Demo Accounts

### Admin Account

-   **Email:** admin@bayaraja.com
-   **Password:** admin123
-   **Balance:** Rp 1,000,000

### User Accounts

-   **Email:** user1@example.com
-   **Password:** password123
-   **Balance:** Rp 50,000

-   **Email:** user2@example.com
-   **Password:** password123
-   **Balance:** Rp 75,000

-   **Email:** referred@example.com
-   **Password:** password123
-   **Balance:** Rp 25,000
-   **Referred by:** user1@example.com

## Database Schema

### Users Table

```sql
- id (bigint, primary key)
- name (varchar)
- email (varchar, unique)
- phone (varchar, unique)
- email_verified_at (timestamp, nullable)
- password (varchar)
- balance (decimal(15,2), default: 0)
- avatar (varchar, nullable)
- status (enum: active, inactive, suspended, default: active)
- last_login_at (timestamp, nullable)
- referral_code (varchar, unique)
- referred_by (bigint, foreign key to users.id, nullable)
- remember_token (varchar, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

## Error Responses

### Validation Error (422)

```json
{
    "success": false,
    "message": "Validation errors",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password field is required."]
    }
}
```

### Authentication Error (401)

```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

### Authorization Error (403)

```json
{
    "success": false,
    "message": "Account is suspended or inactive"
}
```

### Server Error (500)

```json
{
    "success": false,
    "message": "Login failed",
    "error": "Error message details"
}
```

## Features Implemented

✅ **User Registration** with referral system
✅ **User Login** with account status validation
✅ **JWT Authentication** using Laravel Sanctum
✅ **User Profile Management**
✅ **Password Change**
✅ **Logout** (single device and all devices)
✅ **Referral System** with unique codes
✅ **Balance System** for PPOB transactions
✅ **Account Status** (active, inactive, suspended)
✅ **Phone Number** validation and uniqueness
✅ **Last Login** tracking

## Next Steps

1. **PPOB Services API** (Pulsa, PLN, BPJS, etc.)
2. **Transaction History API**
3. **Balance Top-up API**
4. **Admin Panel API**
5. **Payment Gateway Integration**
6. **Notification System**
7. **Report & Analytics API**

## Running the API

1. Start the development server:

```bash
cd backend
php artisan serve --host=0.0.0.0 --port=8000
```

2. The API will be available at: `http://localhost:8000/api`

3. Use tools like Postman, Insomnia, or curl to test the endpoints.
