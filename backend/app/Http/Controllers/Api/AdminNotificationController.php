<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class AdminNotificationController extends Controller
{
    /**
     * Get all notifications with optional filtering
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Notification::query();

            // Filter by type
            if ($request->has('type') && $request->type !== 'all') {
                $query->where('type', $request->type);
            }

            // Filter by status
            if ($request->has('status') && $request->get('status') !== 'all') {
                $query->where('status', $request->get('status'));
            }

            // Search by title or message
            if ($request->has('search') && $request->get('search')) {
                $searchTerm = $request->get('search');
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('title', 'like', '%' . $searchTerm . '%')
                      ->orWhere('message', 'like', '%' . $searchTerm . '%');
                });
            }

            // Order by created date (newest first)
            $notifications = $query->orderBy('created_at', 'desc')
                                 ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $notifications
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching notifications: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notifications'
            ], 500);
        }
    }

    /**
     * Get notification statistics
     */
    public function stats(): JsonResponse
    {
        try {
            $totalNotifications = Notification::count();
            $sentToday = Notification::where('status', 'sent')
                                   ->whereDate('sent_at', today())
                                   ->count();
            $totalRecipients = Notification::where('status', 'sent')
                                         ->sum('recipient_count');
            $scheduled = Notification::where('status', 'scheduled')->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_notifications' => $totalNotifications,
                    'sent_today' => $sentToday,
                    'total_recipients' => $totalRecipients,
                    'scheduled' => $scheduled
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching notification stats: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notification statistics'
            ], 500);
        }
    }

    /**
     * Create a new notification
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'message' => 'required|string',
                'type' => 'required|in:info,success,warning,error',
                'priority' => 'required|in:low,medium,high,critical',
                'recipients' => 'required|in:all_users,active_users,new_users,premium_users,admin_users',
                'status' => 'in:draft,scheduled,sent',
                'scheduled_at' => 'nullable|date|after:now'
            ]);

            // Calculate recipient count based on recipients type
            $recipientCount = $this->calculateRecipientCount($validated['recipients']);
            $validated['recipient_count'] = $recipientCount;
            $validated['created_by'] = 'Admin'; // You can get this from authenticated user

            // Set status based on whether it's scheduled or not
            if (!isset($validated['status'])) {
                $validated['status'] = $request->has('scheduled_at') ? 'scheduled' : 'draft';
            }

            // If sending immediately, set sent_at
            if ($validated['status'] === 'sent') {
                $validated['sent_at'] = now();
            }

            $notification = Notification::create($validated);

            return response()->json([
                'success' => true,
                'data' => $notification,
                'message' => 'Notification created successfully'
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating notification: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create notification'
            ], 500);
        }
    }

    /**
     * Show specific notification
     */
    public function show(Notification $notification): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $notification
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching notification: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notification'
            ], 500);
        }
    }

    /**
     * Update notification
     */
    public function update(Request $request, Notification $notification): JsonResponse
    {
        try {
            // Don't allow updating sent notifications
            if ($notification->status === 'sent') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot update sent notifications'
                ], 400);
            }

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'message' => 'sometimes|string',
                'type' => 'sometimes|in:info,success,warning,error',
                'priority' => 'sometimes|in:low,medium,high,critical',
                'recipients' => 'sometimes|in:all_users,active_users,new_users,premium_users,admin_users',
                'status' => 'sometimes|in:draft,scheduled,sent',
                'scheduled_at' => 'nullable|date|after:now'
            ]);

            // Recalculate recipient count if recipients changed
            if (isset($validated['recipients'])) {
                $validated['recipient_count'] = $this->calculateRecipientCount($validated['recipients']);
            }

            // If status changed to sent, set sent_at
            if (isset($validated['status']) && $validated['status'] === 'sent') {
                $validated['sent_at'] = now();
            }

            $notification->update($validated);

            return response()->json([
                'success' => true,
                'data' => $notification->fresh(),
                'message' => 'Notification updated successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating notification: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notification'
            ], 500);
        }
    }

    /**
     * Delete notification
     */
    public function destroy(Notification $notification): JsonResponse
    {
        try {
            // Don't allow deleting sent notifications
            if ($notification->status === 'sent') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete sent notifications'
                ], 400);
            }

            $notification->delete();

            return response()->json([
                'success' => true,
                'message' => 'Notification deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting notification: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete notification'
            ], 500);
        }
    }

    /**
     * Bulk delete notifications
     */
    public function bulkDelete(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'notification_ids' => 'required|array',
                'notification_ids.*' => 'exists:notifications,id'
            ]);

            $notifications = Notification::whereIn('id', $validated['notification_ids'])
                                       ->where('status', '!=', 'sent')
                                       ->get();

            if ($notifications->count() === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No notifications available for deletion (sent notifications cannot be deleted)'
                ], 400);
            }

            Notification::whereIn('id', $notifications->pluck('id'))->delete();

            return response()->json([
                'success' => true,
                'message' => $notifications->count() . ' notification(s) deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error bulk deleting notifications: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete notifications'
            ], 500);
        }
    }

    /**
     * Calculate recipient count based on recipient type
     */
    private function calculateRecipientCount(string $recipients): int
    {
        switch ($recipients) {
            case 'all_users':
                return User::where('role', 'user')->count();
            case 'active_users':
                // Users who have made transactions in last 30 days
                return User::where('role', 'user')
                          ->whereHas('transactions', function ($q) {
                              $q->where('created_at', '>=', now()->subDays(30));
                          })
                          ->count();
            case 'new_users':
                // Users registered in last 7 days
                return User::where('role', 'user')
                          ->where('created_at', '>=', now()->subDays(7))
                          ->count();
            case 'premium_users':
                // Users who have made more than 10 transactions or spent more than 1M
                return User::where('role', 'user')
                          ->whereHas('transactions', function ($q) {
                              $q->groupBy('user_id')
                                ->havingRaw('COUNT(*) > 10 OR SUM(price) > 1000000');
                          })
                          ->count();
            case 'admin_users':
                return User::where('role', 'admin')->count();
            default:
                return 0;
        }
    }
}
