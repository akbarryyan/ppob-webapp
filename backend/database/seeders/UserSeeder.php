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
            'created_at' => now()->subMonths(6), // Admin created 6 months ago
        ]);

        // Create users with realistic time distribution
        $userNames = [
            'Budi Santoso', 'Sari Wijaya', 'Andi Pratama', 'Maya Sari', 'Deni Rahman',
            'Lisa Permata', 'Agus Setiawan', 'Nina Kartika', 'Rudi Hermawan', 'Dewi Lestari',
            'Bambang Wibowo', 'Rina Sari', 'Yudi Prasetyo', 'Indah Sari', 'Hendra Gunawan',
            'Sinta Maharani', 'Dony Kurniawan', 'Lina Rahayu', 'Wahyu Hidayat', 'Fitri Handayani'
        ];
        
        $domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        
        // Create users distributed over different periods
        for ($i = 0; $i < 20; $i++) {
            $name = $userNames[$i];
            $firstName = explode(' ', $name)[0];
            $domain = $domains[array_rand($domains)];
            
            // Create users over different time periods for realistic growth
            if ($i < 5) {
                $createdDate = now()->subMonths(rand(4, 6)); // Old users (4-6 months ago)
            } elseif ($i < 10) {
                $createdDate = now()->subMonths(rand(2, 4)); // Medium old users (2-4 months ago)
            } elseif ($i < 15) {
                $createdDate = now()->subDays(rand(30, 60)); // Recent users (1-2 months ago)
            } else {
                $createdDate = now()->subDays(rand(1, 30)); // New users (last 30 days)
            }
            
            User::create([
                'name' => $name,
                'email' => strtolower($firstName) . ($i + 1) . '@' . $domain,
                'phone' => '0812' . str_pad(rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),
                'password' => Hash::make('password123'),
                'balance' => rand(10000, 100000),
                'status' => rand(1, 100) <= 95 ? 'active' : 'inactive', // 95% active
                'referral_code' => User::generateReferralCode(),
                'email_verified_at' => $createdDate->addMinutes(rand(1, 60)),
                'created_at' => $createdDate,
                'updated_at' => $createdDate,
            ]);
        }
    }
}
