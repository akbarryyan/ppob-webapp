<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin BayarAja',
            'email' => 'admin@bayaraja.com',
            'phone' => '081234567890',
            'password' => Hash::make('admin123'),
            'balance' => 1000000.00,
            'status' => 'active',
            'role' => 'super_admin',
            'referral_code' => User::generateReferralCode(),
            'email_verified_at' => now(),
        ]);

        // Create demo users
        User::create([
            'name' => 'Demo User 1',
            'email' => 'user1@example.com',
            'phone' => '081234567891',
            'password' => Hash::make('password123'),
            'balance' => 50000.00,
            'status' => 'active',
            'referral_code' => User::generateReferralCode(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Demo User 2',
            'email' => 'user2@example.com',
            'phone' => '081234567892',
            'password' => Hash::make('password123'),
            'balance' => 75000.00,
            'status' => 'active',
            'referral_code' => User::generateReferralCode(),
            'email_verified_at' => now(),
        ]);

        // Create user with referral relationship
        $referrer = User::where('email', 'user1@example.com')->first();
        User::create([
            'name' => 'Referred User',
            'email' => 'referred@example.com',
            'phone' => '081234567893',
            'password' => Hash::make('password123'),
            'balance' => 25000.00,
            'status' => 'active',
            'referral_code' => User::generateReferralCode(),
            'referred_by' => $referrer->id,
            'email_verified_at' => now(),
        ]);
    }
}
