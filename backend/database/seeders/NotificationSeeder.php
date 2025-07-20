<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Notification;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Notification::create([
            'title' => 'System Maintenance Scheduled',
            'message' => 'Scheduled maintenance will occur on July 25, 2025 from 02:00 to 04:00 AM',
            'type' => 'warning',
            'status' => 'sent',
            'priority' => 'high',
            'recipients' => 'all_users',
            'recipient_count' => 1250,
            'sent_at' => Carbon::now()->subHours(2),
            'created_by' => 'System Admin',
            'created_at' => Carbon::now()->subHours(3),
        ]);

        Notification::create([
            'title' => 'New Payment Method Available',
            'message' => 'We\'ve added support for Dana e-wallet. Start using it for your transactions today!',
            'type' => 'info',
            'status' => 'sent',
            'priority' => 'medium',
            'recipients' => 'active_users',
            'recipient_count' => 890,
            'sent_at' => Carbon::now()->subDay(),
            'created_by' => 'Marketing Team',
            'created_at' => Carbon::now()->subDay(),
        ]);

        Notification::create([
            'title' => 'Security Alert - Failed Login Attempts',
            'message' => 'Multiple failed login attempts detected from IP 192.168.1.100. Account temporarily locked.',
            'type' => 'error',
            'status' => 'sent',
            'priority' => 'critical',
            'recipients' => 'admin_users',
            'recipient_count' => 5,
            'sent_at' => Carbon::now()->subHours(6),
            'created_by' => 'Security System',
            'created_at' => Carbon::now()->subHours(6),
        ]);

        Notification::create([
            'title' => 'Welcome New Users',
            'message' => 'Welcome to BayarAja! Start exploring our services and enjoy exclusive new user bonuses.',
            'type' => 'success',
            'status' => 'draft',
            'priority' => 'low',
            'recipients' => 'new_users',
            'recipient_count' => 45,
            'created_by' => 'Support Team',
            'created_at' => Carbon::now()->subDays(2),
        ]);

        Notification::create([
            'title' => 'Transaction Limit Update',
            'message' => 'Daily transaction limits have been increased. Check your account for new limits.',
            'type' => 'info',
            'status' => 'scheduled',
            'priority' => 'medium',
            'recipients' => 'premium_users',
            'recipient_count' => 230,
            'scheduled_at' => Carbon::now()->addDay(),
            'created_by' => 'Product Team',
            'created_at' => Carbon::now()->subDays(1),
        ]);
    }
}
