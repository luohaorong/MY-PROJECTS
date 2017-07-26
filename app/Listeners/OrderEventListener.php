<?php

namespace App\Listeners;

use UUID;
use App\User;
use App\Notifications;
use App\Events\OrderEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderEventListener
{
    private $notifiableId;
    private $notifiableType;
    private $type;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        $this->notifiableId = User::first()->uuid;
        $this->notifiableType = 'App\User';
        $this->type = 'App\Notifications\OrderNotification';
    }

    /**
     * Handle the event.
     *
     * @param  OrderEvent  $event
     * @return void
     */
    public function handle(OrderEvent $event)
    {
        $notifications = new Notifications();
        $notifications->id = UUID::generate()->string;
        $notifications->type = $this->type;
        $notifications->notifiable_id = $this->notifiableId;
        $notifications->notifiable_type = $this->notifiableType;
        $notifications->data = json_encode($event, true);
        $notifications->save();
    }
}
