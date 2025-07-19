<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('price_lists', function (Blueprint $table) {
            $table->decimal('original_price', 15, 2)->nullable()->after('price'); // Store original price from Digiflazz
            $table->string('profit_type')->nullable()->after('original_price'); // 'percentage' or 'fixed'
            $table->decimal('profit_margin', 5, 2)->nullable()->after('profit_type'); // Percentage margin (e.g., 8.5%)
            $table->integer('fixed_profit')->nullable()->after('profit_margin'); // Fixed profit amount
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('price_lists', function (Blueprint $table) {
            $table->dropColumn(['original_price', 'profit_type', 'profit_margin', 'fixed_profit']);
        });
    }
};
