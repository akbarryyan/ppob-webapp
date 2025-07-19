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
        Schema::create('digiflazz_settings', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('api_key');
            $table->text('whitelist_ips')->nullable(); // JSON array of whitelisted IPs
            $table->boolean('is_active')->default(true);
            $table->decimal('current_balance', 15, 2)->nullable();
            $table->timestamp('balance_updated_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('digiflazz_settings');
    }
};
