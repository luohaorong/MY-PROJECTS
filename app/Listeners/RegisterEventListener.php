<?php

namespace App\Listeners;

use UUID;
use App\User;
use App\Notifications;
use App\Events\RegisterEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class RegisterEventListener
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
        $this->type = 'App\Notifications\RegisterNotification';
    }

    /**
     * Handle the event.
     *
     * @param  RegisterEvent  $event
     * @return void
     */
    public function handle(RegisterEvent $event)
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
