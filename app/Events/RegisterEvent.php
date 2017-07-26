<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class RegisterEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;
    
    public $uuid;
    public $name;
    public $category;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($memberUuid, $companyName, $category)
    {
        $this->uuid = $memberUuid;
        $this->name = $companyName;
        $this->category = $category;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['private-pusher'];
    }
}
