<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $adminId = Auth::id();
        $notifications = \App\Models\Notification::where(function($q) use ($adminId) {
                $q->where('admin_id', $adminId)->orWhereNull('admin_id');
            })
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        return response()->json($notifications);
    }

    public function markAsRead($id)
    {
        $notification = \App\Models\Notification::findOrFail($id);
        $notification->update(['read' => true]);
        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        $adminId = Auth::id();
        \App\Models\Notification::where(function($q) use ($adminId) {
                $q->where('admin_id', $adminId)->orWhereNull('admin_id');
            })
            ->where('read', false)
            ->update(['read' => true]);
        return response()->json(['success' => true]);
    }
}
