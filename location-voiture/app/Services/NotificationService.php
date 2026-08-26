<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public static function notify($title, $message, $type = 'system', $icon = 'fa-bell', $color = 'blue')
    {
        return Notification::create([
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'icon' => $icon,
            'color' => $color,
            'admin_id' => auth()->id()
        ]);
    }

    public static function notifyCarAdded($car)
    {
        return self::notify(
            'New car added',
            "{$car->marque->name} {$car->model} has been added to inventory",
            'car_added',
            'fa-car-side',
            'blue'
        );
    }

    public static function notifyNewReservation($location)
    {
        return self::notify(
            'New reservation',
            "Client #{$location->client_id} made a new reservation",
            'reservation',
            'fa-calendar-check',
            'green'
        );
    }

    public static function notifySystemAlert($message)
    {
        return self::notify(
            'System alert',
            $message,
            'system',
            'fa-exclamation-triangle',
            'yellow'
        );
    }
}
