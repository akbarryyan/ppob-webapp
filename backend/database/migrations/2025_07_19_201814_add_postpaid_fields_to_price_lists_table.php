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
            $table->string('seller_name')->nullable()->after('category');
            $table->decimal('admin_fee', 15, 2)->nullable()->after('commission');
            $table->decimal('original_price', 15, 2)->nullable()->after('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('price_lists', function (Blueprint $table) {
            $table->dropColumn(['seller_name', 'admin_fee', 'original_price']);
        });
    }
};
