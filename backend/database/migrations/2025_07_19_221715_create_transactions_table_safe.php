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
        // Only create table if it doesn't exist
        if (!Schema::hasTable('transactions')) {
            Schema::create('transactions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->string('transaction_id')->unique();
                $table->string('product_code');
                $table->string('product_name');
                $table->enum('type', ['prepaid', 'postpaid']);
                $table->decimal('price', 10, 2);
                $table->decimal('profit', 10, 2)->default(0);
                $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
                $table->string('target'); // nomor HP/Customer ID
                $table->text('message')->nullable();
                $table->timestamp('processed_at')->nullable();
                $table->timestamps();
            });
        } else {
            // If table exists, check and add missing columns
            Schema::table('transactions', function (Blueprint $table) {
                if (!Schema::hasColumn('transactions', 'user_id')) {
                    $table->foreignId('user_id')->constrained()->onDelete('cascade');
                }
                if (!Schema::hasColumn('transactions', 'transaction_id')) {
                    $table->string('transaction_id')->unique();
                }
                if (!Schema::hasColumn('transactions', 'product_code')) {
                    $table->string('product_code');
                }
                if (!Schema::hasColumn('transactions', 'product_name')) {
                    $table->string('product_name');
                }
                if (!Schema::hasColumn('transactions', 'type')) {
                    $table->enum('type', ['prepaid', 'postpaid']);
                }
                if (!Schema::hasColumn('transactions', 'price')) {
                    $table->decimal('price', 10, 2);
                }
                if (!Schema::hasColumn('transactions', 'profit')) {
                    $table->decimal('profit', 10, 2)->default(0);
                }
                if (!Schema::hasColumn('transactions', 'status')) {
                    $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
                }
                if (!Schema::hasColumn('transactions', 'target')) {
                    $table->string('target');
                }
                if (!Schema::hasColumn('transactions', 'message')) {
                    $table->text('message')->nullable();
                }
                if (!Schema::hasColumn('transactions', 'processed_at')) {
                    $table->timestamp('processed_at')->nullable();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
