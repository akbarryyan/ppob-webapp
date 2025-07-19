<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        
        if ($users->isEmpty()) {
            return;
        }

        $statuses = ['success', 'pending', 'failed'];
        $types = ['prepaid', 'postpaid'];
        $products = [
            ['code' => 'PLN20', 'name' => 'PLN Token 20K', 'price' => 22500],
            ['code' => 'PLN50', 'name' => 'PLN Token 50K', 'price' => 52500],
            ['code' => 'PLN100', 'name' => 'PLN Token 100K', 'price' => 102500],
            ['code' => 'AXIS5', 'name' => 'Axis 5GB', 'price' => 25000],
            ['code' => 'TSEL10', 'name' => 'Telkomsel 10GB', 'price' => 45000],
            ['code' => 'XL15', 'name' => 'XL 15GB', 'price' => 55000],
            ['code' => 'SMART5', 'name' => 'Smartfren 5GB', 'price' => 20000],
            ['code' => 'STEAM50', 'name' => 'Steam Wallet 50K', 'price' => 55000],
            ['code' => 'GARENA100', 'name' => 'Garena Shells 100', 'price' => 25000],
            ['code' => 'GPLAY50', 'name' => 'Google Play 50K', 'price' => 52500],
        ];

        // Create transactions with better distribution across time periods
        $totalTransactions = 200; // Increase total transactions
        
        // Previous 60-30 days (older period): 40 transactions
        for ($i = 0; $i < 40; $i++) {
            $this->createTransaction($users, $products, $statuses, $types, 60, 30);
        }
        
        // Last 30 days (recent period): 80 transactions
        for ($i = 0; $i < 80; $i++) {
            $this->createTransaction($users, $products, $statuses, $types, 30, 0);
        }
        
        // Last 7 days (very recent): 40 transactions
        for ($i = 0; $i < 40; $i++) {
            $this->createTransaction($users, $products, $statuses, $types, 7, 0);
        }
        
        // Today: 10 transactions
        for ($i = 0; $i < 10; $i++) {
            $this->createTransaction($users, $products, $statuses, $types, 1, 0);
        }
    }

    private function createTransaction($users, $products, $statuses, $types, $maxDaysAgo, $minDaysAgo = 0)
    {
        $user = $users->random();
        $product = $products[array_rand($products)];
        $status = $statuses[array_rand($statuses)];
        $type = $types[array_rand($types)];
        
        // Create more success transactions than failed ones (85% success rate)
        if (rand(1, 100) <= 85) {
            $status = 'success';
        } elseif (rand(1, 100) <= 10) {
            $status = 'pending';
        } else {
            $status = 'failed';
        }

        // Generate random date within the specified range
        $daysAgo = rand($minDaysAgo, $maxDaysAgo);
        $createdAt = Carbon::now()->subDays($daysAgo)->addHours(rand(0, 23))->addMinutes(rand(0, 59));

        Transaction::create([
            'user_id' => $user->id,
            'transaction_id' => 'TRX' . time() . rand(1000, 9999) . $daysAgo,
            'product_code' => $product['code'],
            'product_name' => $product['name'],
            'type' => $type,
            'price' => $product['price'],
            'profit' => $product['price'] * rand(5, 15) / 100, // 5-15% profit margin
            'status' => $status,
            'target' => $this->generateRandomTarget($product['code']),
            'message' => $status === 'success' ? 'Transaction completed successfully' : 
                       ($status === 'pending' ? 'Transaction is being processed' : 'Transaction failed'),
            'processed_at' => $status === 'success' ? $createdAt->addMinutes(rand(1, 10)) : null,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);
    }

    private function generateRandomTarget($productCode)
    {
        if (strpos($productCode, 'PLN') !== false) {
            // Generate random meter number
            return '1234567890' . rand(10, 99);
        } elseif (in_array(substr($productCode, 0, 4), ['AXIS', 'TSEL', 'XL', 'SMAR'])) {
            // Generate random phone number
            return '0812' . rand(10000000, 99999999);
        } else {
            // For gaming vouchers, generate random email
            return 'user' . rand(100, 999) . '@example.com';
        }
    }
}
