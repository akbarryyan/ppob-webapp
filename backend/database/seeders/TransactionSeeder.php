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

        // Create transactions for the last 3 months
        for ($i = 0; $i < 150; $i++) {
            $user = $users->random();
            $product = $products[array_rand($products)];
            $status = $statuses[array_rand($statuses)];
            $type = $types[array_rand($types)];
            
            // Create more success transactions than failed ones
            if (rand(1, 100) <= 80) {
                $status = 'success';
            }

            // Random date within the last 3 months
            $createdAt = Carbon::now()->subMonths(3)->addDays(rand(0, 90))->addHours(rand(0, 23))->addMinutes(rand(0, 59));

            Transaction::create([
                'user_id' => $user->id,
                'transaction_id' => 'TRX' . time() . rand(1000, 9999),
                'product_code' => $product['code'],
                'product_name' => $product['name'],
                'type' => $type,
                'price' => $product['price'],
                'profit' => $product['price'] * 0.1, // 10% profit margin
                'status' => $status,
                'target' => $this->generateRandomTarget($product['code']),
                'message' => $status === 'success' ? 'Transaction completed successfully' : 
                           ($status === 'pending' ? 'Transaction is being processed' : 'Transaction failed'),
                'processed_at' => $status === 'success' ? $createdAt->addMinutes(rand(1, 10)) : null,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
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
