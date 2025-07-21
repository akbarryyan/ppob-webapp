<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // General Settings
        $generalSettings = [
            'siteName' => 'Bayaraja',
            'siteDescription' => 'Rajanya Pembayaran Digital - Platform top-up game dan voucher terpercaya',
            'adminEmail' => 'admin@bayaraja.com',
            'supportEmail' => 'support@bayaraja.com',
            'maintenanceMode' => false,
        ];

        foreach ($generalSettings as $key => $value) {
            \App\Models\Setting::setValue('general', $key, $value, "General $key setting");
        }

        // Security Settings (optional - untuk nanti)
        $securitySettings = [
            'twoFactorAuth' => true,
            'sessionTimeout' => 30,
            'maxLoginAttempts' => 5,
            'passwordExpiry' => 90,
            'apiRateLimit' => 1000,
        ];

        foreach ($securitySettings as $key => $value) {
            \App\Models\Setting::setValue('security', $key, $value, "Security $key setting");
        }

        // Payment Settings (optional - untuk nanti)
        $paymentSettings = [
            'autoProcessPayment' => true,
            'paymentTimeout' => 30,
            'minimumTopup' => 10000,
            'maximumTopup' => 10000000,
            'transactionFee' => 2500,
        ];

        foreach ($paymentSettings as $key => $value) {
            \App\Models\Setting::setValue('payment', $key, $value, "Payment $key setting");
        }
    }
}
