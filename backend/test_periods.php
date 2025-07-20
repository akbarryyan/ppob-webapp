<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Transaction;
use Carbon\Carbon;

echo "=== Testing Period Calculations ===\n";

// Test 7 days
$endDate = now();
$startDate = now()->subDays(7);
$prevEndDate = $startDate->copy();
$prevStartDate = now()->subDays(14);

echo "Last 7 Days:\n";
echo "Current: {$startDate} to {$endDate}\n";
echo "Count: " . Transaction::whereBetween('created_at', [$startDate, $endDate])->count() . "\n";
echo "Previous: {$prevStartDate} to {$prevEndDate}\n";
echo "Count: " . Transaction::whereBetween('created_at', [$prevStartDate, $prevEndDate])->count() . "\n\n";

// Test 30 days
$endDate = now();
$startDate = now()->subDays(30);
$prevEndDate = $startDate->copy();
$prevStartDate = now()->subDays(60);

echo "Last 30 Days:\n";
echo "Current: {$startDate} to {$endDate}\n";
echo "Count: " . Transaction::whereBetween('created_at', [$startDate, $endDate])->count() . "\n";
echo "Previous: {$prevStartDate} to {$prevEndDate}\n";
echo "Count: " . Transaction::whereBetween('created_at', [$prevStartDate, $prevEndDate])->count() . "\n\n";

// Test all transactions
echo "All Time:\n";
echo "Count: " . Transaction::count() . "\n";
echo "Success: " . Transaction::where('status', 'success')->count() . "\n";

?>
