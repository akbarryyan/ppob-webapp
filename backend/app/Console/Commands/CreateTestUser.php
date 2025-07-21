<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateTestUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:test-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a test user for development';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Check if user already exists
        $existingUser = User::where('email', 'testuser@example.com')->first();
        
        if ($existingUser) {
            $this->info('Test user already exists!');
            $this->info('Email: testuser@example.com');
            $this->info('Password: password123');
            $this->info('User ID: ' . $existingUser->id);
            return;
        }

        // Create test user
        $user = User::create([
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'phone' => '081234567899', // Different phone number
            'password' => Hash::make('password123'),
            'referral_code' => User::generateReferralCode(),
            'status' => 'active',
            'role' => 'user',
            'balance' => 500000, // 500K balance
        ]);

        $this->info('Test user created successfully!');
        $this->info('Email: testuser@example.com');
        $this->info('Password: password123');
        $this->info('Balance: Rp ' . number_format($user->balance));
        
        return 0;
    }
}
