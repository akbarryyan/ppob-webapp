<?php

// Sample data creation script for testing recent activity
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\Transaction;
use App\Models\PriceList;
use Illuminate\Support\Facades\Hash;

echo "Creating sample data for recent activity testing...\n";

// Create sample users
$sampleUsers = [
    [
        'name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'password' => Hash::make('password'),
        'role' => 'user',
        'status' => 'active',
    ],
    [
        'name' => 'Jane Smith',
        'email' => 'jane.smith@example.com', 
        'password' => Hash::make('password'),
        'role' => 'user',
        'status' => 'active',
    ],
    [
        'name' => 'Bob Wilson',
        'email' => 'bob.wilson@example.com',
        'password' => Hash::make('password'),
        'role' => 'user', 
        'status' => 'active',
    ]
];

foreach ($sampleUsers as $userData) {
    User::firstOrCreate(
        ['email' => $userData['email']],
        $userData
    );
    echo "Created user: " . $userData['email'] . "\n";
}

// Create sample products
$sampleProducts = [
    [
        'buyer_sku_code' => 'STEAM250',
        'product_name' => 'Steam Wallet 250K',
        'category' => 'Games',
        'brand' => 'Steam',
        'type' => 'Voucher Game',
        'price' => 250000,
        'buyer_product_status' => true,
        'seller_product_status' => true,
        'stock' => 100,
        'unlimited_stock' => true,
        'product_type' => 'prepaid',
    ],
    [
        'buyer_sku_code' => 'GPLAY100',
        'product_name' => 'Google Play 100K',
        'category' => 'Games',
        'brand' => 'Google Play',
        'type' => 'Voucher Game',
        'price' => 100000,
        'buyer_product_status' => true,
        'seller_product_status' => true,
        'stock' => 100,
        'unlimited_stock' => true,
        'product_type' => 'prepaid',
    ],
    [
        'buyer_sku_code' => 'MLBB1000',
        'product_name' => 'Mobile Legends 1000 Diamond',
        'category' => 'Games',
        'brand' => 'Mobile Legends',
        'type' => 'Game Currency',
        'price' => 250000,
        'buyer_product_status' => true,
        'seller_product_status' => true,
        'stock' => 100,
        'unlimited_stock' => true,
        'product_type' => 'prepaid',
    ]
];

foreach ($sampleProducts as $productData) {
    PriceList::firstOrCreate(
        ['buyer_sku_code' => $productData['buyer_sku_code']],
        $productData
    );
    echo "Created product: " . $productData['product_name'] . "\n";
}

// Create sample transactions
$users = User::where('role', 'user')->get();
$products = PriceList::all();

if ($users->count() > 0 && $products->count() > 0) {
    $sampleTransactions = [
        [
            'transaction_id' => 'TXN-' . time() . '-001',
            'target' => '081234567890',
            'product_code' => 'STEAM250',
            'product_name' => 'Steam Wallet 250K',
            'type' => 'prepaid',
            'message' => 'SUKSES',
            'status' => 'success',
            'price' => 275000,
            'profit' => 25000,
            'processed_at' => now(),
        ],
        [
            'transaction_id' => 'TXN-' . time() . '-002', 
            'target' => '081234567891',
            'product_code' => 'GPLAY100',
            'product_name' => 'Google Play 100K',
            'type' => 'prepaid',
            'message' => 'SUKSES',
            'status' => 'success',
            'price' => 110000,
            'profit' => 10000,
            'processed_at' => now(),
        ],
        [
            'transaction_id' => 'TXN-' . time() . '-003',
            'target' => '081234567892', 
            'product_code' => 'MLBB1000',
            'product_name' => 'Mobile Legends 1000 Diamond',
            'type' => 'prepaid',
            'message' => 'SUKSES',
            'status' => 'success',
            'price' => 275000,
            'profit' => 25000,
            'processed_at' => now(),
        ]
    ];

    foreach ($sampleTransactions as $i => $transactionData) {
        $transactionData['user_id'] = $users[$i % $users->count()]->id;
        Transaction::firstOrCreate(
            ['transaction_id' => $transactionData['transaction_id']],
            $transactionData
        );
        echo "Created transaction: " . $transactionData['transaction_id'] . "\n";
    }
}

echo "Sample data creation completed!\n";
