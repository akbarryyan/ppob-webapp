<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->boot();

$testUser = App\Models\User::where('email', 'testuser@example.com')->first();
if (!$testUser) {
    echo 'Test user not found' . PHP_EOL;
    exit(1);
}

// Create some sample transactions for test user
$transactions = [
    ['product_name' => 'Pulsa Telkomsel 50K', 'price' => 51000, 'status' => 'success', 'target' => '08123456789'],
    ['product_name' => 'Token PLN 100K', 'price' => 102500, 'status' => 'success', 'target' => '123456789012'],
    ['product_name' => 'Paket Data XL 15GB', 'price' => 65000, 'status' => 'pending', 'target' => '08156789012'],
    ['product_name' => 'Pulsa Indosat 25K', 'price' => 26000, 'status' => 'failed', 'target' => '08567890123'],
    ['product_name' => 'Netflix Premium 1 Bulan', 'price' => 186000, 'status' => 'success', 'target' => 'user@email.com'],
];

foreach ($transactions as $txn) {
    App\Models\Transaction::create([
        'user_id' => $testUser->id,
        'transaction_id' => 'TXN' . time() . rand(100, 999),
        'product_name' => $txn['product_name'],
        'type' => 'prepaid',
        'price' => $txn['price'],
        'status' => $txn['status'],
        'target' => $txn['target'],
        'message' => 'Transaction processed',
    ]);
}

echo 'Sample transactions created for test user!' . PHP_EOL;
