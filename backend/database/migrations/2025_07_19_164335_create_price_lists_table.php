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
        Schema::create('price_lists', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('product_name');
            $table->decimal('price', 15, 2);
            $table->boolean('buyer_product_status')->default(false);
            $table->boolean('seller_product_status')->default(false);
            $table->string('buyer_sku_code')->unique();
            $table->text('desc')->nullable();
            $table->string('category')->nullable();
            $table->string('type')->nullable();
            $table->boolean('unlimited_stock')->default(false);
            $table->integer('stock')->default(0);
            $table->string('multi')->nullable();
            $table->time('start_cut_off')->nullable();
            $table->time('end_cut_off')->nullable();
            $table->decimal('admin', 15, 2)->nullable(); // For postpaid
            $table->decimal('commission', 15, 2)->nullable(); // For postpaid
            $table->enum('product_type', ['prepaid', 'postpaid'])->default('prepaid');
            $table->timestamp('last_updated')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price_lists');
    }
};
