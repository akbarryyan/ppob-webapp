<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Transaction;

class CreateSampleTransactions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:sample-transactions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create sample transactions for test user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $testUser = User::where('email', 'testuser@example.com')->first();
        if (!$testUser) {
            $this->error('Test user not found! Run: php artisan create:test-user');
            return 1;
        }

        // Create some sample transactions for test user
        $transactions = [
            ['product_code' => 'TSEL50', 'product_name' => 'Pulsa Telkomsel 50K', 'price' => 51000, 'status' => 'success', 'target' => '08123456789'],
            ['product_code' => 'PLN100', 'product_name' => 'Token PLN 100K', 'price' => 102500, 'status' => 'success', 'target' => '123456789012'],
            ['product_code' => 'XL15GB', 'product_name' => 'Paket Data XL 15GB', 'price' => 65000, 'status' => 'pending', 'target' => '08156789012'],
            ['product_code' => 'ISAT25', 'product_name' => 'Pulsa Indosat 25K', 'price' => 26000, 'status' => 'failed', 'target' => '08567890123'],
            ['product_code' => 'NETFLIX', 'product_name' => 'Netflix Premium 1 Bulan', 'price' => 186000, 'status' => 'success', 'target' => 'user@email.com'],
            ['product_code' => 'STEAM100', 'product_name' => 'Steam Wallet 100K', 'price' => 105000, 'status' => 'success', 'target' => 'steamuser@email.com'],
            ['product_code' => 'TRI30', 'product_name' => 'Pulsa Tri 30K', 'price' => 31000, 'status' => 'pending', 'target' => '08987654321'],
            ['product_code' => 'PLN50', 'product_name' => 'Token PLN 50K', 'price' => 52500, 'status' => 'success', 'target' => '987654321012'],
        ];

        foreach ($transactions as $txn) {
            Transaction::create([
                'user_id' => $testUser->id,
                'transaction_id' => 'TXN' . time() . rand(100, 999),
                'product_code' => $txn['product_code'],
                'product_name' => $txn['product_name'],
                'type' => 'prepaid',
                'price' => $txn['price'],
                'status' => $txn['status'],
                'target' => $txn['target'],
                'message' => 'Transaction processed',
            ]);
        }

        $this->info('Sample transactions created for test user!');
        $this->info('Total transactions: ' . count($transactions));
        return 0;
    }
}
