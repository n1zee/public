<?php

namespace App\Traits;

trait Notification
    {
    /**
    * Send session flash notification.
    */
    protected function notify(string $message, string $type = 'default'): void
    {
        $color = match ($type) {
            'success' => 'green',
            'error' => 'red-600',
            'default' => 'white'
        };

        session()->flash('notify', [
            'message' => $message,
            'type' => $type,
            'color' => $color,
        ]);
    }
}
