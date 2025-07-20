<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if not exists
        $adminUser = User::where('email', 'admin@admin.com')->first();
        
        if (!$adminUser) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@admin.com',
                'phone_number' => '08123456789',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
            
            echo "Admin user created successfully!\n";
            echo "Email: admin@admin.com\n";
            echo "Password: admin123\n";
        } else {
            echo "Admin user already exists!\n";
        }
    }
}
